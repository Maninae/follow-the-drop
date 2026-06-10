// Coordinator: owns the app state (current scene, visited set)
// and wires every UI event. Other modules are stateless helpers.

(function () {
  let currentSceneId = START_SCENE;
  const visited = passportLoad();

  const callbacks = {
    onNavigate: navigateTo,
    onHotspot: showFactCard
  };

  function navigateTo(sceneId) {
    if (!SCENES[sceneId] || sceneId === currentSceneId) return;
    hideFactCard();
    narrateStop();
    setSpeaking(false);
    transitionTo(SCENES[sceneId].image, function () {
      currentSceneId = sceneId;
      renderScene(sceneId, callbacks);
      stamp(sceneId);
    });
  }

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

  renderScene(currentSceneId, callbacks);
  passportUpdateCounter(visited);
  if (visited.size === 0) {
    intro.hidden = false;
  } else {
    stamp(currentSceneId);
  }
})();
