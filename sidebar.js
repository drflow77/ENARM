/**
 * ENARM · Sidebar compartido
 * Detecta el archivo activo, abre la especialidad correcta y marca el link activo.
 * Incluir con: <script src="sidebar.js"></script>
 * El aside#sidebar debe existir vacío en el HTML.
 */
(function () {

  // ── Datos de navegación ──────────────────────────────────────────────────
  const NAV = [
    {
      key: 'cirugia',
      icon: '🔪',
      color: '#38bdf8',
      bg: 'rgba(56,189,248,0.12)',
      label: 'Cirugía General',
      topics: [
        { num:'01', label:'Abdomen agudo / Apendicitis',  file:'01-apendicitis.html',             ready:true },
        { num:'02', label:'Patología biliar',             file:'02-patologia-biliar.html',         ready:true },
        { num:'03', label:'Enfermedad diverticular',      file:'03-enfermedad-diverticular.html',  ready:true },
        { num:'04', label:'ERGE / Esofagitis',            file:'04-erge-esofagitis-dispepsia.html',ready:true },
        { num:'05', label:'Cáncer esófago / gástrico',    file:'05-cancer-esofago-gastrico.html',  ready:true },
        { num:'06', label:'Gastritis / Úlcera péptica',   file:'06-gastritis-ulcera-peptica.html', ready:true },
        { num:'07', label:'Obesidad / Bariátrica',        file:'07-obesidad-bariatrica.html',      ready:true },
        { num:'08', label:'Patología perianal',           file:'08-patologia-perianal.html',       ready:true },
        { num:'09', label:'Hernias / Esplenectomía',      file:'09-hernias-esplenectomia.html',    ready:true },
        { num:'10', label:'Insuf. venosa y arterial',     file:'10-insuficiencia-venosa-arterial.html', ready:true },
        { num:'11', label:'Oclusión / Vólvulos',          file:'11-oclusion-volvulos-isquemia.html',ready:true },
        { num:'12', label:'Cáncer de colon',              file:'12-cancer-colon.html',             ready:true },
        { num:'13', label:'Cáncer hepático',              file:'13-cancer-hepatico.html',          ready:true },
        { num:'14', label:'Cáncer páncreas',              file:'14-cancer-pancreas-trasplante.html',ready:true },
        { num:'15', label:'Pancreatitis',                 file:'15-pancreatitis.html',             ready:true },
        { num:'16', label:'Mordeduras / Picaduras',       file:'16-mordeduras-picaduras.html',     ready:true },
        { num:'17', label:'Quemaduras',                   file:'17-quemaduras.html',               ready:true },
        { num:'18', label:'ATLS 1',                       file:'18-atls1.html',                    ready:true },
        { num:'19', label:'ATLS 2',                       file:'19-atls2.html',                    ready:true },
        { num:'20', label:'Patología quirúrgica',         file:'20-patologia-quirurgica.html',     ready:true },
      ]
    },
    {
      key: 'orl',
      icon: '👂',
      color: '#a78bfa',
      bg: 'rgba(167,139,250,0.12)',
      label: 'Otorrinolaringología',
      topics: [
        { num:'21', label:'Vértigo',                      file:'21-vertigo.html',                         ready:true },
        { num:'22', label:'Hipoacusias / Parálisis facial',file:'22-hipoacusias-paralisis-facial.html',   ready:true },
        { num:'23', label:'Rinología',                    file:'23-rinologia.html',                       ready:true },
        { num:'24', label:'Patología de faringe',         file:'24-patologia-faringe.html',               ready:true },
        { num:'25', label:'Patología de laringe',         file:'25-patologia-laringe.html',               ready:true },
        { num:'26', label:'Otología',                     file:'26-otologia.html',                        ready:true },
        { num:'27', label:'Síndrome apnea obstructiva',   file:'27-sindrome-apnea-obstructiva.html',      ready:true },
      ]
    },
    {
      key: 'oftalmo',
      icon: '👁️',
      color: '#34d399',
      bg: 'rgba(52,211,153,0.12)',
      label: 'Oftalmología',
      topics: [
        { num:'28', label:'Glaucoma',                     file:'28-glaucoma.html',                        ready:true },
        { num:'29', label:'Retinopatía diabética',        file:'29-retinopatia-diabetica.html',           ready:true },
        { num:'30', label:'Urgencias oftalmológicas',     file:'30-urgencias-oftalmologicas.html',        ready:true },
      ]
    },
    {
      key: 'neurocirugia',
      icon: '🧠',
      color: '#f472b6',
      bg: 'rgba(244,114,182,0.12)',
      label: 'Neurocirugía',
      topics: [
        { num:'36', label:'Neuralgia / HIC / Hidrocefalia', file:'36-neurocirugia.html', ready:true },
        { num:'37', label:'Abscesos y Tumores Cerebrales', file:'37-abscesos-tumores-cerebrales.html', ready:true },
      ]
    },
    {
      key: 'uro',
      icon: '🫘',
      color: '#fbbf24',
      bg: 'rgba(251,191,36,0.12)',
      label: 'Urología',
      topics: [
        { num:'31', label:'Infecciones urinarias',             file:'31-infecciones-urinarias.html',           ready:true },
        { num:'32', label:'Litiasis renal',                    file:'32-litiasis-renal.html',                  ready:true },
        { num:'33', label:'Cáncer próstata / vejiga',          file:'33-cancer-prostata-vejiga.html',          ready:true },
        { num:'34', label:'Hiperplasia prostática',            file:'34-hiperplasia-prostatica.html',          ready:true },
        { num:'35', label:'Disfunción eréctil / Infertilidad', file:'35-disfuncion-erectil-infertilidad.html', ready:false },
      ]
    },
    // ── Próximas especialidades ─────────────────────────────────────────
    {
      key: 'interna',
      icon: '🫀',
      color: '#8896b3',
      bg: 'rgba(136,150,179,0.08)',
      label: 'Medicina Interna',
      topics: [
        { num:'—', label:'Medicina Interna', file:null, ready:false }
      ]
    },
    {
      key: 'gineco',
      icon: '🤰',
      color: '#8896b3',
      bg: 'rgba(136,150,179,0.08)',
      label: 'Ginecología y Obstetricia',
      topics: [
        { num:'—', label:'Ginecología y Obstetricia', file:null, ready:false }
      ]
    },
    {
      key: 'pediatria',
      icon: '👶',
      color: '#8896b3',
      bg: 'rgba(136,150,179,0.08)',
      label: 'Pediatría',
      topics: [
        { num:'—', label:'Pediatría', file:null, ready:false }
      ]
    },
    {
      key: 'anestesia',
      icon: '💉',
      color: '#8896b3',
      bg: 'rgba(136,150,179,0.08)',
      label: 'Anestesiología',
      topics: [
        { num:'—', label:'Anestesiología', file:null, ready:false }
      ]
    },
  ];

  // ── Detectar página actual ───────────────────────────────────────────────
  function currentFile() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function findActiveSpec(file) {
    for (const spec of NAV) {
      if (spec.topics.some(t => t.file === file)) return spec.key;
    }
    return null;
  }

  // ── Construir HTML ───────────────────────────────────────────────────────
  function buildSidebar(file) {
    const activeSpec = findActiveSpec(file);

    let html = `
      <div class="sidebar-logo">
        <div class="logo-badge">🩺 MCS</div>
        <h2>ENARM · Banco de Preguntas</h2>
        <p>2025–2026</p>
      </div>
      <a href="index.html" class="back-btn">← Volver al inicio</a>
      <nav class="sidebar-nav">`;

    for (const spec of NAV) {
      const isOpen = spec.key === activeSpec;
      const allSoon = spec.topics.every(t => !t.file);

      html += `
        <div class="specialty-group">
          <div class="specialty-header${isOpen ? ' open' : ''}" onclick="toggleSpec(this)">
            <div class="specialty-name">
              <div class="specialty-icon" style="background:${spec.bg};color:${spec.color};">${spec.icon}</div>
              ${spec.label}
            </div>
            <span class="chevron">▶</span>
          </div>
          <div class="topics-list${isOpen ? ' open' : ''}">`;

      for (const t of spec.topics) {
        const isActive = t.file === file;
        if (!t.file || !t.ready) {
          html += `<span class="topic-link coming-soon"><span class="topic-num">${t.num}</span>${t.label}<span class="badge-soon">Pronto</span></span>`;
        } else {
          const activeClass = isActive ? ' active' : '';
          const badge = t.ready ? `<span class="badge-ready">Listo</span>` : `<span class="badge-soon">Pronto</span>`;
          html += `<a href="${t.file}" class="topic-link${activeClass}"><span class="topic-num">${t.num}</span>${t.label}${badge}</a>`;
        }
      }

      html += `</div></div>`;
    }

    html += `</nav>`;
    return html;
  }

  // ── Inyectar ─────────────────────────────────────────────────────────────
  function init() {
    const aside = document.getElementById('sidebar');
    if (!aside) return;
    aside.innerHTML = buildSidebar(currentFile());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
