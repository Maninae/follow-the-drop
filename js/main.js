// Coordinator: owns the app state (current scene, visited set)
// and wires every UI event. Other modules are stateless helpers.

(function () {
  // The URL hash is the source of truth for the current scene, so the
  // browser's back/forward buttons walk the drop's actual journey and
  // any scene is deep-linkable (e.g. .../#river).
  const initialHash = window.location.hash.slice(1);
  let currentSceneId = SCENES[initialHash] ? initialHash : START_SCENE;
  const visited = passportLoad();

  const callbacks = {
    onNavigate: navigateTo,
    onHotspot: showFactCard
  };

  // User-initiated navigation just moves the hash; onHashChange does
  // the actual scene swap (so back/forward take the same code path).
  function navigateTo(sceneId) {
    if (!SCENES[sceneId] || sceneId === currentSceneId || isTransitioning()) return;
    window.location.hash = sceneId;
  }

  function onHashChange() {
    const sceneId = window.location.hash.slice(1);
    if (!SCENES[sceneId] || sceneId === currentSceneId) return;
    if (isTransitioning()) {
      // A transition is mid-flight (e.g. back pressed during one);
      // re-check once it has settled.
      setTimeout(onHashChange, 650);
      return;
    }
    hideFactCard();
    narrateStop();
    setSpeaking(false);
    transitionTo(SCENES[sceneId], function () {
      currentSceneId = sceneId;
      renderScene(sceneId, callbacks);
      stamp(sceneId);
    });
  }

  window.addEventListener("hashchange", onHashChange);

  function stamp(sceneId) {
    const isNew = passportVisit(visited, sceneId);
    passportUpdateCounter(visited);
    if (isNew) {
      const btn = document.getElementById("passport-button");
      btn.classList.remove("stamped");
      void btn.offsetWidth;
      btn.classList.add("stamped");
    }
  }

  function setSpeaking(on) {
    document.getElementById("read-aloud").classList.toggle("speaking", on);
  }

  // --- Wire UI events ---

  document.getElementById("read-aloud").addEventListener("click", function () {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      narrateStop();
      setSpeaking(false);
    } else {
      narrateScene(SCENES[currentSceneId],
        function () { setSpeaking(true); },
        function () { setSpeaking(false); });
    }
  });

  document.getElementById("fact-close").addEventListener("click", hideFactCard);
  document.getElementById("stage").addEventListener("click", hideFactCard);

  document.getElementById("passport-button").addEventListener("click", function () {
    passportRenderGrid(visited);
    document.getElementById("passport-modal").hidden = false;
  });
  document.getElementById("passport-close").addEventListener("click", function () {
    document.getElementById("passport-modal").hidden = true;
  });
  document.getElementById("passport-modal").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) event.currentTarget.hidden = true;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideFactCard();
      document.getElementById("passport-modal").hidden = true;
    }
  });

  const intro = document.getElementById("intro");
  document.getElementById("intro-start").addEventListener("click", function () {
    intro.hidden = true;
    stamp(currentSceneId);
  });

  // --- First paint ---

  history.replaceState(null, "", "#" + currentSceneId);
  stageInit(SCENES[currentSceneId]);
  renderScene(currentSceneId, callbacks);
  passportUpdateCounter(visited);
  if (visited.size === 0) {
    intro.hidden = false;
  } else {
    stamp(currentSceneId);
  }
})();
