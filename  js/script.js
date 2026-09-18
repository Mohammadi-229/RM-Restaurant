/* ============================================================
   RM RESTAURANT — SITE SCRIPT
   You shouldn't need to edit this file. Edit config.js and
   menu.js instead.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  renderMenu();
  setupNav();
  setupReveal();
  setupGalleryFilters();
  setupReservationForm();
  setYear();
});

/* ---------- Push config.js values into the page ---------- */
function applyConfig() {
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const path = el.getAttribute('data-cfg').split('.');
    let val = CONFIG;
    path.forEach(k => { val = val ? val[k] : undefined; });
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-cfg-href]').forEach(el => {
    const key = el.getAttribute('data-cfg-href');
    if (key === 'tel') {
      el.href = 'tel:' + CONFIG.phone.replace(/\s+/g, '');
    } else if (key === 'whatsapp') {
      el.href = 'https://wa.me/' + CONFIG.whatsapp;
    } else if (key === 'instagram') {
      el.href = CONFIG.instagram;
      if (CONFIG.instagram === '#') el.setAttribute('aria-disabled', 'true');
    } else if (key === 'email') {
      el.href = CONFIG.email === '#' ? '#' : 'mailto:' + CONFIG.email;
    }
  });
}

/* ---------- Render menu from menu.js ---------- */
function renderMenu() {
  const wrap = document.getElementById('menuColumns');
  if (!wrap) return;

  Object.keys(MENU).forEach(category => {
    const col = document.createElement('div');
    col.className = 'menu-col';

    const title = document.createElement('h3');
    title.className = 'menu-col-title';
    title.textContent = category;
    col.appendChild(title);

    MENU[category].forEach(item => {
      const row = document.createElement('div');
      row.className = 'menu-item';

      const top = document.createElement('div');
      top.className = 'menu-item-top';

      const name = document.createElement('span');
      name.className = 'menu-item-name';
      name.textContent = item.name;
      top.appendChild(name);

      if (item.price) {
        const price = document.createElement('span');
        price.className = 'menu-item-price';
        price.textContent = item.price;
        top.appendChild(price);
      }

      row.appendChild(top);

      if (item.desc) {
        const desc = document.createElement('p');
        desc.className = 'menu-item-desc';
        desc.textContent = item.desc;
        row.appendChild(desc);
      }

      col.appendChild(row);
    });

    wrap.appendChild(col);
  });
}

/* ---------- Navigation: scroll state, mobile menu, active link ---------- */
function setupNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => {
    hamburger.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    overlay.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeMenu);
  links.forEach(a => a.addEventListener('click', closeMenu));

  // Active link on scroll
  const sections = Array.from(links)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => io.observe(sec));
}

/* ---------- Fade-in on scroll ---------- */
function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ---------- Gallery category filters ---------- */
function setupGalleryFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const show = filter === 'ALL' || item.getAttribute('data-category') === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });
}

/* ---------- Reservation form -> WhatsApp message ---------- */
function setupReservationForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    const message =
      `Hello ${CONFIG.restaurantName} Restaurant,\n\n` +
      `I would like to request a table.\n\n` +
      `Name: ${data.name || '-'}\n` +
      `Phone: ${data.phone || '-'}\n` +
      `Guests: ${data.guests || '-'}\n` +
      `Date: ${data.date || '-'}\n` +
      `Time: ${data.time || '-'}\n` +
      `Special Request: ${data.request || '-'}\n\n` +
      `Thank you.`;

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    showToast('Opening WhatsApp to send your request…');
    form.reset();
  });
}

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function setYear() {
  const el = document.getElementById('copyrightYear');
  if (el) el.textContent = CONFIG.establishedYear;
}
