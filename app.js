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

// The lifecycle dial loops forever, so park it whenever it is off screen.
// It runs by default: if this script never arrives, the diagram still moves.
const systemMap = document.querySelector(".system-map");
if (systemMap) {
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      systemMap.toggleAttribute("data-paused", !entry.isIntersecting);
    });
  }).observe(systemMap);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
