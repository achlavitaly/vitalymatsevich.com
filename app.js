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

const processFlow = document.querySelector(".role-fit-process");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (processFlow && motionAllowed && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");

  const processObserver = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];
    if (!entry?.isIntersecting) return;

    processFlow.classList.add("is-active");
    observer.unobserve(processFlow);
  }, { threshold: 0.35 });

  processObserver.observe(processFlow);
}
