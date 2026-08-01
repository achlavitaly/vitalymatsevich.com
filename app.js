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
