/**
 * AnesthTR · Sidebar compartido
 * Detecta el archivo activo, abre la especialidad correcta y marca el link activo.
 */
(function () {

  const NAV = [
    {
      key: 'anestesia',
      icon: '💉',
      color: '#38bdf8',
      bg: 'rgba(56,189,248,0.12)',
      label: 'Anestesiología',
      topics: [
        { num:'01', label:'Bloqueos Regionales',          file:'bloqueos-regionales.html',       ready:true },
        { num:'02', label:'DAS 2025 · Vía Aérea Difícil', file:'das-anestesia.html',             ready:true },
        { num:'03', label:'Escala AIR — Apendicitis',     file:'escala-air-apendicitis.html',    ready:true },
      ]
    }
  ];

  // ── Build HTML ──────────────────────────────────────────────────────────
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  let html = `
    <div class="sidebar-logo">
      <div class="logo-badge">💉 AnesthTR</div>
      <h2>Simuladores · Anestesiología</h2>
      <p>MediCode Solutions</p>
    </div>
    <nav class="sidebar-nav">`;

  const current = location.pathname.split('/').pop() || 'index.html';

  NAV.forEach(spec => {
    const isOpen = spec.topics.some(t => t.file === current);
    html += `
      <div class="specialty-group">
        <div class="specialty-header ${isOpen ? 'open' : ''}" onclick="toggleSpec(this)">
          <div class="specialty-name">
            <div class="specialty-icon" style="background:${spec.bg};color:${spec.color};">${spec.icon}</div>
            ${spec.label}
          </div>
          <span class="chevron">▶</span>
        </div>
        <div class="topics-list ${isOpen ? 'open' : ''}">`;

    spec.topics.forEach(t => {
      const active = t.file === current ? ' active' : '';
      html += `
          <a href="${t.file}" class="topic-link${active}">
            <span class="topic-num">${t.num}</span>${t.label}
            <span class="badge-ready">Listo</span>
          </a>`;
    });

    html += `
        </div>
      </div>`;
  });

  html += `</nav>`;
  sidebar.innerHTML = html;

  // ── Toggle logic ────────────────────────────────────────────────────────
  window.toggleSpec = function (header) {
    header.classList.toggle('open');
    const list = header.nextElementSibling;
    list.classList.toggle('open');
  };

  window.toggleSidebar = function () {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
  };

})();
