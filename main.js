/* ═══════════════════════════════════════════════════════════
   NS:// CYBERSECURITY PORTFOLIO — JAVASCRIPT
   main.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── STATE ───────────────────────────────────────────────── */
let currentMode    = 'red';
let typingTimer    = null;
let cmdSelectedIdx = 0;
let network        = null;   // vis.Network instance
let nodeMap        = {};     // projId → project object

/* ── DATA ────────────────────────────────────────────────── */
const skillsData = {
  red: [
    { icon:'fa-solid fa-globe',             name:'Web Exploitation',      desc:'XSS, SQLi, SSRF, Information Disclosure, Command Injection, LFI, WAF Detection — finding the cracks in web applications.',          level:72  },
    { icon:'fa-solid fa-bug',               name:'Bug Bounty Methodology',desc:'Systematic reconnaissance to responsible disclosure on major platforms.',               level:70 },
    { icon:'fa-solid fa-microchip',         name:'Reverse Engineering',   desc:'Binary analysis, malware dissection, firmware patching with Ghidra/IDA.',               level:10 },
    { icon:'fa-solid fa-eye',               name:'OSINT',                 desc:'Passive reconnaissance: infrastructure mapping, data correlation, doxxing defenses.',   level:70 },
    { icon:'fa-solid fa-flag',              name:'CTF Solving',           desc:'Pwn, web, crypto, forensics — consistent top-tier performance.',                        level:70 }
  ],
  blue: [
    { icon:'fa-solid fa-network-wired',     name:'Network Security & Monitoring', desc:'Cisco Nexus/ASA/Firepower — deep packet inspection, zone-based policies.',      level:95 },
    { icon:'fa-solid fa-chart-line',        name:'SIEM & Log Analysis',          desc:'Splunk, Elastic SIEM — correlation rules, custom dashboards, threat hunting.',   level:88 },
    { icon:'fa-solid fa-fire-extinguisher', name:'Incident Response',            desc:'NIST IR lifecycle — containment, eradication, recovery, lessons learned.',        level:85 },
    { icon:'fa-solid fa-radar',             name:'Threat Detection',             desc:'IDS/IPS tuning, anomaly detection, YARA/Sigma rules, behavioral analytics.',      level:90 },
    { icon:'fa-solid fa-lock',              name:'System Hardening',             desc:'CIS benchmarks, STIG compliance, zero-trust architecture implementation.',        level:92 }
  ]
};

