import { appState } from './main-state.js';

export function initCursor() {
  if (!window.matchMedia("(min-width: 992px)").matches) return;

  const defaultSize = 12;
  const cursorbg = document.createElement("div");
  cursorbg.className = "custom-cursor-bg";
  document.body.appendChild(cursorbg);

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";

  const icon = document.createElement("span");
  icon.className = "icon custom-cursor-icon";
  cursor.appendChild(icon);

  const text = document.createElement("span");
  text.className = "custom-cursor-text";
  cursor.appendChild(text);

  document.body.appendChild(cursor);

  gsap.set([cursor, cursorbg], { width: defaultSize, height: defaultSize, opacity: 0, borderRadius: "50%" });
  gsap.set([icon, text], { opacity: 0, scale: 0.6 });

  const setCursorX = gsap.quickSetter(cursor, "x", "px");
  const setCursorY = gsap.quickSetter(cursor, "y", "px");

  document.addEventListener("mousemove", (e) => {
    // Update globale muispositie en hasMoved
    appState.mouse.x = e.clientX;
    appState.mouse.y = e.clientY;
  
    if (!appState.hasMoved) {
      // Eerste muisbeweging: cursor direct positioneren, achtergrond vloeiend
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      gsap.set(cursorbg, { opacity: 1, duration: 0.3, ease: "power2.out" });
      appState.hasMoved = true;
      return; // geen animatie bij cursor zelf
    }
  
    // Daarna: vloeiende beweging
    gsap.set(cursor, { x: e.clientX, y: e.clientY });
    gsap.to(cursorbg, { x: e.clientX, y: e.clientY, opacity: 1, duration: 0.1, ease: "power2.out" });
  });

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

  function handleEnter(el) {
    if (!appState.hasMoved) return; // <-- check hier nu
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
