import { appState } from './main-state.js';

export function initCursor() {
  if (!window.matchMedia("(min-width: 992px)").matches) return;

  const defaultSize = 12;

  // Cursor elementen maken
  const cursorbg = document.createElement("div");
  cursorbg.className = "custom-cursor-bg";
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  const icon = document.createElement("span");
  icon.className = "icon custom-cursor-icon";
  const text = document.createElement("span");
  text.className = "custom-cursor-text";

  cursor.appendChild(icon);
  cursor.appendChild(text);
  document.body.appendChild(cursorbg);
  document.body.appendChild(cursor);

  // Initiële GSAP waarden
  gsap.set([cursor, cursorbg], { width: defaultSize, height: defaultSize, borderRadius: "50%" });
  gsap.set([cursorbg], { opacity: 0 });
  gsap.set([icon, text], { opacity: 0, scale: 0.6 });

  // Snelle setter voor cursor
  const setCursorX = gsap.quickSetter(cursor, "x", "px");
  const setCursorY = gsap.quickSetter(cursor, "y", "px");

  // Muismove handler
  document.addEventListener("mousemove", (e) => {
    appState.mouse.x = e.clientX;
    appState.mouse.y = e.clientY;

    if (!appState.hasMoved) {
      // Eerste beweging: cursor direct, bg vloeiend
      gsap.set(cursor, { x: e.clientX, y: e.clientY, });
      gsap.set(cursorbg, { x: e.clientX, y: e.clientY });
      gsap.to(cursorbg, { duration: 0.3, ease: "power2.out" });
      appState.hasMoved = true;
      return; // skip verdere animatie
    }

    // Daarna: cursor direct, bg vloeiend
    gsap.set(cursor, { x: e.clientX, y: e.clientY });
    gsap.to(cursorbg, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  });

  // Reset cursor naar standaard stip
  function resetToDot() {
    gsap.killTweensOf([cursor, cursorbg, icon, text]);
    gsap.to([icon, text], { duration: 0.2, opacity: 0, scale: 0.6, ease: "power1.in" });
    gsap.to([cursor, cursorbg], {
      duration: 0.15,
      ease: "power1.in",
      width: defaultSize,
      height: defaultSize,
      scale: 1,
      borderRadius: "50%",
      opacity: 1,
      transformOrigin: "center center",
    });
  }

  // Hover enter
  function handleEnter(el) {
    if (!appState.hasMoved) return; // voorkomt dat hover triggerd zonder muisbeweging
    gsap.killTweensOf([cursor, cursorbg, icon, text]);

    const iconHex = el.dataset.hoverIcon;
    const hoverText = el.dataset.hoverText;

    if (iconHex) {
      icon.textContent = String.fromCharCode(parseInt(iconHex, 16));
      text.textContent = "";
      gsap.to([cursor, cursorbg], { duration: 0.3, ease: "back.out(3)", width: 120, height: 120, borderRadius: "50%", opacity: 1 });
      gsap.to(icon, { duration: 0.3, ease: "back.out(2)", opacity: 1, scale: 1 });
    } else if (hoverText) {
      icon.textContent = "";
      text.textContent = hoverText;
      gsap.to([cursor, cursorbg], { duration: 0.3, ease: "back.out(3)", width: 120, height: 120, borderRadius: "50%", opacity: 1 });
      gsap.to(text, { duration: 0.3, ease: "back.out(2)", opacity: 1, scale: 1 });
    } else {
      icon.textContent = "";
      text.textContent = "";
      gsap.to([cursor, cursorbg], { duration: 0.3, ease: "back.out(3)", width: 40, height: 40, borderRadius: "50%", opacity: 1 });
    }
  }

  // Event listeners
  document.addEventListener("mouseover", (e) => {
    if (appState.isTransitioning) return;
    const el = e.target.closest("a");
    if (el) handleEnter(el);
  });

  document.addEventListener("mouseout", (e) => {
    const el = e.target.closest("a");
    if (!el) return;
    if (e.relatedTarget && e.relatedTarget.closest("a")) return;
    resetToDot();
  });

  window.resetToDot = resetToDot;
}