const projectsData = {
  red: [
    {
      name: 'Attack Systems',
      children: [
        {
          name:   'Web Attack Surface Analyzer',
          desc:   'Automates recon, payload injection, and vulnerability chaining across the full attack surface.',
          impact: 'Reduced manual recon time by 70% with the help of deploying AI agents performing scanning for me and generates critical reports for manual code review and scanning',
          tools:  ['Python', 'Burp Suite', 'FFUF'],
          skills: ['OSINT', 'SQLi', 'XSS', 'SSRF', 'Command Injection', 'LFI', 'RFI']
        },
        {
          name:   'SSRF Exploitation Engine',
          desc:   'Finds internal services and extracts cloud metadata via server-side request forgery vectors.',
          impact: 'Simulates real-world cloud breaches',
          tools:  ['Python3', 'Nmap', 'nuclei', 'Metasploit', 'Masscan/Rustscan', 'Vulnrability Scanning'],
          skills: ['Recon', 'SSRF', 'XSS']
        },
        {
          name:   'XSS Exploitation Engine',
          desc:   'Finds unsitized user inputs and perform unexpected inputes for triggering front-end vulnrability - XSS .',
          impact: 'Simulates real-world cloud breaches',
          tools:  ['Python3', 'Nmap', 'nuclei', 'Metasploit', 'Masscan/Rustscan', 'Vulnrability Scanning'],
          skills: ['Recon', 'DOM-Based XSS', 'Reflected XSS', 'stored XSS']
        },
        {
          name:   'LFI Exploitation Engine',
          desc:   'Finds unsitized content loaders in the web APP  for reading internal critical contents vulnrability - LFI .',
          impact: 'Simulates real-world cloud breaches',
          tools:  ['Python3', 'Nmap', 'nuclei', 'Metasploit', 'Masscan/Rustscan', 'Vulnrability Scanning'],
          skills: ['Recon', 'LFI' ]
        },
        {
          name:   'Credential Harvest Framework',
          desc:   'Simulates phishing and credential stuffing campaigns in controlled red team environments.',
          impact: 'Used in 12+ red team engagements',
          tools:  ['GoPhish', 'Python', 'SMTP'],
          skills: ['Social Eng.', 'Phishing', 'OSINT']
        }
      ]
    },
  
  ],
  blue: [
    {
      name: 'Defense Systems',
      children: [
        {
          name:   'Log Intelligence Engine',
          desc:   'Correlates logs across systems to detect anomalies using statistical deviation scoring.',
          impact: 'Detects threats in <2 seconds',
          tools:  ['Python', 'Splunk', 'Qradar', 'Snort'],
          skills: ['SIEM', 'SOC Level 1 - 2']
        },
        {
          name:   'Network Segmentation AI',
          desc:   'Analyzes topology and suggests isolation policies to limit blast radius of breaches.',
          impact: 'Improves lateral movement resistance',
          tools:  ['Python', 'NetFlow', 'GNS3', 'Eve-ng'],
          skills: ['Zero Trust', 'SDN', 'Policy']
        },
        {
          name:   'DLP Detection Engine',
          desc:   'Content-based comparison technique that detects data leakage via malicious routers using Rabin fingerprinting and entropy analysis.',
          impact: 'Detects slow exfiltration missed by IDS',
          tools:  ['Python', 'Wireshark', 'GNS3', 'Eve-ng'],
          skills: ['DLP', 'Forensics', 'Fingerprint']
        }
      ]
    },
    {
      name: 'Monitoring & Response',
      children: [
        {
          name:   'Threat Intel Aggregator',
          desc:   'Pulls IOCs from MISP, OTX, and VirusTotal, correlates them against live SIEM data.',
          impact: 'Reduces analyst triage time by 60%',
          tools:  ['Python', 'Elastic', 'wazuh','soar'],
          skills: ['Automation', 'IR']
        },

      ]
    }
  ]
};

const techStack = [
  { icon:'fa-brands fa-python',         name:'Python',                  cat:'lang'   },
  { icon:'fa-brands fa-js',             name:'JavaScript/html/css',              cat:'lang'   },
  { icon:'fa-solid fa-code',            name:'Bash / PowerShell',       cat:'lang'   },
  { icon:'fa-solid fa-shield-halved',   name:'Cisco NX-OS/Huawei/Aruba/VyOS',       cat:'net'    },
    { icon:'fa-solid fa-shield-halved',             name:'Snort',              cat:'lang'   },
  { icon:'fa-solid fa-shield-virus',    name:'Splunk / Elastic SIEM',   cat:'sec'    },
  { icon:'fa-solid fa-bug',             name:'Burp Suite / caido',      cat:'sec'    },
  { icon:'fa-solid fa-skull-crossbones',name:'Metasploit ',cat:'sec'  },
  { icon:'fa-solid fa-magnifying-glass',name:'Nmap / Wireshark',        cat:'sec'    },
  { icon:'fa-brands fa-docker',         name:'Docker ',     cat:'devops' },
  { icon:'fa-brands fa-linux',          name:'Windows / Kali',            cat:'os'     },
  { icon:'fa-solid fa-terminal',        name:'Ansible ',     cat:'devops' },

];

const taglines    = { red:'Breaking systems to understand them.', blue:'Defending systems to secure them.' };
const modeLabels  = { red:'RED TEAM', blue:'BLUE TEAM' };
const treeDescs   = { red:'Attack surface mapped. Hover nodes to inspect.', blue:'Defense architecture. Hover nodes to inspect.' };
const termModes   = { red:'RED_TEAM :: ENGAGED', blue:'BLUE_TEAM :: STANDBY' };
const footerModes = { red:'RED MODE ACTIVE', blue:'BLUE MODE ACTIVE' };
const bgAlerts    = {
  red:  ['BREACH DETECTED','FIREWALL BYPASSED','LATERAL MOVEMENT','CREDENTIAL HARVEST','PRIVILEGE ESCALATION','PERSISTENCE ACHIEVED'],
  blue: ['THREAT NEUTRALIZED','SYSTEM SECURE','ANOMALY BLOCKED','PERIMETER INTACT','PATCH DEPLOYED','INCIDENT CONTAINED']
};

