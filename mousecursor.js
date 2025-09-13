// Only run the custom-cursor code if viewport ≥ 992px
if (window.matchMedia("(min-width: 992px)").matches) {
  (function () {
    const defaultSize = 12;
    const defaultColor = "var(--cursor)";
    const hoverColor = "var(--cursor-hover)";

    // — Build cursor DOM —
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    // — Content container naast de cursor —
    const content = document.createElement("div");
    content.className = "custom-cursor-content";

    const icon = document.createElement("span");
    icon.className = "icon custom-cursor-icon";
    content.appendChild(icon);

    const text = document.createElement("span");
    text.className = "custom-cursor-text";
    content.appendChild(text);

    document.body.appendChild(content);

    // — Startwaarden forceren —
    gsap.set(cursor, { width: defaultSize, height: defaultSize, backgroundColor: defaultColor, opacity: 1 });
    gsap.set([icon, text], { opacity: 0, scale: 0.6 });

    // — Track the real mouse —
    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");

    const setContentX = gsap.quickSetter(content, "x", "px");
    const setContentY = gsap.quickSetter(content, "y", "px");

    document.addEventListener("mousemove", (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      // content volgt met lichte vertraging
      gsap.to(content, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    });

    // — Reset back to dot —
    function resetToDot() {
      gsap.killTweensOf([icon, text]);

      gsap.to([icon, text], {
        duration: 0.2,
        opacity: 0,
        scale: 0.6,
        ease: "power1.in",
      });

      gsap.to(cursor, {
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

    // — Hover enter logic —
    function handleEnter(el) {
      gsap.killTweensOf([icon, text]);

      const color = el.dataset.cursorColor || hoverColor;
      const iconHex = el.dataset.hoverIcon;
      const hoverText = el.dataset.hoverText;

      if (iconHex) {
        icon.textContent = String.fromCharCode(parseInt(iconHex, 16));
        text.textContent = "";

        gsap.to(cursor, { 
          duration: 0.3, 
          ease: "back.out(3)", 
          width: 120, 
          height: 120, 
          borderRadius: "50%", 
          opacity: 1 
        });
        
        gsap.to(icon, { 
          duration: 0.3, 
          ease: "back.out(2)", 
          opacity: 1, 
          scale: 1,
        });
        
      } else if (hoverText) {
        icon.textContent = "";
        text.textContent = hoverText;

        gsap.to(cursor, { 
          duration: 0.3, 
          ease: "back.out(3)", 
          width: 120, 
          height: 120, 
          borderRadius: "50%", 
          opacity: 1 
        });
        
        gsap.to(text, { 
          duration: 0.3, 
          ease: "back.out(2)", 
          opacity: 1, 
          scale: 1,
        });
        
      } else {
        icon.textContent = "";
        text.textContent = "";

        gsap.to(cursor, { 
          duration: 0.3, 
          ease: "back.out(3)", 
          width: 40, 
          height: 40, 
          borderRadius: "50%", 
          opacity: 1 
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

    // — Initialize —
    resetToDot();
  })();
}
