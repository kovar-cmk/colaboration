'use strict';

/* ── STATE ───────────────────────────────────────────────── */
let currentMode    = 'red';
let typingTimer    = null;
let cmdSelectedIdx = 0;
let network        = null;
let nodeMap        = {};

/* ── DATA ────────────────────────────────────────────────── */
const skillsData = { /* KEEP YOUR ORIGINAL DATA (unchanged) */ };
const projectsData = { /* KEEP YOUR ORIGINAL DATA (unchanged) */ };
const techStack = [ /* KEEP YOUR ORIGINAL DATA (unchanged) */ ];

const taglines    = { red:'Breaking systems to understand them.', blue:'Defending systems to secure them.' };
const modeLabels  = { red:'RED TEAM', blue:'BLUE TEAM' };
const treeDescs   = { red:'Attack surface mapped. Hover nodes to inspect.', blue:'Defense architecture. Hover nodes to inspect.' };
const termModes   = { red:'RED_TEAM :: ENGAGED', blue:'BLUE_TEAM :: STANDBY' };
const footerModes = { red:'RED MODE ACTIVE', blue:'BLUE MODE ACTIVE' };

/* ── CERTIFICATIONS DATA ─────────────────────────────────── */
const certifications = [
  {
    name: "CCNA",
    issuer: "Cisco",
    desc: "Cisco Certified Network Associate — networking fundamentals, routing, switching, security.",
    file: "assets/certs/ccna.pdf"
  },
  {
    name: "Another Cert",
    issuer: "Platform",
    desc: "Description here...",
    file: "assets/certs/other.pdf"
  }
];

/* ── CERT RENDER ─────────────────────────────────────────── */
function renderCertifications() {
  const grid = document.getElementById('cert-grid');
  if (!grid) return;

  grid.innerHTML = certifications.map((cert, i) => `
    <div class="skill-card"
         onmouseenter="showCertPreview(${i}, event)"
         onmouseleave="hideCertPreview()">

      <h3 style="color:var(--text)">${cert.name}</h3>
      <p style="color:var(--text2)">${cert.desc}</p>
      <span class="issuer">${cert.issuer}</span>

    </div>
  `).join('');
}

/* ── CERT PREVIEW (FIXED) ───────────────────────────────── */
function showCertPreview(index, event) {
  const cert = certifications[index];
  const card = document.getElementById('cert-preview');

  if (!card) return;

  card.style.display = 'block';

  let x = event.clientX + 20;
  let y = event.clientY + 20;

  if (x + 400 > window.innerWidth) x -= 420;
  if (y + 300 > window.innerHeight) y -= 320;

  card.style.left = x + 'px';
  card.style.top  = y + 'px';

  card.innerHTML = `
    <strong style="color:var(--accent)">${cert.name}</strong>
    <p>${cert.issuer}</p>
    <div style="border:1px solid var(--accent); border-radius:8px; overflow:hidden;">
      <embed src="${cert.file}" type="application/pdf" width="100%" height="220">
    </div>
  `;
} // ✅ FIXED (was missing)

function hideCertPreview() {
  const el = document.getElementById('cert-preview');
  if (el) el.style.display = 'none';
}

/* ── MODE TOGGLE ─────────────────────────────────────────── */
function toggleMode() {
  const flash = document.getElementById('mode-flash');
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 200);

  currentMode = currentMode === 'red' ? 'blue' : 'red';
  document.documentElement.setAttribute('data-mode', currentMode);

  document.getElementById('mode-badge').textContent        = modeLabels[currentMode];
  document.getElementById('tree-desc').textContent         = treeDescs[currentMode];
  document.getElementById('term-mode-output').textContent  = termModes[currentMode];
  document.getElementById('footer-mode').textContent       = footerModes[currentMode];

  renderSkills();
  renderGraph();
  typeTagline(taglines[currentMode]); 
}

/* ── TYPING EFFECT ───────────────────────────────────────── */
function typeTagline(text) {
  const el = document.getElementById('hero-tagline');
  if (!el) return;

  if (typingTimer) clearTimeout(typingTimer);
  el.textContent = '';

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      typingTimer = setTimeout(type, 50);
    }
  }
  type();
}

/* ── SKILLS ─────────────────────────────────────────────── */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = '';
}

/* ── GRAPH (SAFE) ───────────────────────────────────────── */
function renderGraph() {
  const container = document.getElementById('project-tree');
  if (!container) return;
}

/* ── TECH STACK ─────────────────────────────────────────── */
function renderTechStack() {
  const grid = document.getElementById('tech-grid');
  if (!grid) return;
}

/* ── EVENTS ─────────────────────────────────────────────── */
function bindEvents() {
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
    }
  });
}

/* ── INIT ───────────────────────────────────────────────── */
function init() {
  renderSkills();
  renderGraph();
  renderTechStack();

  renderCertifications(); // ✅ IMPORTANT FIX

  typeTagline(taglines[currentMode]);
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
