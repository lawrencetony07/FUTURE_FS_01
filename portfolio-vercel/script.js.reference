/* ─────────────────────────────────────────────────────
   Portfolio script — D.Lawrence Tony Manikya Raj
   Contact form posts to Node.js + Resend backend
───────────────────────────────────────────────────── */

/* ── BACKEND URL ────────────────────────────────────
   Local dev  → http://localhost:3000
   Deployed   → replace with your Render/Railway URL
   e.g.       → https://portfolio-backend.onrender.com
──────────────────────────────────────────────────── */
const BACKEND_URL = 'http://localhost:3000';

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
    ring.style.opacity = '1';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '0.6';
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
    if (e.isIntersecting) { e.target.classList.add('visible'); }
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

/* ─── CONTACT FORM ───────────────────────────── */
async function sendEmail(e) {
  e.preventDefault();

  const btn    = e.target.querySelector('button[type="submit"]');
  const status = document.getElementById('formStatus');

  const name    = document.getElementById('from_name').value.trim();
  const email   = document.getElementById('from_email').value.trim();
  const message = document.getElementById('message').value.trim();

  /* Client-side validation */
  if (!name || !email || !message) {
    status.textContent   = '✗ Please fill in all fields.';
    status.className     = 'form-status error';
    status.style.display = 'block';
    return;
  }

  /* Update button state */
  btn.textContent      = 'Sending...';
  btn.disabled         = true;
  status.style.display = 'none';
  status.className     = 'form-status';

  try {
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (result.success) {
      status.textContent   = '✓ Message sent! I\'ll get back to you within 24 hours.';
      status.className     = 'form-status success';
      status.style.display = 'block';
      e.target.reset();
    } else {
      throw new Error(result.error || 'Submission failed.');
    }

  } catch (err) {
    status.textContent   = '✗ ' + (err.message || 'Something went wrong. Please try again.');
    status.className     = 'form-status error';
    status.style.display = 'block';
  } finally {
    btn.textContent = 'Send Message →';
    btn.disabled    = false;
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
