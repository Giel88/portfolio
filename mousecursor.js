// Only run the custom-cursor code if viewport ≥ 992px
if (window.matchMedia("(min-width: 992px)").matches) {
  (function () {
    const defaultSize = 12;

    // — Build cursor DOM —
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

    // — Startwaarden forceren —
    gsap.set([cursor, cursorbg], { 
      width: defaultSize, 
      height: defaultSize, 
      opacity: 1,
      borderRadius: "50%",      
    });
    gsap.set([icon, text], { 
      opacity: 0, 
      scale: 0.6 
    });

    // — Track the real mouse (no GSAP tween per move) —
    const mouse = { x: 0, y: 0 };
    document.addEventListener("mousemove", e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // — Smooth follow cursor & cursor-bg in one ticker —
    gsap.ticker.add(() => {
      gsap.set(cursor, { x: mouse.x, y: mouse.y });
      gsap.to(cursorbg, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: "power2.out"
      });
    });

    // — Reset back to dot —
    function resetToDot() {
      // Kill tweens only on relevant elements
      gsap.killTweensOf([cursor, cursorbg]);
      gsap.killTweensOf([icon, text]);

      gsap.to([icon, text], {
        duration: 0.2,
        opacity: 0,
        scale: 0.6,
        ease: "power1.in",
      });

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
    window.resetToDot = resetToDot;

    // — Hover enter logic —
    function handleEnter(el) {
      gsap.killTweensOf([cursor, cursorbg]);
      gsap.killTweensOf([icon, text]);

      const iconHex = el.dataset.hoverIcon;
      const hoverText = el.dataset.hoverText;

      if (iconHex) {
        icon.textContent = String.fromCharCode(parseInt(iconHex, 16));
        text.textContent = "";
        gsap.to([cursor, cursorbg], { 
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
        gsap.to([cursor, cursorbg], { 
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
        gsap.to([cursor, cursorbg], { 
          duration: 0.3, 
          ease: "back.out(3)", 
          width: 40, 
          height: 40, 
          borderRadius: "50%", 
          opacity: 1 
        });
      }
    }

    // — Event delegation voor <a> elements —
    document.addEventListener("mouseover", e => {
      if (window.isTransitioning) return;
      const el = e.target.closest("a");
      if (el) handleEnter(el);
    });

    document.addEventListener("mouseout", e => {
      const el = e.target.closest("a");
      if (!el) return;
      if (e.relatedTarget && e.relatedTarget.closest("a")) return;
      resetToDot();
    });

    // — Initialize —
    resetToDot();
  })();
}
