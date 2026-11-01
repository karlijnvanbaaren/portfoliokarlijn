/**
 * Karlijn Portfolio — Interactive Scripts
 * Handles: SPA Hash Routing, Nav Underlines, Universal Lightbox, Copy Email & Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initNavHover();
  initCopyEmail();
  initContactForm();
  initLightbox();
});

/**
 * Single-Page Hash Router
 * Switches between views (#home, #projects, #project-1, #project-2, #about, #contact)
 */
function initRouter() {
  const routes = {
    '': 'viewHome',
    '#': 'viewHome',
    '#home': 'viewHome',
    '#projects': 'viewProjects',
    '#project-1': 'viewProject1',
    '#project-2': 'viewProject2',
    '#about': 'viewAbout',
    '#contact': 'viewContact',
  };

  const navMap = {
    viewHome: 'navHome',
    viewProjects: 'navProjects',
    viewProject1: 'navProjects',
    viewProject2: 'navProjects',
    viewAbout: 'navAbout',
    viewContact: 'navContact',
  };

  function handleRoute() {
    const hash = window.location.hash.toLowerCase();
    const targetViewId = routes[hash] || 'viewHome';

    // Hide all views, show targeted view
    const allViews = document.querySelectorAll('.page-view');
    allViews.forEach((view) => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(targetViewId);
    if (activeView) {
      activeView.classList.add('active');
    }

    // Pause video if leaving project-2
    if (targetViewId !== 'viewProject2') {
      const video = document.getElementById('casemovieVideo');
      if (video && !video.paused) {
        video.pause();
      }
    }

    // Update active nav underline
    const activeNavId = navMap[targetViewId];
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item) => {
      const isTarget = item.id === activeNavId;
      const svgPath = item.querySelector('.draw-path');
      if (isTarget) {
        item.classList.add('active');
        if (svgPath) svgPath.style.strokeDashoffset = '0';
      } else {
        item.classList.remove('active');
        if (svgPath) svgPath.style.strokeDashoffset = '140';
      }
    });

    // Smooth scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

/**
 * Navigation Hover Effects for Organic SVG Draw Underlines
 */
function initNavHover() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    const link = item.querySelector('.nav-link');
    if (!link) return;

    link.addEventListener('mouseenter', () => {
      const svgPath = item.querySelector('.draw-path');
      if (svgPath) svgPath.style.strokeDashoffset = '0';
    });

    link.addEventListener('mouseleave', () => {
      if (!item.classList.contains('active')) {
        const svgPath = item.querySelector('.draw-path');
        if (svgPath) svgPath.style.strokeDashoffset = '140';
      }
    });
  });
}

/**
 * 1-Click Copy Email Feature with Clipboard API & Instant Feedback
 */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.btn-copy-email');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'karlijn.van.baaren@outlook.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalContent = btn.innerHTML;
        btn.classList.add('bg-wb-black', 'text-white');
        btn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-400 inline-block mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Gekopieerd!</span>
        `;

        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('bg-wb-black', 'text-white');
        }, 2400);
      } catch (err) {
        console.error('Kopiëren mislukt: ', err);
      }
    });
  });
}

/**
 * Contact Form Simulation with Live Validation & Confirmation Feedback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusContainer = document.getElementById('formStatusContainer');

  if (!form || !statusContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      showFormAlert('Vul alsjeblieft alle verplichte velden in.');
      return;
    }

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="w-4 h-4 animate-spin inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Verzenden...
      `;
    }

    setTimeout(() => {
      form.style.display = 'none';
      statusContainer.innerHTML = `
        <div class="bg-wb-blue-light border-[1.5px] border-wb-black p-6 sm:p-8 text-center animate-fade-in">
          <svg class="w-12 h-12 text-wb-blue-dark mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h4 class="text-xl font-bold mb-2 font-serif">Bedankt voor je bericht, ${escapeHTML(name)}!</h4>
          <p class="text-sm text-wb-gray-text leading-relaxed font-sans mb-6">
            Je bericht is succesvol verzonden. Ik neem zo spoedig mogelijk contact met je op via <em>${escapeHTML(email)}</em>.
          </p>
          <button type="button" id="resetContactFormBtn" class="btn-primary">
            Nog een bericht sturen
          </button>
        </div>
      `;
      statusContainer.style.display = 'block';

      const resetBtn = document.getElementById('resetContactFormBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          form.reset();
          form.style.display = 'block';
          statusContainer.style.display = 'none';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
              <svg class="w-4 h-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Verstuur Bericht
            `;
          }
        });
      }
    }, 700);
  });
}

function showFormAlert(message) {
  let alertBox = document.getElementById('formAlertBox');
  if (!alertBox) {
    alertBox = document.createElement('div');
    alertBox.id = 'formAlertBox';
    alertBox.className = 'bg-red-50 border border-red-500 text-red-700 p-3.5 flex items-center gap-2.5 text-sm font-sans mb-4 animate-fade-in';
    const form = document.getElementById('contactForm');
    form.insertBefore(alertBox, form.firstChild);
  }
  alertBox.innerHTML = `
    <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <span>${escapeHTML(message)}</span>
  `;
}

/**
 * Universal Lightbox Gallery
 */
let lightboxItems = [];
let currentLightboxIndex = 0;

function initLightbox() {
  const triggers = document.querySelectorAll('[data-lightbox]');
  if (!triggers.length) return;

  // Build items list dynamically based on the current context/gallery group
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const group = trigger.getAttribute('data-lightbox');
      const groupTriggers = Array.from(document.querySelectorAll(`[data-lightbox="${group}"]`));

      lightboxItems = groupTriggers.map((el) => ({
        src: el.getAttribute('data-lightbox-src') || el.getAttribute('href') || el.src,
        caption: el.getAttribute('data-lightbox-title') || el.getAttribute('alt') || '',
      }));

      const clickedIndex = groupTriggers.indexOf(trigger);
      openLightbox(clickedIndex >= 0 ? clickedIndex : 0);
    });
  });

  // Create modal container if not present
  if (!document.getElementById('lightboxModal')) {
    const modal = document.createElement('div');
    modal.id = 'lightboxModal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-btn lightbox-close" id="lightboxClose" aria-label="Sluiten">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <button class="lightbox-btn lightbox-prev" id="lightboxPrev" aria-label="Vorige foto">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="lightbox-image-container">
          <img src="" alt="" id="lightboxImg" class="lightbox-image">
        </div>

        <button class="lightbox-btn lightbox-next" id="lightboxNext" aria-label="Volgende foto">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div class="lightbox-caption" id="lightboxCaption"></div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev')?.addEventListener('click', prevLightbox);
    document.getElementById('lightboxNext')?.addEventListener('click', nextLightbox);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      const modalEl = document.getElementById('lightboxModal');
      if (!modalEl || !modalEl.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    });
  }
}

function openLightbox(index) {
  if (index < 0 || index >= lightboxItems.length) return;
  currentLightboxIndex = index;
  updateLightboxContent();
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function updateLightboxContent() {
  const item = lightboxItems[currentLightboxIndex];
  if (!item) return;

  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  if (img) {
    img.src = item.src;
    img.alt = item.caption;
  }
  if (caption) {
    caption.textContent = `${item.caption} (${currentLightboxIndex + 1} / ${lightboxItems.length})`;
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  updateLightboxContent();
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
  updateLightboxContent();
}

/**
 * HTML Sanitizer
 */
function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
