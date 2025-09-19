// mousecursor.js — geoptimaliseerde versie
// Houdt de functionaliteit hetzelfde als jouw originele script
// Exporteert initCustomCursor() en destroyCustomCursor() voor gebruik met Barba

(function () {
  // CONFIG
  const MIN_WIDTH_PX = 992;
  const DEFAULT_SIZE = 12;
  const HOVER_SIZE = 120;
  const SMALL_HOVER_SIZE = 40;
  const BG_EASE_DURATION = 0.1;

  // STATE (encapsulated)
  let cursor, cursorBg, icon, text;
  let mouseMoveHandler = null;
  let mouseOverHandler = null;
  let mouseOutHandler = null;
  let keyboardHandler = null;
  let quickSetX = null;
  let quickSetY = null;
  let isInitialized = false;

  // Helpers
  const matchesDesktop = () => window.matchMedia(`(min-width: ${MIN_WIDTH_PX}px)`).matches;

  function createDOM() {
    // cursor-bg
    cursorBg = document.createElement("div");
    cursorBg.className = "custom-cursor-bg";
    // cursor
    cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    icon = document.createElement("span");
    icon.className = "icon custom-cursor-icon";
    text = document.createElement("span");
    text.className = "custom-cursor-text";
    cursor.appendChild(icon);
    cursor.appendChild(text);

    document.body.appendChild(cursorBg);
    document.body.appendChild(cursor);

    // initial styles via GSAP to avoid layout thrash
    gsap.set([cursor, cursorBg], {
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE,
      opacity: 1,
      borderRadius: "50%",
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "center center"
    });
    gsap.set([icon, text], { opacity: 0, scale: 0.6 });
  }

  function removeDOM() {
    if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
    if (cursorBg && cursorBg.parentNode) cursorBg.parentNode.removeChild(cursorBg);
    cursor = cursorBg = icon = text = null;
  }

  function resetToDot() {
    if (!cursor || !cursorBg) return;
    gsap.killTweensOf([cursor, cursorBg, icon, text]);

    gsap.to([icon, text], {
      duration: 0.2,
      opacity: 0,
      scale: 0.6,
      ease: "power1.in",
      overwrite: true
    });

    gsap.to([cursor, cursorBg], {
      duration: 0.15,
      ease: "power1.in",
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE,
      scale: 1,
      borderRadius: "50%",
      opacity: 1,
      transformOrigin: "center center",
      overwrite: true
    });
  }

  // Hover enter behaviour (element kan data-hover-icon en data-hover-text hebben)
  function handleEnter(el) {
    if (window.isTransitioning) return;
    if (!cursor || !cursorBg) return;

    gsap.killTweensOf([cursor, cursorBg, icon, text]);

    const iconHex = el && el.dataset ? el.dataset.hoverIcon : null;
    const hoverText = el && el.dataset ? el.dataset.hoverText : null;

    if (iconHex) {
      icon.textContent = String.fromCharCode(parseInt(iconHex, 16));
      text.textContent = "";
      gsap.to([cursor, cursorBg], {
        duration: 0.3,
        ease: "back.out(3)",
        width: HOVER_SIZE,
        height: HOVER_SIZE,
        borderRadius: "50%",
        opacity: 1,
        overwrite: true
      });
      gsap.to(icon, { duration: 0.3, ease: "back.out(2)", opacity: 1, scale: 1, overwrite: true });
    } else if (hoverText) {
      icon.textContent = "";
      text.textContent = hoverText;
      gsap.to([cursor, cursorBg], {
        duration: 0.3,
        ease: "back.out(3)",
        width: HOVER_SIZE,
        height: HOVER_SIZE,
        borderRadius: "50%",
        opacity: 1,
        overwrite: true
      });
      gsap.to(text, { duration: 0.3, ease: "back.out(2)", opacity: 1, scale: 1, overwrite: true });
    } else {
      icon.textContent = "";
      text.textContent = "";
      gsap.to([cursor, cursorBg], {
        duration: 0.3,
        ease: "back.out(3)",
        width: SMALL_HOVER_SIZE,
        height: SMALL_HOVER_SIZE,
        borderRadius: "50%",
        opacity: 1,
        overwrite: true
      });
    }
  }

  // Cleanup enter -> dot on mouseout
  function handleLeave(el, e) {
    // zorg dat we niet 'leave' triggeren bij verplaatsen binnen link-children
    if (e && e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("a, .button, .case-link")) return;
    resetToDot();
  }

  // Init function die je kunt aanroepen vanuit barba.afterEnter
  function initCustomCursor() {
    if (isInitialized) return;
    if (!matchesDesktop()) return;
    isInitialized = true;

    createDOM();

    // quickSetters
    quickSetX = gsap.quickSetter(cursor, "x", "px");
    quickSetY = gsap.quickSetter(cursor, "y", "px");

    // mousemove: direct cursor & bg volgt soepel
    mouseMoveHandler = function (e) {
      // directe set voor blurringsvrije tracking
      quickSetX(e.clientX);
      quickSetY(e.clientY);

      // cursorbg volgt met een lichte tween
      gsap.to(cursorBg, {
        x: e.clientX,
        y: e.clientY,
        duration: BG_EASE_DURATION,
        ease: "power2.out",
        overwrite: true
      });
    };

    // event delegation voor hover targets
    mouseOverHandler = function (e) {
      if (window.isTransitioning) return;
      const el = e.target.closest && e.target.closest("a, .button, .case-link");
      if (el) handleEnter(el);
    };

    mouseOutHandler = function (e) {
      const el = e.target.closest && e.target.closest("a, .button, .case-link");
      if (!el) return;
      // leave only if we moved outside target (not to child)
      handleLeave(el, e);
    };

    // Hide custom cursor when user uses keyboard (Tab) to respect accessibility
    keyboardHandler = function (e) {
      if (e.key === "Tab") {
        // hide custom cursor to prefer native focus outline
        if (cursor) cursor.style.display = "none";
        if (cursorBg) cursorBg.style.display = "none";
      }
    };

    // Show custom cursor again on mouse move (if hidden)
    const showOnMouse = function () {
      if (cursor) cursor.style.display = "";
      if (cursorBg) cursorBg.style.display = "";
      // remove one-time listener
      document.removeEventListener("mousemove", showOnMouse);
    };

    document.addEventListener("mousemove", mouseMoveHandler, { passive: true });
    document.addEventListener("mouseover", mouseOverHandler, { passive: true });
    document.addEventListener("mouseout", mouseOutHandler, { passive: true });
    document.addEventListener("keydown", keyboardHandler);

    document.addEventListener("mousemove", showOnMouse, { once: true, passive: true });

    // Expose resetToDot globally like before
    window.resetToDot = resetToDot;

    // Start as dot
    resetToDot();
  }

  // Destroy function die je in Barba.leave kunt aanroepen
  function destroyCustomCursor() {
    if (!isInitialized) return;
    isInitialized = false;

    // verwijder listeners
    if (mouseMoveHandler) document.removeEventListener("mousemove", mouseMoveHandler);
    if (mouseOverHandler) document.removeEventListener("mouseover", mouseOverHandler);
    if (mouseOutHandler) document.removeEventListener("mouseout", mouseOutHandler);
    if (keyboardHandler) document.removeEventListener("keydown", keyboardHandler);

    // verwijder eventuele one-time show listener ook veilig
    // (we can attempt remove regardless)
    document.removeEventListener("mousemove", function () {});

    // kill tweens en revert globals
    if (cursor && cursorBg) {
      gsap.killTweensOf([cursor, cursorBg, icon, text]);
    }

    // clear DOM nodes
    removeDOM();

    // clean quickSetters references
    quickSetX = quickSetY = null;

    // unset exposed global
    if (window.resetToDot) delete window.resetToDot;
  }

  // Expose functions
  window.initCustomCursor = initCustomCursor;
  window.destroyCustomCursor = destroyCustomCursor;

  // Auto-init on first load if desktop
  document.addEventListener("DOMContentLoaded", () => {
    if (matchesDesktop()) {
      initCustomCursor();
    }
  });

  // Optional: disable on resize below breakpoint
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!matchesDesktop()) {
        destroyCustomCursor();
      } else {
        initCustomCursor();
      }
    }, 150);
  });
})();
