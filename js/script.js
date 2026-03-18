/* ═══════════════════════════════════════════════════════
   Portfolio — D.Lawrence Tony Manikya Raj
   Contact form powered by Web3Forms
   ✅ No backend needed — works directly from the browser
   ✅ No Node.js, no Express, no Render, no server
   ✅ Just get a free key at web3forms.com
═══════════════════════════════════════════════════════ */

/* ─── CURSOR ────────────────────────────────── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .skill-card, .project-card, .interest-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
    ring.style.opacity   = '1';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity   = '0.6';
  });
});

/* ─── NAVBAR SCROLL ─────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

/* ─── HAMBURGER ─────────────────────────────── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

/* ─── SCROLL REVEAL ─────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── SKILL BARS ────────────────────────────── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

/* ─── CONTACT FORM — Web3Forms ───────────────────────────────────
   HOW TO ACTIVATE (30 seconds, completely free):
   1. Go to https://web3forms.com
   2. Enter your email: lawrencetony1508@gmail.com
   3. Click "Create Access Key"
   4. Check your inbox — copy the key they send you
   5. In index.html find this line:
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
      Replace YOUR_WEB3FORMS_KEY with your real key
   6. Save index.html — done! No server needed.
─────────────────────────────────────────────────────────────── */
async function sendMessage(e) {
  e.preventDefault();

  const btn    = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');
  const form   = document.getElementById('contactForm');

  /* Basic client-side validation */
  const name    = document.getElementById('from_name').value.trim();
  const email   = document.getElementById('from_email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    status.textContent    = '✗ Please fill in all fields.';
    status.style.display  = 'block';
    status.style.border   = '1px solid #8b2424';
    status.style.color    = '#e07070';
    return;
  }

  /* Update button */
  btn.textContent  = 'Sending...';
  btn.disabled     = true;
  status.style.display = 'none';

  try {
    /* Web3Forms API — no backend, direct from browser */
    const formData = new FormData(form);
    const response = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    formData,
    });

    const result = await response.json();

    if (result.success) {
      /* ✅ Success */
      status.textContent   = '✓ Message sent! I\'ll get back to you within 24 hours.';
      status.style.display = 'block';
      status.style.border  = '1px solid #8a6a1e';
      status.style.color   = '#c9a84c';
      form.reset();
    } else {
      /* Web3Forms returned an error */
      throw new Error(result.message || 'Submission failed.');
    }

  } catch (err) {
    /* ✗ Error */
    status.textContent   = '✗ ' + (err.message === 'Failed to fetch'
      ? 'Network error. Please check your connection and try again.'
      : (err.message || 'Something went wrong. Please try again.'));
    status.style.display = 'block';
    status.style.border  = '1px solid #8b2424';
    status.style.color   = '#e07070';
  } finally {
    btn.textContent  = 'Send Message →';
    btn.disabled     = false;
  }
}

/* ─── ACTIVE NAV HIGHLIGHT ──────────────────── */
const sections = document.querySelectorAll('section');
const navAs    = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--gold)' : '';
  });
});
