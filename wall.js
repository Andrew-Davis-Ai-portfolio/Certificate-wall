// wall.js — Flame Division Floating Cert Wall (clean voice + wall)

// Just to confirm load in console
console.log("🔥 wall.js loaded");

// 1) Data: map each cert to its image + meta
const CERTS = [
  {
    id: "caio",
    title: "Certified Chief AI Officer (CAIO)",
    org: "School of AI / Udemy",
    domain: "AI Strategy • Governance • Executive Leadership",
    img: "Certs/Caio.png"
  },
  {
    id: "caiip",
    title: "Certified AI Implementation Professional (CAIIP)",
    org: "School of AI / Udemy",
    domain: "AI Deployment • Automation • Systems Integration",
    img: "Certs/Caiip.png"
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Guardrails",
    org: "Udemy",
    domain: "Responsible AI • Risk • Governance",
    img: "Certs/Ai-ethics.png"
  },
  {
    id: "n8n",
    title: "N8N – Workflow & Automation Engineering",
    org: "Udemy",
    domain: "Automation • Orchestration • Integration",
    img: "Certs/N8n.png"
  },
  {
    id: "aws-sec",
    title: "AWS Security Specialty (Prep)",
    org: "AWS / Udemy",
    domain: "Cloud Security • IAM • Governance",
    img: "Certs/Aws-security.png"
  },
  {
    id: "aws-devops",
    title: "AWS DevOps Engineer (DOP-C02 Prep)",
    org: "AWS / Udemy",
    domain: "DevOps • CI/CD • Cloud Automation",
    img: "Certs/Dop-c02.png"
  },
  {
    id: "aws-ml",
    title: "AWS Certified Machine Learning (MLS-C01 Prep)",
    org: "AWS / Udemy",
    domain: "ML • Cloud Pipelines",
    img: "Certs/Mls-c01.png"
  },
  {
    id: "cka",
    title: "CKA — Kubernetes Administrator (Hands-On)",
    org: "Linux Foundation / Udemy",
    domain: "Kubernetes • Clusters • DevOps",
    img: "Certs/Cka.png"
  },
  {
    id: "data-science",
    title: "Data Science & AI Masters 2025",
    org: "Udemy",
    domain: "Python • ML • Data Pipelines",
    img: "Certs/Data-science-ai-masters.png"
  },
  {
    id: "technical-lead",
    title: "Technical Leadership for the AI Era",
    org: "Udemy",
    domain: "Leadership • Management • AI Strategy",
    img: "Certs/Technical-leadership.png"
  },
  {
    id: "ai-video",
    title: "AI Video & Content Automation",
    org: "Udemy",
    domain: "Video AI • Automation • Content Systems",
    img: "Certs/Ai-video.png"
  },
  {
    id: "medical-ai",
    title: "Medical AI — Clinical & Educational Use",
    org: "Udemy",
    domain: "Healthcare AI • Safety • Education",
    img: "Certs/Medical-ai.png"
  },
  {
    id: "ai-voice",
    title: "AI Voice Agent Engineering",
    org: "Udemy",
    domain: "Voice Bots • Call Automation",
    img: "Certs/Ai-voice-agent.png"
  },
  {
    id: "ai-business",
    title: "AI & Business Strategy",
    org: "Udemy",
    domain: "Business • Strategy • Automation",
    img: "Certs/Ai-business.png"
  },
  {
    id: "ai-coding",
    title: "AI Coding & Cursor Engineering",
    org: "Udemy",
    domain: "Cursor • AI Coding • Dev Workflows",
    img: "Certs/Ai-coding-cursor.png"
  }
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
    tile.type = "button";
    tile.dataset.index = String(index);

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
  if (!cert || !lightboxEl || !lightboxImgEl || !lightboxMetaEl) return;

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
  if (!lightboxEl || !lightboxImgEl) return;
  lightboxEl.classList.remove("fd-lightbox-open");
  lightboxImgEl.src = "";
}

if (lightboxCloseEl) {
  lightboxCloseEl.addEventListener("click", closeLightbox);
}

if (lightboxEl) {
  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// 5) Init
document.addEventListener("DOMContentLoaded", () => {
  renderWall();
});

// ===== CERT NARRATION TEXT (GLOBAL) =====
const certNarration = `
Andrew Davis holds over thirty five professional certifications including

Certified Chief AI Officer.
Certified AI Implementation Professional.
AWS Security Specialty.
AWS DevOps Engineer Professional.
AWS Certified Machine Learning.
Certified Kubernetes Administrator.
Data Science and AI Masters.
AI Ethics and Responsible AI.
AI Strategy and Executive Leadership.
N8N Workflow and Automation Engineering.
AI Voice and Video Automation.
Medical and Business AI Systems.

This portfolio represents hands on capability across governance, cloud security, automation, and ethical AI deployment.
`.trim();

// ===== INTRO VOICE FUNCTION =====
window.__playIntro = function () {
  if (!("speechSynthesis" in window)) return;

  const aboutText = document.querySelector(".fd-about");
  if (!aboutText) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(
    aboutText.innerText.trim()
  );
  utterance.rate = 1;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);
};

// ===== CERT VOICE FUNCTION =====
window.__playCerts = function () {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(certNarration);
  utterance.rate = 1;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);
};
