// JavaScript educativo: interacción completa para las 10 mejoras
document.addEventListener('DOMContentLoaded', function(){
  const body = document.body;

  /* ---------- THEME (modo claro/oscuro) ---------- */
  const themeBtn = document.getElementById('themeBtn');
  const savedTheme = localStorage.getItem('animelab-theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
    themeBtn.textContent = '☀️';
    themeBtn.setAttribute('aria-pressed','true');
  } else {
    themeBtn.textContent = '🌙';
    themeBtn.setAttribute('aria-pressed','false');
  }
  themeBtn.addEventListener('click', function(){
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-pressed', String(isLight));
  });

  /* ---------- NAV mobile (hamburguesa -> X) ---------- */
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle.addEventListener('click', function(){
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
    // animar hamburguesa
    const ham = navToggle.querySelector('.hamburger');
    if (!expanded) {
      ham.style.transform = 'rotate(45deg)';
      ham.style.background = 'transparent';
      ham.style.boxShadow = 'none';
      ham.style.setProperty('--after-transform','rotate(-90deg)');
      ham.style.position = 'relative';
      ham.style.background = 'var(--accent-text)';
      ham.style.transform = 'rotate(45deg)';
      ham.style.transition = 'transform .25s';
      ham.style.marginTop = '6px';
      ham.style.opacity = '1';
      ham.style.setProperty('--before-top','0');
    } else {
      ham.style.transform = '';
      ham.style.background = '';
      ham.style.marginTop = '';
    }
  });

  // cerrar el menú al hacer click en un enlace
  document.querySelectorAll('.nav-link').forEach(function(link){
    link.addEventListener('click', function(){
      if (navList.classList.contains('show')) {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  });

  /* ---------- LIGHTBOX funcional ---------- */
  window.openLightbox = function(src){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
  };
  window.closeLightbox = function(e){
    // cerrar si se hace click fuera o en botón
    if (!e || e.target.id === 'lightbox' || (e.target && e.target.classList && e.target.classList.contains('lightbox-close')) ){
      document.getElementById('lightbox').style.display = 'none';
      document.getElementById('lightbox').setAttribute('aria-hidden','true');
      document.getElementById('lightboxImg').src = '';
    }
  };

  /* ---------- PERFIL de personajes con modal (incluye nuevo personaje) ---------- */
  const profiles = {
    'Shaka De Virgo': {
      title: 'Shaka De Virgo',
      desc: 'Considerado “el más cercano a un dios”. Reencarnación espiritual muy avanzada, adepto de la meditación y los caminos budistas..',
      extra: 'Personalidad: Sereno, introspectivo, poderoso y enigmático.'
    },
    'Shura De Capriconio': {
      title: 'Shura De Capricornio',
      desc: 'El “caballero más leal”. Considera el deber como sagrado. más tarde se redime tras ayudar a Shiryu.',
      extra: 'Personalidad : Disciplinado, rígido, honorable y leal'
    },
    'Mu De Aries': {
      title: 'Mu De Aries',
      desc: 'Discípulo de Shion, el antiguo Patriarca. Vive en Jamir, donde repara armaduras. Uno de los más sabios y calmados',
      extra: 'Personalidad: Pacífico, sereno, noble y respetuoso de la justicia.'
    },
    'Saga De Geminis': {
      title: 'Saga De Geminis',
      desc: 'Uno de los más poderosos caballeros de la historia. Su doble personalidad lo llevó a usurpar el mando del Santuario como Patriarca.',
      extra: 'Personalidad: Noble y benevolente en su lado bueno; cruel y ambicioso en su lado oscuro.'
    }
  };

  function openProfile(name){
    const modal = document.getElementById('profileModal');
    const content = document.getElementById('profileContent');
    const p = profiles[name] || {title:'No encontrado', desc:'Sin información', extra:''};
    content.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><p class="muted">${p.extra}</p>`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  }
  function closeProfile(){
    const modal = document.getElementById('profileModal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
    document.getElementById('profileContent').innerHTML = '';
  }
  // delegación de eventos para botones "Ver Perfil"
  document.querySelectorAll('[data-profile]').forEach(btn => {
    btn.addEventListener('click', function(){ openProfile(this.dataset.profile); });
  });
  document.getElementById('profileClose').addEventListener('click', closeProfile);
  document.getElementById('profileModal').addEventListener('click', function(e){
    if(e.target === this) closeProfile();
  });

  /* ---------- NEWS -> modal de "leer más" ---------- */
  const newsData = {
    news1: {
      title: 'Estrellas en Ascenso — Temporada 2',
      body: '<p>Se confirma la segunda temporada con nuevo reparto y mechas. Fecha estimada: 2026.</p>'
    },
    news2: {
      title: 'Festival anual de trajes  — Concurso de trajes',
      body: '<p>Participa con tu mejor distras. Inscripciones abiertas hasta el 20 de Noviembre.</p>'
    },
    news3: {
      title: 'Lanzamiento del juego "Shaka´s"',
      body: '<p>Demo técnica disponible en la página del proyecto. Los usuarios del curso pueden participar en pruebas.</p>'
    }
  };
  function openNews(id){
    const modal = document.getElementById('newsModal');
    const content = document.getElementById('newsContent');
    const n = newsData[id] || {title:'No info', body:''};
    content.innerHTML = `<h3>${n.title}</h3>${n.body}`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  }
  function closeNews(){ document.getElementById('newsModal').style.display='none'; document.getElementById('newsModal').setAttribute('aria-hidden','true'); document.getElementById('newsContent').innerHTML=''; }
  document.querySelectorAll('[data-news]').forEach(btn => btn.addEventListener('click', function(){ openNews(this.dataset.news); }));
  document.getElementById('newsClose').addEventListener('click', closeNews);
  document.getElementById('newsModal').addEventListener('click', function(e){ if (e.target === this) closeNews(); });

  /* ---------- FORM VALIDATION (visual) ---------- */
  const form = document.getElementById('contactForm');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');

  function showFieldState(field, ok, msg){
    const span = document.getElementById(field.id + 'Msg');
    if (ok) {
      field.classList.remove('input-error');
      field.classList.add('input-ok');
      span.textContent = msg || 'Correcto';
      span.style.color = '#34d399';
    } else {
      field.classList.remove('input-ok');
      field.classList.add('input-error');
      span.textContent = msg || 'Campo requerido';
      span.style.color = '#ff6b81';
    }
  }
  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    let ok = true;
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    if (!name) { showFieldState(nameField,false,'Ingresa tu nombre'); ok=false; } else showFieldState(nameField,true,'');
    if (!email || !validateEmail(email)) { showFieldState(emailField,false,'Correo no válido'); ok=false; } else showFieldState(emailField,true,'');
    if (!message || message.length < 6) { showFieldState(messageField,false,'Mensaje demasiado corto'); ok=false; } else showFieldState(messageField,true,'');

    if (!ok) return;
    // simulación de envío
    alert('¡Gracias, ' + name + '! Tu mensaje ha sido recibido (simulado).');
    form.reset();
    [nameField,emailField,messageField].forEach(f => { f.classList.remove('input-ok'); });
    document.querySelectorAll('.field-msg').forEach(s => s.textContent = '');
  });

  /* ---------- SHOW HINT (ejemplo DOM) ---------- */
  const showHintBtn = document.getElementById('showHint');
  showHintBtn.addEventListener('click', function(){
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Pista: Revisa css/style.css para encontrar variables y layout. Revisa js/main.js para ver eventos.';
    hint.style.marginTop = '12px';
    hint.style.padding = '8px';
    hint.style.borderRadius = '8px';
    hint.style.background = 'var(--glass)';
    document.querySelector('.hero').appendChild(hint);
    setTimeout(()=> hint.remove(), 6000);
  });

  /* ---------- ABOUT toggle ---------- */
  const aboutToggle = document.getElementById('aboutToggle');
  const aboutContent = document.getElementById('aboutContent');
  aboutToggle.addEventListener('click', function(){
    const shown = !aboutContent.hidden;
    aboutContent.hidden = shown;
    aboutToggle.textContent = shown ? 'Mostrar Créditos' : 'Ocultar Créditos';
  });

  /* ---------- FOOTER: año dinámico ---------- */
  const yearEl = document.getElementById('copyright');
  const year = new Date().getFullYear();
  yearEl.textContent = `© ${year} AnimeLab — Proyecto educativo`;

  /* ---------- AUDIO controls ---------- */
  const bgAudio = document.getElementById('bgAudio');
  const audioToggle = document.getElementById('audioToggle');
  const audioMute = document.getElementById('audioMute');
  const audioVol = document.getElementById('audioVol');
  bgAudio.volume = Number(audioVol.value) || 0.6;

  audioToggle.addEventListener('click', function(){
    if (bgAudio.paused) {
      bgAudio.play().catch(()=>{}); // evitar error si no hay archivo
      audioToggle.textContent = '⏸';
      audioToggle.setAttribute('aria-pressed','true');
    } else {
      bgAudio.pause();
      audioToggle.textContent = '🔊';
      audioToggle.setAttribute('aria-pressed','false');
    }
  });
  audioMute.addEventListener('click', function(){
    bgAudio.muted = !bgAudio.muted;
    audioMute.textContent = bgAudio.muted ? '🔇' : '🔈';
    audioMute.setAttribute('aria-pressed', String(bgAudio.muted));
  });
  audioVol.addEventListener('input', function(){
    bgAudio.volume = Number(this.value);
  });

  /* ---------- small accessibility: close modals with ESC ---------- */
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeLightbox({target:{id:'lightbox'}});
      closeProfile();
      closeNews();
    }
  });

  /* ---------- small enhancement: keyboard enter on cards opens profile ---------- */
  document.querySelectorAll('#characters .interactive-card').forEach(function(card){
    card.addEventListener('keydown', function(e){
      if (e.key === 'Enter') {
        openProfile('Aki');
      }
    });
  });

  // fin DOMContentLoaded
});