const commands = [
  { name:'Switch to Red Mode',  icon:'fa-solid fa-skull',        action:()=>{ if(currentMode!=='red')  toggleMode(); closeCmdPalette(); }},
  { name:'Switch to Blue Mode', icon:'fa-solid fa-shield-halved',action:()=>{ if(currentMode!=='blue') toggleMode(); closeCmdPalette(); }},
  { name:'Open Projects',       icon:'fa-solid fa-folder-open',  action:()=>{ document.getElementById('projects').scrollIntoView({behavior:'smooth'}); closeCmdPalette(); }},
  { name:'Open Skills',         icon:'fa-solid fa-brain',        action:()=>{ document.getElementById('skills').scrollIntoView({behavior:'smooth'}); closeCmdPalette(); }},
  { name:'Open About',          icon:'fa-solid fa-user',         action:()=>{ document.getElementById('about').scrollIntoView({behavior:'smooth'}); closeCmdPalette(); }},
  { name:'Open Tech Stack',     icon:'fa-solid fa-gears',        action:()=>{ document.getElementById('tech').scrollIntoView({behavior:'smooth'}); closeCmdPalette(); }},
  { name:'Toggle Terminal',     icon:'fa-solid fa-terminal',     action:()=>{ toggleTerminal(); closeCmdPalette(); }},
  { name:'Go to Top', icon:'fa-solid fa-arrow-up', action:()=>{ window.scrollTo({top:0,behavior:'smooth'}); closeCmdPalette(); }},
  { name:'Contact Me', icon:'fa-solid fa-envelope', action:()=>{ document.getElementById('contact').scrollIntoView({behavior:'smooth'}); closeCmdPalette(); }}

];

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

  // 🔥 CRITICAL: re-render everything tied to mode
  updateParticleColors();
  renderSkills();
  renderGraph();
  typeTagline(taglines[currentMode]); 
}
// Avatar lighting fix (also actually call it)
 function enhanceAvatarLighting() {
  const avatar = document.querySelector(".avatar-glow");
  if (!avatar) return;

  avatar.style.filter = `
    drop-shadow(0 -10px 25px var(--accent-glow))
    drop-shadow(0 5px 10px rgba(0,0,0,0.6))
  `;
}
/* ── TYPING EFFECT ───────────────────────────────────────── */
function typeTagline(text) {
  const el = document.getElementById('hero-tagline');
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

/* ── SKILLS RENDER ───────────────────────────────────────── */
function renderSkills() {
  const grid   = document.getElementById('skills-grid');
  const skills = skillsData[currentMode];
  grid.innerHTML = skills.map((s, i) => `
    <div class="skill-card" style="transition-delay:${i*80}ms">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:var(--accent-dim)">
          <i class="${s.icon}" style="color:var(--accent);font-size:.9rem"></i>
        </div>
        <h3 class="text-sm font-semibold" style="color:var(--text)">${s.name}</h3>
      </div>
      <p class="text-xs leading-relaxed mb-4" style="color:var(--text2)">${s.desc}</p>
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[.6rem] uppercase tracking-wider" style="color:var(--text2)">Proficiency</span>
        <span class="text-[.65rem] font-bold" style="color:var(--accent)">${s.level}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-width="${s.level}"></div>
      </div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    setTimeout(() => {
      grid.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }, 200);
  });
}

/* ── GRAPH ENGINE (vis-network) ──────────────────────────── */
function renderGraph() {
  const container = document.getElementById('project-tree');
  container.innerHTML = '';
  nodeMap = {};

  const nodesArr = [];
  const edgesArr = [];
  let id = 1;

  const accent = currentMode === 'red' ? '#ff0040' : '#0088ff';
  const dim    = currentMode === 'red' ? 'rgba(255,0,64,.15)' : 'rgba(0,136,255,.15)';
  const dark   = '#0a0a0a';

  // Root node
  const rootId = id++;
  nodesArr.push({
    id: rootId,
    label: 'SYSTEM CORE',
    shape: 'dot',
    size: 28,
    font:  { color:'#ffffff', size:13, face:'Orbitron', bold:true },
    color: { background: accent, border: accent, highlight:{ background: accent, border:'#fff' } }
  });

  projectsData[currentMode].forEach(cat => {
    const catId = id++;
    nodesArr.push({
      id: catId,
      label: cat.name,
      shape: 'dot',
      size: 18,
      font:  { color: accent, size:12, face:'JetBrains Mono' },
      color: { background: dark, border: accent, highlight:{ background: dim, border: accent } }
    });
    edgesArr.push({ from: rootId, to: catId, width:2, color:{ color: accent, opacity:.6 } });

    cat.children.forEach(proj => {
      const projId = id++;
      nodesArr.push({
        id: projId,
        label: proj.name,
        shape: 'dot',
        size: 12,
        font:  { color:'#aaaaaa', size:10, face:'JetBrains Mono' },
        color: {
          background: dark,
          border: accent,
          opacity:.7,
          highlight:{ background: dim, border: accent }
        }
      });
      edgesArr.push({ from: catId, to: projId, width:1, color:{ color: accent, opacity:.35 }, dashes: true });
      nodeMap[projId] = proj;
    });
  });

  const data = {
    nodes: new vis.DataSet(nodesArr),
    edges: new vis.DataSet(edgesArr)
  };

  const options = {
    physics: {
      enabled: true,
      solver: 'forceAtlas2Based',
      forceAtlas2Based: { gravitationalConstant:-50, centralGravity:.008, springLength:140, springConstant:.04 },
      stabilization: { iterations: 80 }
    },
    interaction: { hover:true, tooltipDelay:0, navigationButtons:false, keyboard:false },
    edges: { smooth:{ type:'curvedCW', roundness:.2 } },
    nodes: { borderWidth:1.5 },
    background: { color:'transparent' }
  };

  if (network) network.destroy();
  network = new vis.Network(container, data, options);

  // Hover: show card
  network.on('hoverNode', params => {
    const proj = nodeMap[params.node];
    if (proj) showProjectCard(proj, params.event.center);
  });
  network.on('blurNode', () => hideProjectCard());

  // Click: also show card (mobile-friendly)
  network.on('click', params => {
    if (params.nodes.length > 0) {
      const proj = nodeMap[params.nodes[0]];
      if (proj) showProjectCard(proj, params.event.center || { x: window.innerWidth/2, y: window.innerHeight/2 });
    } else {
      hideProjectCard();
    }
  });
}

/* ── PROJECT CARD ────────────────────────────────────────── */
function showProjectCard(project, pos) {
  const card = document.getElementById('project-card');
  card.style.display = 'block';

  // Keep card inside viewport
  const cw = 280;
  let x = pos.x + 20;
  let y = pos.y + 20;
  if (x + cw > window.innerWidth)  x = pos.x - cw - 20;
  if (y + 200 > window.innerHeight) y = pos.y - 200;

  card.style.left = x + 'px';
  card.style.top  = y + 'px';

  const toolsHtml  = (project.tools  || []).map(t => `<span class="tag">${t}</span>`).join('');
  const skillsHtml = (project.skills || []).map(s => `<span class="tag">${s}</span>`).join('');

  card.innerHTML = `
    <strong style="color:var(--accent)">${project.name}</strong>
    <p class="card-desc">${project.desc}</p>
    <div class="card-impact">&#128165; ${project.impact}</div>
    ${toolsHtml  ? `<div style="margin-top:8px"><span style="font-size:10px;color:var(--text2);display:block;margin-bottom:4px">TOOLS</span>${toolsHtml}</div>`  : ''}
    ${skillsHtml ? `<div style="margin-top:6px"><span style="font-size:10px;color:var(--text2);display:block;margin-bottom:4px">SKILLS</span>${skillsHtml}</div>` : ''}
  `;
}

function hideProjectCard() {
  document.getElementById('project-card').style.display = 'none';
}
/*------------------------------------- ecucation------------------------- */
const certifications = [
  {
    name: "CCNA",
    issuer: "Cisco",
    desc: "Cisco Certified Network Associate — networking fundamentals, routing, switching, security.",
    file: "assets/certs/ccna.pdf" // 🔥 path to your PDF
  },
  {
    name: "Another Cert",
    issuer: "Platform",
    desc: "Description here...",
    file: "assets/certs/other.pdf"
  }
];
function renderCertifications() {
  const grid = document.getElementById('cert-grid');

  grid.innerHTML = certifications.map((cert, i) => `
    <div class="cert-card"
         onmouseenter="showCertPreview(${i}, event)"
         onmouseleave="hideCertPreview()">

      <h3>${cert.name}</h3>
      <p>${cert.desc}</p>
      <span class="issuer">${cert.issuer}</span>

    </div>
  `).join('');
};
/* ── CERTIFICATION PREVIEW ───────────────────────────────── */
function showCertPreview(index, event) {
  const cert = certifications[index];
  const card = document.getElementById('cert-preview');

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

function hideCertPreview() {
  document.getElementById('cert-preview').style.display = 'none';
}
/* ── TECH STACK RENDER ───────────────────────────────────── */
function renderTechStack() {
  const grid = document.getElementById('tech-grid');
  grid.innerHTML = techStack.map(t => `
    <div class="tech-item">
      <i class="${t.icon}"></i>
      <span>${t.name}</span>
    </div>
  `).join('');
}

/* ── COMMAND PALETTE ─────────────────────────────────────── */
function openCmdPalette() {
  const el = document.getElementById('cmd-palette');
  el.classList.add('open');
  const input = document.getElementById('cmd-input');
  input.value = '';
  input.focus();
  cmdSelectedIdx = 0;
  renderCmdList('');
}
function closeCmdPalette() {
  document.getElementById('cmd-palette').classList.remove('open');
}
function renderCmdList(filter) {
  const list     = document.getElementById('cmd-list');
  const filtered = commands.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
  cmdSelectedIdx = Math.max(0, Math.min(cmdSelectedIdx, filtered.length - 1));
  list.innerHTML = filtered.map((c, i) => `
    <div class="cmd-item ${i===cmdSelectedIdx?'selected':''}"
         onclick="commands[${commands.indexOf(c)}].action()"
         onmouseenter="cmdSelectedIdx=${i};renderCmdList('${filter.replace(/'/g,"\\'")}')">
      <i class="${c.icon}"></i>
      <span>${c.name}</span>
    </div>
  `).join('');
}

/* ── TERMINAL WIDGET ─────────────────────────────────────── */
function toggleTerminal() {
  const el      = document.getElementById('terminal');
  const chevron = document.getElementById('term-chevron');
  el.classList.toggle('minimized');
  chevron.style.transform = el.classList.contains('minimized') ? 'rotate(0)' : 'rotate(180deg)';
  if (!el.classList.contains('minimized')) document.getElementById('term-input').focus();
  
}

const termCommands = {
  help:    () => 'Available: help, whoami, mode, switch, scan, attack, defend, skills, clear, exit',
  whoami:  () => 'network_security_engineer [RED/BLUE TEAM]',
  mode:    () => `Current mode: ${currentMode.toUpperCase()}_TEAM`,
  switch:  () => { toggleMode(); return `Switched to ${currentMode.toUpperCase()}_TEAM`; },
  scan:    () => { renderGraph(); return 'Scanning systems... graph re-rendered.'; },
  attack:  () => { if (currentMode !== 'red')  toggleMode(); return 'Red team engaged.'; },
  defend:  () => { if (currentMode !== 'blue') toggleMode(); return 'Blue team engaged.'; },
  skills:  () => skillsData[currentMode].map(s => `  ${s.name} [${s.level}%]`).join('\n'),
  clear:   () => '__CLEAR__',
  exit:    () => { toggleTerminal(); return 'Terminal minimized.'; },contact: () => { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  return 'Opening contact section...';
},
  
};

/* ── MOBILE MENU ─────────────────────────────────────────── */
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold:0.1, rootMargin:'0px 0px -50px 0px' });

/* ── PARTICLE BACKGROUND ─────────────────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let particles    = [];
let particleColor = [255, 0, 64];

function updateParticleColors() {
  particleColor = currentMode === 'red' ? [255, 0, 64] : [0, 136, 255];
}
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
function initParticles() {
  particles = [];
  const count = Math.min(60, Math.floor(window.innerWidth / 25));
  for (let i = 0; i < count; i++) {
    particles.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    });
  }
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const [r, g, b] = particleColor;
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const p2   = particles[j];
      const dx   = p.x - p2.x, dy = p.y - p2.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.06*(1-dist/120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

/* ── BACKGROUND ALERTS ───────────────────────────────────── */
function spawnBgAlert() {
  const alerts = bgAlerts[currentMode];
  const text   = alerts[Math.floor(Math.random() * alerts.length)];
  const el     = document.createElement('div');
  el.className = 'bg-alert';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

/* ── ACTIVE NAV ──────────────────────────────────────────── */
function updateActiveNav() {
  const sections  = ['hero','skills','projects','about','tech'];
  const scrollPos = window.scrollY + 100;
  let active = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollPos) active = id;
  });
  document.querySelectorAll('nav .nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + active);
  });
}

/* ── EVENT BINDINGS ──────────────────────────────────────── */
function bindEvents() {
  // --- Contact Form Logic ---
  const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const status = document.getElementById('contact-status');

    status.className = "contact-status";
    status.textContent = "Transmitting...";

    emailjs.send("service_nm7kw5h","template_gm9t8qj", {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      message: document.getElementById('message').value
    })
    .then(() => {
      status.classList.add("success");
      status.textContent = "[ OK ] SECURE CHANNEL ESTABLISHED";
      this.reset();
    })
    .catch(() => {
      status.classList.add("error");
      status.textContent = "[ ERROR ] PACKET LOSS DETECTED";
    });

  }); 
}

  // --- Keep your existing event listeners below ---
  document.getElementById('cmd-input').addEventListener('input', e => {
    cmdSelectedIdx = 0;
    renderCmdList(e.target.value);
  });

  // Terminal input
  document.getElementById('term-input').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const input = e.target.value.trim().toLowerCase();
    e.target.value = '';
    const body = document.getElementById('term-body');
    body.innerHTML += `<div><span class="prompt">ns@kali</span>:<span style="color:#5555ff">~</span>$ ${input}</div>`;
    if (!input) return;
    const handler = termCommands[input];
    if (handler) {
      const result = handler();
      if (result === '__CLEAR__') body.innerHTML = '';
      else body.innerHTML += `<div><span class="output">${result.replace(/\n/g,'<br>')}</span></div>`;
    } else {
      body.innerHTML += `<div><span style="color:var(--danger)">Command not found: ${input}</span></div>`;
    }
    body.scrollTop = body.scrollHeight;
  });

  // Cursor glow
  document.addEventListener('mousemove', e => {
    const glow = document.getElementById('cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmdPalette(); }
    if (e.key === 'Escape') closeCmdPalette();
  });

  // Scroll
  window.addEventListener('scroll', updateActiveNav);

  // Resize
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
}

/* ── INIT ────────────────────────────────────────────────── */
function init() {
  resizeCanvas();
  initParticles();
  drawParticles();
  renderSkills();
  renderGraph();
  renderTechStack();
  
  // Ensure you replace this with your actual EmailJS Public Key
  emailjs.init("Pb7k6IguYw7JGM-ls"); 
  
  typeTagline(taglines[currentMode]);

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  setInterval(spawnBgAlert, 8000);
  setTimeout(spawnBgAlert, 3000);

  // Correct function call
  bindEvents(); 

  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);
