export function startPreloader() {

const tl = gsap.timeline();

tl.to(".preloader-shape-1", {
  x: "-=20px",
  duration: 0.5,
  delay: 0.5,
  ease: "power2.out",
});

tl.to(
  ".preloader-shape-2",
  {
    x: "+=20px",
    duration: 0.5,
    ease: "power2.out",
  },
  "<",
);

tl.to(".preloader-shape-1", {
  y: "+=20px",
  duration: 0.5,
  ease: "power2.out",
});

tl.to(
  ".preloader-shape-2",
  {
    y: "-=20px",
    duration: 0.5,
    ease: "power2.out",
  },
  "<",
);

tl.to(".preloader-shape-1", {
  x: "-=100px",
  duration: 0.5,
  ease: "back.out(1.7)",
});

tl.to(
  ".preloader-shape-2",
  {
    x: "+=100px",
    duration: 0.5,
    ease: "back.out(1.7)",
  },
  "<",
);

tl.to(
  ".text-container",
  {
    width: "200px",
    duration: 0.5,
    ease: "back.out(1.7)",
  },
  "<",
);

tl.fromTo(
  ".text._01",
  { y: "1rem", opacity: 0 },
  { y: "0rem", opacity: 1, duration: 0.5, ease: "power2.out" },
);

tl.to(".text._01", {
  delay: 0.5,
  y: "-1rem",
  opacity: 0,
});

tl.fromTo(
  ".text._02",
  { y: "1rem", opacity: 0 },
  { y: "0rem", opacity: 1, duration: 0.5, ease: "power2.out" },
  "<",
);

tl.to(".text._02", {
  delay: 0.5,
  y: "-1rem",
  opacity: 0,
});

tl.fromTo(
  ".text._03",
  { y: "1rem", opacity: 0 }, // beginpositie
  { y: "0rem", opacity: 1, duration: 0.5, ease: "power2.out" },
  "<",
);

tl.to(".text._03", {
  delay: 0.5,
  y: "-1rem",
  opacity: 0,
});

tl.to(
  ".text-container",
  {
    width: "0px",
    duration: 0.5,
  },
  "<",
);

tl.to(".preloader-shape-1", {
  x: "+=100px",
  duration: 0.5,
  ease: "back.out(1)",
});

tl.to(
  ".preloader-shape-2",
  {
    x: "-=100px",
    duration: 0.5,
    ease: "back.out(1)",
  },
  "<",
);

tl.to(".preloader-shape-1", {
  y: "+=20px",
  duration: 0.5,
  ease: "back.out(1)",
});

tl.to(
  ".preloader-shape-2",
  {
    y: "-=20px",
    duration: 0.5,
    ease: "back.out(1)",
  },
  "<",
);

tl.to(".preloader-shape-1", {
  x: "+=20px",
  duration: 0.5,
  ease: "back.out(1)",
});

tl.to(
  ".preloader-shape-2",
  {
    x: "-=20px",
    duration: 0.5,
    ease: "back.out(1)",
  },
  "<",
);

tl.to(".page-overlay", {
  opacity: 0,
  duration: 0.5,
  delay: 0.5,
});

}
