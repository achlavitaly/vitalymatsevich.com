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

// The Etsy evidence figure shows a landscape capture on wide screens and a
// portrait one on phones. They were taken on different days, so their review
// counts and year over year percentages differ slightly. The "open full
// screenshot" link therefore has to follow whichever capture is on screen,
// otherwise it opens a file that contradicts the picture above it. Reading
// currentSrc keeps this tied to the browser's own choice instead of repeating
// the breakpoint here, where it could drift from the markup. Without
// JavaScript the link keeps its landscape target, which is the old behaviour.
const evidenceLink = document.querySelector("[data-evidence-mobile]");
if (evidenceLink) {
  const evidenceImage = evidenceLink.querySelector("img");
  const wideTarget = evidenceLink.getAttribute("href");
  const mobileTarget = evidenceLink.dataset.evidenceMobile;

  const syncEvidenceTarget = () => {
    const shown = evidenceImage?.currentSrc;
    if (!shown) return;
    evidenceLink.href = shown.includes("teezaro-evidence-mobile") ? mobileTarget : wideTarget;
  };

  syncEvidenceTarget();
  evidenceImage?.addEventListener("load", syncEvidenceTarget);
  window.addEventListener("resize", syncEvidenceTarget, { passive: true });
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
