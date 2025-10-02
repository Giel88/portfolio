export function startPreloader() {

const tl = gsap.timeline();

const split01 = new SplitText(".text._01", { type: "chars" });
const split02 = new SplitText(".text._02", { type: "chars" });
const split03 = new SplitText(".text._03", { type: "chars" });

tl.to(".preloader-shape-1", {
  x: "-=20px",
  duration: 0.5,
  delay: 0.5,
  ease: "back.out(1)",
});

tl.to(
  ".preloader-shape-2",
  {
    x: "+=20px",
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
  x: "-=40vw",
  duration: 0.5,
  ease: "back.out(1)",
});

tl.to(
  ".preloader-shape-2",
  {
    x: "+=40vw",
    duration: 0.5,
    ease: "back.out(1)",
  },
  "<",
);

tl.to(
  ".text-container",
  {
    width: "100vw",
    duration: 0.5,
    ease: "back.out(1)",
  },
  "<",
);

tl.fromTo(
  split01.chars,
  { y: "1rem", opacity: 0 },
  { y: "0rem", opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.05 }
);

tl.to(".text._01", {
  delay: 0.5,
  y: "-1rem",
  opacity: 0,
});

tl.fromTo(
  split02.chars,
  { y: "1rem", opacity: 0 },
  { y: "0rem", opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.05 }
);

tl.to(".text._02", {
  delay: 0.5,
  y: "-1rem",
  opacity: 0,
});

tl.fromTo(
  split03.chars,
  { y: "1rem", opacity: 0 },
  { y: "0rem", opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.05 }
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
  x: "+=40vw",
  duration: 0.5,
  ease: "back.out(0.25)",
});

tl.to(
  ".preloader-shape-2",
  {
    x: "-=40vw",
    duration: 0.5,
    ease: "back.out(0.25)",
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

tl.to(".page-overlay-preloader", {
  opacity: 0,
  duration: 0.5,
  delay: 0.5,
});

}

startPreloader();
