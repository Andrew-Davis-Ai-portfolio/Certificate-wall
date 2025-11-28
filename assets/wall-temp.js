// wall.js — Flame Division Floating Cert Wall (Phase 2 — Einhorn Online)

// 1) Data: map each cert to its image + meta
// NOTE: Make sure img paths & names match files in /Certs exactly.

// wall.js — Flame Division Floating Cert Wall (Phase 2 — Einhorn Online)

const CERTS = [
  {
    id: "caio",
    title: "Certified Chief AI Officer (CAIO)",
    org: "School of AI / Udemy",
    domain: "AI Strategy • Governance • Executive Leadership",
    img: "Certs/caio.png"
  },
  {
    id: "caiip",
    title: "Certified AI Implementation Professional (CAIIP)",
    org: "School of AI / Udemy",
    domain: "AI Deployment • Automation • Systems Integration",
    img: "Certs/caiip.png"
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Guardrails",
    org: "Udemy",
    domain: "Responsible AI • Risk • Governance",
    img: "Certs/aiethics.png"
  },
  {
    id: "n8n",
    title: "N8N – Workflow & Automation Engineering",
    org: "Udemy",
    domain: "Automation • Orchestration • Integration",
    img: "Certs/n8n.png"
  },
  {
    id: "aws-sec",
    title: "AWS Security Specialty (Prep)",
    org: "AWS / Udemy",
    domain: "Cloud Security • IAM • Governance",
    img: "Certs/scs-c02.png"       // AWS security prep
  },
  {
    id: "aws-devops",
    title: "AWS DevOps Engineer (DOP-C02 Prep)",
    org: "AWS / Udemy",
    domain: "DevOps • CI/CD • Cloud Automation",
    img: "Certs/dop-c02.png"
  },
  {
    id: "aws-ml",
    title: "AWS Certified Machine Learning (MLS-C01 Prep)",
    org: "AWS / Udemy",
    domain: "ML • Cloud Pipelines",
    img: "Certs/mls-c01.png"
  },
  {
    id: "medical-ai",
    title: "Medical AI — Clinical & Educational Use",
    org: "Udemy",
    domain: "Healthcare AI • Safety • Education",
    img: "Certs/medicalai.png"
  },
  {
    id: "ai-voice",
    title: "AI Voice Agent Engineering",
    org: "Udemy",
    domain: "Voice Bots • Call Automation",
    img: "Certs/aivoiceagent.png"
  },
  {
    id: "ai-video",
    title: "AI Video & Content Automation",
    org: "Udemy",
    domain: "Video AI • Automation • Content Systems",
    img: "Certs/aivideo.png"
  },
  {
    id: "ai-business",
    title: "AI & Business Strategy",
    org: "Udemy",
    domain: "Business • Strategy • Automation",
    img: "Certs/aiandbusiness.png"
  },
  {
    id: "ai-coding",
    title: "AI Coding & Cursor Engineering",
    org: "Udemy",
    domain: "Cursor • AI Coding • Dev Workflows",
    img: "Certs/aicodingcursorcert.png"
  },
  {
    id: "vibe-coding",
    title: "AI-Powered Data & Vibe Coding",
    org: "Udemy",
    domain: "Data • Analytics • Visualization",
    img: "Certs/vibecoding.png"
  },
  {
    id: "ai-engineer",
    title: "AI Engineer Foundations",
    org: "Udemy",
    domain: "LLMs • Systems • Deployment",
    img: "Certs/aiengineer.png"
  }
  // You can append more certs here any time — just keep img paths in sync
];

// 2) DOM references
const wallEl = document.getElementById("fd-wall");
const lightboxEl = document.getElementById("fd-lightbox");
const lightboxImgEl = document.getElementById("fd-lightbox-img");
const lightboxMetaEl = document.getElementById("fd-lightbox-meta");
const lightboxCloseEl = document.querySelector(".fd-lightbox-close");

// 3) Render tiles
function renderWall() {
  if (!wallEl) return;

  CERTS.forEach((cert, index) => {
    const tile = document.createElement("button");
    tile.className = "fd-tile";
    tile.setAttribute("type", "button");
    tile.setAttribute("data-index", String(index));

    // inner structure
    tile.innerHTML = `
      <div class="fd-tile-glow"></div>
      <div class="fd-tile-img" style="background-image:url('${cert.img}')"></div>
      <div class="fd-tile-label">
        <span class="fd-tile-title">${cert.title}</span>
        <span class="fd-tile-domain">${cert.domain}</span>
      </div>
    `;

    tile.addEventListener("click", () => openLightbox(index));
    wallEl.appendChild(tile);
  });
}

// 4) Lightbox controls
function openLightbox(index) {
  const cert = CERTS[index];
  if (!cert) return;

  lightboxImgEl.src = cert.img;
  lightboxImgEl.alt = cert.title;

  lightboxMetaEl.innerHTML = `
    <h3>${cert.title}</h3>
    <p class="fd-lb-org">${cert.org}</p>
    <p class="fd-lb-domain">${cert.domain}</p>
  `;

  lightboxEl.classList.add("fd-lightbox-open");
}

function closeLightbox() {
  lightboxEl.classList.remove("fd-lightbox-open");
  lightboxImgEl.src = "";
}

if (lightboxCloseEl) {
  lightboxCloseEl.addEventListener("click", closeLightbox);
}

lightboxEl?.addEventListener("click", (e) => {
  if (e.target === lightboxEl) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// 5) Init
document.addEventListener("DOMContentLoaded", renderWall);
