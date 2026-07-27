const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearTarget = document.querySelector("[data-year]");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const header = document.querySelector("[data-header]");
if (header) {
  const updateHeader = () => header.toggleAttribute("data-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

// The dial's tick bands answer the scroll instead of idling on a clock: the
// outer band turns with the page, the inner one counters it in CSS. The node
// pulse stays CSS-only and is parked whenever the dial is off screen.
const systemMap = document.querySelector(".system-map");
if (systemMap) {
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      systemMap.toggleAttribute("data-paused", !entry.isIntersecting);
    });
  }).observe(systemMap);

  if (!reducedMotion) {
    let ticking = false;
    const turn = () => {
      systemMap.style.setProperty("--dial-turn", (window.scrollY * 0.08).toFixed(2) + "deg");
      ticking = false;
    };
    turn();
    window.addEventListener("scroll", () => {
      if (!ticking && !systemMap.hasAttribute("data-paused")) {
        ticking = true;
        requestAnimationFrame(turn);
      }
    }, { passive: true });
  }
}

if (!reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-visible", "");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".project, .method-track article").forEach((element) => {
    element.setAttribute("data-reveal", "");
    observer.observe(element);
  });
}
