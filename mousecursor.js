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

    const icon = document.createElement("span");
    icon.className = "icon custom-cursor-icon";
    document.body.appendChild(icon);

    const text = document.createElement("span");
    text.className = "custom-cursor-text";
    document.body.appendChild(text);

    // — Startwaarden forceren —
    gsap.set(cursor, { width: defaultSize, height: defaultSize, backgroundColor: defaultColor, opacity: 1 });
    gsap.set([icon, text], { opacity: 0, scale: 0.6 });

    // — Cursor volgt muis direct —
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setX(mouseX);
      setY(mouseY);
    });

    // — Icon & text volgen muis met lichte vertraging —
    gsap.ticker.add(() => {
      gsap.set(icon, {
        x: gsap.utils.interpolate(parseFloat(icon._x || mouseX), mouseX, 0.15),
        y: gsap.utils.interpolate(parseFloat(icon._y || mouseY), mouseY, 0.15)
      });
      icon._x = parseFloat(icon._x || mouseX);
      icon._y = parseFloat(icon._y || mouseY);

      gsap.set(text, {
        x: gsap.utils.interpolate(parseFloat(text._x || mouseX), mouseX, 0.15),
        y: gsap.utils.interpolate(parseFloat(text._y || mouseY), mouseY, 0.15)
      });
      text._x = parseFloat(text._x || mouseX);
      text._y = parseFloat(text._y || mouseY);
    });

    // — Reset back to dot —
    function resetToDot() {
      gsap.killTweensOf([cursor, icon, text]);
      gsap.to([icon, text], {
        duration: 0.2,
        opacity: 0,
        scale: 0.6,
        ease: "power1.in"
      });
      gsap.to(cursor, {
        duration: 0.15,
        ease: "power1.in",
        width: defaultSize,
        height: defaultSize,
        scale: 1,
        borderRadius: "50%",
        opacity: 1
      });
    }

    // — Hover enter logic —
    function handleEnter(el) {
      gsap.killTweensOf([cursor, icon, text]);
      const color = el.dataset.cursorColor || hoverColor;
      const iconHex = el.dataset.hoverIcon;
      const hoverText = el.dataset.hoverText;

      if (iconHex) {
        icon.textContent = String.fromCharCode(parseInt(iconHex, 16));
        text.textContent = "";
        gsap.to(cursor, { duration: 0.3, ease: "back.out(3)", width: 80, height: 80, borderRadius: "50%", opacity: 1 });
        gsap.to(icon, { duration: 0.3, ease: "back.out(2)", opacity: 1, scale: 1 });
      } else if (hoverText) {
        icon.textContent = "";
        text.textContent = hoverText;
        gsap.to(cursor, { duration: 0.3, ease: "back.out(3)", width: 80, height: 80, borderRadius: "50%", opacity: 1 });
        gsap.to(text, { duration: 0.3, ease: "back.out(2)", opacity: 1, scale: 1 });
      } else {
        icon.textContent = "";
        text.textContent = "";
        gsap.to(cursor, { duration: 0.3, ease: "back.out(3)", width: 40, height: 40, borderRadius: "50%", opacity: 1 });
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
