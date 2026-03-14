# D.Lawrence Tony Manikya Raj — AI & ML Portfolio

A personal portfolio website built with HTML, CSS, and JavaScript.
Showcasing skills in Artificial Intelligence, Machine Learning, and Data Analytics.

## File Structure

```
portfolio/
├── index.html          ← Main HTML file (open this in browser)
├── css/
│   └── style.css       ← All styles, variables, animations, responsive
├── js/
│   └── script.js       ← Cursor, navbar, scroll reveal, skill bars, contact form
├── images/
│   ├── projects/       ← Add project screenshots here (project1.jpg, etc.)
│   └── icons/          ← Add favicon and custom icons here
└── README.md           ← This file
```

## How to Run

Just open `index.html` in any browser — no build tools needed.

## How to Deploy (GitHub Pages)

1. Create a new GitHub repository named `portfolio`
2. Upload all files keeping the same folder structure
3. Go to Settings → Pages → Source: main branch → Save
4. Your site will be live at `https://yourusername.github.io/portfolio`

## EmailJS Setup (Contact Form)

1. Sign up free at https://www.emailjs.com
2. Create an Email Service (Gmail works great)
3. Create a Template with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Open `js/script.js` and replace:
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
   - `YOUR_PUBLIC_KEY`
5. Uncomment `emailjs.init("YOUR_PUBLIC_KEY")` at the top of `script.js`

## Customization Guide

| What to change          | File to edit         |
|-------------------------|----------------------|
| Name, bio, text content | `index.html`         |
| Colors, fonts, layout   | `css/style.css`      |
| Animations, interactions| `js/script.js`       |
| Project images          | `images/projects/`   |
| Favicon / logo icon     | `images/icons/`      |

## Technologies Used

- HTML5 — semantic structure & SEO meta tags
- CSS3 — custom properties, animations, responsive grid
- JavaScript (Vanilla) — IntersectionObserver, cursor, EmailJS
- Google Fonts — Cormorant Garamond + Rajdhani
- EmailJS — contact form (no backend needed)
