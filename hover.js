// CASE LIST
document.querySelectorAll('.case-link').forEach(link => {
  // vind de linktitle binnen dit specifieke link-item
  const title = link.querySelector('.linktitle');
  if (!title) return;

  // hover in
  link.addEventListener('mouseenter', () => {
    gsap.to(title, { x: 20, duration: 0.3, ease: "power2.out" });
  });

  // hover out
  link.addEventListener('mouseleave', () => {
    gsap.to(title, { x: 0, duration: 0.3, ease: "power2.out" });
  });
});

// BUTTON
document.querySelectorAll('.button').forEach(btn => {
  // vind de linktitle binnen deze button
  const title = btn.querySelector('.linktitle');
  if (!title) return;

  // hover in
  btn.addEventListener('mouseenter', () => {
    gsap.to(title, { x: 20, duration: 0.3, ease: "power2.out" });
  });

  // hover out
  btn.addEventListener('mouseleave', () => {
    gsap.to(title, { x: 0, duration: 0.3, ease: "power2.out" });
  });
});
