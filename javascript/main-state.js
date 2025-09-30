export const appState = {
  mouse: { x: 0, y: 0 },
  pos: { x: 0, y: 0 },
  lastPos: { x: 0, y: 0 },
  currentHover: null,
  isTransitioning: false,
  hasMoved: false // <-- toegevoegd
};

export function initMouseTracking() {
  document.addEventListener("mousemove", (e) => {
    appState.mouse.x = e.clientX;
    appState.mouse.y = e.clientY;
    appState.hasMoved = true; // <-- nu globaal beschikbaar
  });
}

export function initTicker(smoothing = 0.2, maxRotation = 3) {
  gsap.ticker.add(() => {
    // Muispositie ALTIJD bijwerken, ook zonder hover
    appState.pos.x += (appState.mouse.x - appState.pos.x) * smoothing;
    appState.pos.y += (appState.mouse.y - appState.pos.y) * smoothing;

    // Alleen als er een hover actief is, het element bewegen
    if (appState.currentHover) {
      if (appState.isTransitioning) {
        gsap.set(appState.currentHover, { display: "none", opacity: 0, scale: 0, rotation: 0 });
        appState.currentHover = null;
        return;
      }

      gsap.set(appState.currentHover, { x: appState.pos.x, y: appState.pos.y });

      const dx = appState.mouse.x - appState.lastPos.x;
      const rotation = gsap.utils.clamp(-maxRotation, maxRotation, dx * 0.5);
      gsap.to(appState.currentHover, { rotation, duration: 0.2, ease: "power1.out" });
    }

    // altijd de laatste muispositie opslaan
    appState.lastPos.x = appState.mouse.x;
    appState.lastPos.y = appState.mouse.y;
  });
}
