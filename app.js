const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearTarget = document.querySelector("[data-year]");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const header = document.querySelector("[data-header]");
if (header) {
  let headerFramePending = false;
  window.addEventListener("scroll", () => {
    if (headerFramePending) return;
    headerFramePending = true;
    requestAnimationFrame(() => {
      header.toggleAttribute("data-scrolled", window.scrollY > 24);
      headerFramePending = false;
    });
  }, { passive: true });
}

// The dial's tick bands answer the scroll instead of idling on a clock. Their
// transforms are written directly, so scrolling does not invalidate styles
// for every descendant of the diagram.
const systemMap = document.querySelector(".system-map");
if (systemMap) {
  const outerDial = systemMap.querySelector(".dial--outer");
  const innerDial = systemMap.querySelector(".dial--inner");
  let dialVisible = true;
  let ticking = false;

  const turnDial = () => {
    const turn = window.scrollY * 0.08;
    outerDial.style.transform = `rotate(${turn.toFixed(2)}deg)`;
    innerDial.style.transform = `rotate(${(-turn * 0.6).toFixed(2)}deg)`;
    ticking = false;
  };

  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      dialVisible = entry.isIntersecting;
      systemMap.toggleAttribute("data-paused", !dialVisible);
      if (dialVisible && !reducedMotion) turnDial();
    });
  }).observe(systemMap);

  if (!reducedMotion) {
    turnDial();
    window.addEventListener("scroll", () => {
      if (!ticking && dialVisible) {
        ticking = true;
        requestAnimationFrame(turnDial);
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
