// Renders one scene into the stage: image, hotspots, story panel,
// and choice buttons. Stateless — main.js owns state and passes
// callbacks for navigation and hotspot taps.

function renderScene(sceneId, callbacks) {
  const scene = SCENES[sceneId];

  // Image
  const img = document.getElementById("scene-image");
  img.src = scene.image;
  img.alt = scene.title + " — an illustrated scene from the water cycle";

  // Story panel
  document.getElementById("scene-emoji").textContent = scene.emoji;
  document.getElementById("scene-title").textContent = scene.title;
  document.getElementById("scene-body").textContent = scene.body;

  renderHotspots(scene, callbacks.onHotspot);
  renderChoices("next-choices", scene.next, "choice-next", callbacks.onNavigate);
  renderChoices("back-choices", scene.back, "choice-back", callbacks.onNavigate);

  // Reset story panel scroll on small screens
  document.querySelector(".story-card").scrollTop = 0;
}

function renderHotspots(scene, onHotspot) {
  const layer = document.getElementById("hotspot-layer");
  layer.innerHTML = "";
  scene.hotspots.forEach(function (spot, i) {
    const btn = document.createElement("button");
    btn.className = "hotspot";
    btn.style.left = spot.x + "%";
    btn.style.top = spot.y + "%";
    btn.setAttribute("aria-label", "Look closer: " + spot.label);
    btn.innerHTML = "?" + '<span class="hotspot-tag">' + spot.label + "</span>";
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      btn.classList.add("seen");
      onHotspot(spot, btn);
    });
    layer.appendChild(btn);
  });
}

function renderChoices(containerId, choices, choiceClass, onNavigate) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (!choices || choices.length === 0) return;

  const question = choices.find(function (c) { return c.question; });
  if (question) {
    const q = document.createElement("p");
    q.className = "choice-question";
    q.textContent = question.question;
    container.appendChild(q);
  }

  choices.forEach(function (choice) {
    const btn = document.createElement("button");
    btn.className = "choice " + choiceClass;
    btn.textContent = choice.label;
    btn.addEventListener("click", function () { onNavigate(choice.to); });
    container.appendChild(btn);
  });
}

// Positions the fact card near a hotspot, clamped to the viewport,
// and fills in its content.
function showFactCard(spot, hotspotEl) {
  const card = document.getElementById("fact-card");
  document.getElementById("fact-title").textContent = spot.label;
  document.getElementById("fact-body").textContent = spot.fact;
  card.hidden = false;

  const rect = hotspotEl.getBoundingClientRect();
  const cardW = card.offsetWidth;
  const cardH = card.offsetHeight;
  const margin = 12;

  let left = rect.left + rect.width / 2 - cardW / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - cardW - margin));

  // Prefer below the hotspot; flip above if it would run off-screen.
  let top = rect.bottom + 14;
  if (top + cardH > window.innerHeight - margin) {
    top = rect.top - cardH - 14;
  }
  top = Math.max(margin, top);

  card.style.left = left + "px";
  card.style.top = top + "px";
}

function hideFactCard() {
  document.getElementById("fact-card").hidden = true;
}
