const cursor = document.querySelector(".custom-cursor");
const icon = cursor.querySelector(".custom-cursor-icon");

// GSAP quickSetter voor vloeiende tracking
const setX = gsap.quickSetter(cursor, "x", "px");
const setY = gsap.quickSetter(cursor, "y", "px");

// Cursor volgt de muis
document.addEventListener("mousemove", e => {
  setX(e.clientX);
  setY(e.clientY);
});

// Reset cursor naar standaard
function resetCursor() {
  gsap.to(cursor, { duration: 0.3, width: 12, height: 12 });
  icon.style.display = "none";
  icon.style.transform = "rotate(0deg)";
}

// Hover effect
document.querySelectorAll("a").forEach(el => {
  el.addEventListener("mouseenter", () => {
    // Stip groter maken
    gsap.to(cursor, { duration: 0.3, width: 60, height: 60 });

    // Toon icoon
    icon.style.display = "block";

    // Controleer data-attribute
    if (el.dataset.iconHover === "flipped") {
      icon.style.transform = "rotate(-90deg)"; // 90° tegen de klok in
    } else {
      icon.style.transform = "rotate(0deg)";
    }
  });

  el.addEventListener("mouseleave", resetCursor);
});

// Initialize
resetCursor();
