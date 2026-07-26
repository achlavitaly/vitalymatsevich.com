const data = window.PORTFOLIO_DATA;
const projectsRoot = document.querySelector("[data-projects]");

const externalIcon = `
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7 4h9v9M16 4 6 14"></path>
  </svg>
`;

projectsRoot.innerHTML = data.projects.filter((project) => project.status === "published").map((project) => {
  const projectLink = project.href
    ? `<a class="project-link" href="${project.href}" target="_blank" rel="noreferrer">
         ${project.linkLabel}${externalIcon}
       </a>`
    : "";

  return `
    <article class="project project--${project.tone}">
      <div class="project-index" aria-hidden="true">${project.number}</div>
      <div class="project-heading">
        <p>${project.role}</p>
        <h3>${project.title}</h3>
        <strong>${project.subtitle}</strong>
      </div>
      <p class="project-summary"><span class="field-label">Problem</span>${project.problem}</p>
      <div class="project-system">
        <span class="field-label">System built</span>
        <ul class="outcomes" aria-label="${project.title} system">
          ${project.system.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div class="project-foot">
        <p><span class="field-label">Evidence</span>${project.evidence}</p>
        ${projectLink}
      </div>
    </article>
  `;
}).join("");

const contacts = (data.contacts || []).filter((contact) => contact.url && contact.label);

if (contacts.length) {
  document.querySelector("[data-contact]").innerHTML = `
    <div class="contact-links">
      ${contacts.map((contact) => `
        <a class="primary-action" href="${contact.url}"${contact.url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>
          ${contact.label}${externalIcon}
        </a>
      `).join("")}
    </div>
  `;
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const header = document.querySelector("[data-header]");
const updateHeader = () => header.toggleAttribute("data-scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

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
