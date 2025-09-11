if (window.matchMedia("(min-width: 992px)").matches) {
  (function () {
    const defaultSize = 12;
    const defaultColor = "var(--cursor)";
    const hoverColor = "var(--cursor-hover)";

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";

    const icon = document.createElement("span");
    icon.className = "icon custom-cursor-icon";
    cursor.appendChild(icon);
    document.body.appendChild(cursor);

    gsap.set(cursor, { width: defaultSize, height: defaultSize, backgroundColor: defaultColor, opacity: 1 });
    gsap.set(icon, { opacity: 0, scale: 0.6 });

    // Muiskoordinaten
    let mouse = { x: 0, y: 0 };
    document.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Cursor volgt direct
      gsap.set(cursor, { x: mouse.x, y: mouse.y });
    });

    // — Reset naar kleine dot —
    function resetToDot() {
      gsap.killTweensOf([icon]);

      gsap.to(icon, { duration: 0.2, opacity: 0, scale: 0.6, ease: "power1.in" });
      gsap.to(cursor, {
        duration: 0.15,
        ease: "power1.in",
        width: defaultSize,
        height: defaultSize,
        scale: 1,
        borderRadius: "50%",
        backgroundColor: defaultColor,
        opacity: 1,
      });
    }

    // — Hover logic —
    function handleEnter(el) {
      gsap.killTweensOf([icon]);

      const color = el.dataset.cursorColor || hoverColor;
      const iconHex = el.dataset.hoverIcon;

      if (iconHex) {
        icon.textContent = String.fromCharCode(parseInt(iconHex, 16));
        gsap.to(cursor, {
          duration: 0.3,
          ease: "back.out(3)",
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: 1,
        });
        // Icoon vertraagd voor gelaagd effect
        gsap.to(icon, {
          duration: 0.15,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        });
      } else {
        icon.textContent = "";
        gsap.to(cursor, {
          duration: 0.3,
          ease: "back.out(3)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: 1,
        });
      }
    }

    // — Event delegation voor links —
    document.addEventListener("mouseover", (e) => {
      const el = e.target.closest("a");
      if (el) handleEnter(el);
    });

    document.addEventListener("mouseout", (e) => {
      const el = e.target.closest("a");
      if (!el) return;
      if (e.relatedTarget && e.relatedTarget.closest("a")) return;
      resetToDot();
    });

    resetToDot();
  })();
}
