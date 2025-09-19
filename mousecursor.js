// mousecursor.js
if (window.matchMedia("(min-width: 992px)").matches) {
  (function () {
    const DEFAULT_SIZE = 12;
    const HOVER_SIZE = 120;

    // -----------------------------
    // Cursor DOM opbouwen
    // -----------------------------
    const cursorBg = document.createElement("div");
    cursorBg.className = "custom-cursor-bg";
    document.body.appendChild(cursorBg);

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    const icon = document.createElement("span");
    icon.className = "icon custom-cursor-icon";
    cursor.appendChild(icon);
    const text = document.createElement("span");
    text.className = "custom-cursor-text";
    cursor.appendChild(text);
    document.body.appendChild(cursor);

    gsap.set([cursor, cursorBg], {
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE,
      opacity: 1,
      borderRadius: "50%",
      transformOrigin: "center center"
    });
    gsap.set([icon, text], { opacity: 0, scale: 0.6 });

    // -----------------------------
    // Mouse tracking
    // -----------------------------
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    document.addEventListener("mousemove", e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // cursorBg volgt soepel
      gsap.to(cursorBg, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto"
      });

      // cursor volgt direct
      gsap.set(cursor, { x: mouse.x, y: mouse.y });
    });

    // -----------------------------
    // Reset cursor naar dot
    // -----------------------------
    function resetToDot() {
      gsap.killTweensOf([cursor, cursorBg, icon, text]);
      gsap.to([icon, text], {
        duration: 0.2,
        opacity: 0,
        scale: 0.6,
        ease: "power1.in",
        overwrite: "auto"
      });
      gsap.to([cursor, cursorBg], {
        duration: 0.15,
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
        scale: 1,
        borderRadius: "50%",
        opacity: 1,
        ease: "power1.in",
        overwrite: "auto"
      });
    }
    window.resetToDot = resetToDot;

    // -----------------------------
    // Hover logic
    // -----------------------------
    function handleEnter(el) {
      if (window.isTransitioning) return;
      gsap.killTweensOf([cursor, cursorBg, icon, text]);

      const iconHex = el.dataset.hoverIcon;
      const hoverText = el.dataset.hoverText;

      // Content
      if (iconHex) {
        icon.textContent = String.fromCharCode(parseInt(iconHex, 16));
        text.textContent = "";
      } else if (hoverText) {
        icon.textContent = "";
        text.textContent = hoverText;
      } else {
        icon.textContent = "";
        text.textContent = "";
      }

      // Cursor grootte
      gsap.to([cursor, cursorBg], {
        width: HOVER_SIZE,
        height: HOVER_SIZE,
        duration: 0.3,
        ease: "back.out(3)",
        overwrite: "auto"
      });

      // Icon/text fade in
      gsap.to([icon, text], {
        opacity: (iconHex || hoverText) ? 1 : 0,
        scale: (iconHex || hoverText) ? 1 : 0.6,
        duration: 0.3,
        ease: "back.out(2)",
        overwrite: "auto"
      });
    }

    // -----------------------------
    // Event delegation
    // -----------------------------
    document.addEventListener("mouseover", e => {
      if (window.isTransitioning) return;
      const el = e.target.closest("a, .button, .case-link");
      if (el) handleEnter(el);
    });

    document.addEventListener("mouseout", e => {
      const el = e.target.closest("a, .button, .case-link");
      if (!el) return;
      if (e.relatedTarget && e.relatedTarget.closest("a, .button, .case-link")) return;
      resetToDot();
    });

    // -----------------------------
    // Init
    // -----------------------------
    resetToDot();
  })();
}
