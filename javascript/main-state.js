export const appState = {
  mouse: { x: 0, y: 0 },
  pos: { x: 0, y: 0 },
  lastPos: { x: 0, y: 0 },
  currentHover: null,
  isTransitioning: false
};

export function initMouseTracking() {
  document.addEventListener("mousemove", (e) => {
    appState.mouse.x = e.clientX;
    appState.mouse.y = e.clientY;
  });
}

let hasMoved = false;

export function initTicker(smoothing = 0.2, maxRotation = 3) {
  gsap.ticker.add(() => {
    if (!appState.currentHover) return;

    if (appState.isTransitioning) {
      gsap.set(appState.currentHover, { display: "none", opacity: 0, scale: 0, rotation: 0 });
      appState.currentHover = null;
      return;
    }

    if (!hasMoved) {
      // Eerste muisbeweging: direct positioneren
      gsap.set(appState.currentHover, { x: appState.mouse.x, y: appState.mouse.y });
      appState.pos.x = appState.mouse.x;
      appState.pos.y = appState.mouse.y;
      hasMoved = true;
    } else {
      // Daarna smooth volgen
      appState.pos.x += (appState.mouse.x - appState.pos.x) * smoothing;
      appState.pos.y += (appState.mouse.y - appState.pos.y) * smoothing;
      gsap.set(appState.currentHover, { x: appState.pos.x, y: appState.pos.y });
    }

    const dx = appState.mouse.x - appState.lastPos.x;
    const rotation = gsap.utils.clamp(-maxRotation, maxRotation, dx * 0.5);
    gsap.to(appState.currentHover, { rotation: rotation, duration: 0.2, ease: "power1.out" });

    appState.lastPos.x = appState.mouse.x;
    appState.lastPos.y = appState.mouse.y;
  });
}
