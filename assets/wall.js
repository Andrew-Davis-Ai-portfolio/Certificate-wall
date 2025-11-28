// Flame Division – Floating Certificate Wall (Phase 1)

const CERTS = [
  {
    id: "caio",
    title: "Certified Chief AI Officer (CAIO)",
    org: "School of AI / Udemy",
    domains: ["AI Governance", "Executive Strategy", "Risk"],
    src: "assets/caio-cert.jpg",
    href: "https://ude.my/UC-77122c8f-bedd-478d-9943-fdd20ed638e8"
  },
  {
    id: "caiip",
    title: "Certified AI Implementation Professional (CAIIP)",
    org: "School of AI / Udemy",
    domains: ["Implementation", "Automation", "Delivery"],
    src: "assets/caiip-cert.jpg"
  },
  {
    id: "ai-ethics",
    title: "Responsible AI & Ethics",
    org: "Udemy",
    domains: ["Ethics", "Governance"],
    src: "assets/ai-ethics-cert.jpg"
  },
  {
    id: "llm-engineering",
    title: "LLM Engineering – Large Language Models & Agents",
    org: "Udemy",
    domains: ["LLMs", "Agents"],
    src: "assets/llm-engineering-cert.jpg"
  },
  {
    id: "aws-devops",
    title: "AWS DevOps & CI/CD Fundamentals",
    org: "AWS / Instructor Program",
    domains: ["Cloud", "DevOps"],
    src: "assets/aws-devops-cert.jpg"
  },
  {
    id: "k8s",
    title: "Kubernetes & Container Orchestration",
    org: "Kubernetes Training Track",
    domains: ["Kubernetes", "DevOps"],
    src: "assets/k8s-cert.jpg"
  },
  {
    id: "n8n",
    title: "Automation Engineering with n8n",
    org: "Udemy / n8n Track",
    domains: ["Automation", "Workflows"],
    src: "assets/n8n-cert.jpg"
  },
  {
    id: "data-analytics",
    title: "AI-Powered Data Analytics & Visualization",
    org: "Udemy",
    domains: ["Data", "Analytics"],
    src: "assets/data-analytics-cert.jpg"
  },
  {
    id: "security",
    title: "Cybersecurity & Threat Detection with AI",
    org: "Security Program",
    domains: ["Security", "Detection"],
    src: "assets/security-cert.jpg"
  }
  // Add more certs as needed…
];

const wallEl = document.getElementById("fd-wall");
const lightbox = document.getElementById("fd-lightbox");
const lightboxImg = document.getElementById("fd-lightbox-img");
const lightboxMeta = document.getElementById("fd-lightbox-meta");
const lightboxClose = document.querySelector(".fd-lightbox-close");

// ---- Render tiles ----

CERTS.forEach((c, idx) => {
  const card = document.createElement("article");
  card.className = "fd-cert";
  card.dataset.depth = (idx % 5) + 1; // 1–5 depth layers

  card.innerHTML = `
    <div class="fd-cert-img-wrap">
      <img class="fd-cert-img" src="${c.src}" alt="${c.title}" loading="lazy" />
    </div>
    <div class="fd-cert-body">
      <h3 class="fd-cert-title">${c.title}</h3>
      <p class="fd-cert-org">${c.org}</p>
      <div class="fd-cert-tags">
        ${c.domains
          .map(
            (d, i) =>
              `<span class="fd-tag ${i === 0 ? "fd-tag-gold" : ""}">${d}</span>`
          )
          .join("")}
      </div>
    </div>
  `;

  card.addEventListener("click", () => openLightbox(c));
  wallEl.appendChild(card);
});

// ---- Parallax effect ----

function handleParallax(e) {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth - 0.5) * 2;
  const y = (e.clientY / innerHeight - 0.5) * 2;

  document.querySelectorAll(".fd-cert").forEach((el) => {
    const depth = Number(el.dataset.depth || 1);
    const moveX = x * depth * 2;
    const moveY = y * depth * 2;
    el.style.transform = `translate3d(${moveX}px, ${moveY * -1}px, 0)`;
  });
}

window.addEventListener("mousemove", handleParallax);

// ---- Lightbox ----

function openLightbox(cert) {
  lightboxImg.src = cert.src;
  const domains = cert.domains.join(" • ");
  const link =
    cert.href
      ? `<br /><a href="${cert.href}" target="_blank" rel="noopener noreferrer">Verify credential</a>`
      : "";
  lightboxMeta.innerHTML = `<strong>${cert.title}</strong><br />${cert.org}<br /><span>${domains}</span>${link}`;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "flex") {
    closeLightbox();
  }
});
