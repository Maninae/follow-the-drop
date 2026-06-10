// Scene transitions: a watery blur-crossfade.
// The stage blurs out, the new scene renders, then sharpens in.

// Preload an image; resolves either way so a missing file can't
// strand the transition mid-blur.
function preloadImage(src) {
  return new Promise(function (resolve) {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

let transitioning = false;

// Blur out → swap (via renderFn) → sharpen in.
function transitionTo(imageSrc, renderFn) {
  if (transitioning) return;
  transitioning = true;

  const wrap = document.getElementById("scene-image-wrap");
  const loaded = preloadImage(imageSrc);

  wrap.classList.add("leaving");

  const blurDone = new Promise(function (resolve) {
    setTimeout(resolve, 560);
  });

  Promise.all([loaded, blurDone]).then(function () {
    wrap.classList.remove("leaving");
    wrap.classList.add("entering");
    renderFn();
    // Force a reflow so "entering" applies before we animate it away.
    void wrap.offsetWidth;
    wrap.classList.remove("entering");
    setTimeout(function () { transitioning = false; }, 580);
  });
}
