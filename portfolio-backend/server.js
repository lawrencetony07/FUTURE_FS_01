const express = require('express');
const cors    = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app    = express();
const resend = new Resend(process.env.RESEND_API_KEY);

/* ── Middleware ─────────────────────────────────────── */
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('../portfolio'));

/* ── POST /api/contact ──────────────────────────────── */
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  /* Validation */
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  /* ── Email 1: Notify YOU with the message ─────────── */
  const notifyYou = {
    from:    'Portfolio Contact <onboarding@resend.dev>',
    to:      [process.env.YOUR_EMAIL],
    replyTo: email,
    subject: `New Portfolio Message from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;padding:32px;border-radius:8px;">
        <h2 style="color:#c9a84c;margin-top:0;font-size:22px;letter-spacing:2px;">NEW MESSAGE</h2>
        <p style="color:#7a7060;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px;">From your portfolio contact form</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#7a7060;font-size:13px;width:80px;">Name</td>
            <td style="padding:10px 0;color:#e8e0d0;font-size:15px;font-weight:bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#7a7060;font-size:13px;">Email</td>
            <td style="padding:10px 0;font-size:15px;">
              <a href="mailto:${email}" style="color:#c9a84c;">${email}</a>
            </td>
          </tr>
        </table>
        <div style="margin-top:24px;padding:20px;background:#131313;border-left:3px solid #c9a84c;border-radius:4px;">
          <p style="color:#7a7060;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Message</p>
          <p style="color:#e8e0d0;font-size:15px;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="margin-top:20px;color:#7a7060;font-size:12px;">
          Hit <strong style="color:#c9a84c;">Reply</strong> in your email app to respond directly to ${name}.
        </p>
        <p style="margin-top:24px;color:#5c5040;font-size:11px;text-align:center;">
          Sent via D.Lawrence Tony Manikya Raj · AI &amp; ML Portfolio
        </p>
      </div>
    `,
  };

  /* ── Email 2: Auto-reply to the SENDER ───────────── */
  const autoReply = {
    from:    'D.Lawrence Tony <onboarding@resend.dev>',
    to:      [email],
    subject: `Got your message, ${name}! I'll be in touch soon.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;padding:32px;border-radius:8px;">
        <h2 style="color:#c9a84c;margin-top:0;font-size:22px;letter-spacing:2px;">Hey ${name}! 👋</h2>
        <p style="color:#e8e0d0;font-size:15px;line-height:1.7;">
          Thanks for reaching out through my portfolio. I've received your message
          and will get back to you as soon as possible — usually within 24 hours.
        </p>
        <div style="margin:24px 0;padding:20px;background:#131313;border-left:3px solid #c9a84c;border-radius:4px;">
          <p style="color:#7a7060;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Your message</p>
          <p style="color:#e8e0d0;font-size:14px;line-height:1.7;margin:0;font-style:italic;">
            "${message.replace(/\n/g, '<br>')}"
          </p>
        </div>
        <p style="color:#e8e0d0;font-size:15px;line-height:1.7;">
          In the meantime, feel free to connect with me on
          <a href="https://linkedin.com/in/dlawrencetonymanikyaraj" style="color:#c9a84c;">LinkedIn</a>
          or check out my work on
          <a href="https://github.com/dlawrencetonymanikyaraj" style="color:#c9a84c;">GitHub</a>.
        </p>
        <p style="color:#e8e0d0;font-size:15px;margin-top:28px;">
          Best regards,<br>
          <strong style="color:#c9a84c;">D.Lawrence Tony Manikya Raj</strong><br>
          <span style="color:#7a7060;font-size:13px;">CSE Student &nbsp;·&nbsp; AI &amp; ML Engineer &nbsp;·&nbsp; Data Analytics</span>
        </p>
        <p style="margin-top:24px;color:#5c5040;font-size:11px;text-align:center;">
          D.Lawrence Tony Manikya Raj | AI &amp; ML Portfolio
        </p>
      </div>
    `,
  };

  try {
    await Promise.all([
      resend.emails.send(notifyYou),
      resend.emails.send(autoReply),
    ]);
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Resend error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

/* ── Health check ───────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Resend', timestamp: new Date().toISOString() });
});

/* ── Start ──────────────────────────────────────────── */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅  Server running  →  http://localhost:${3000}`);
  console.log(`📧  Emails will go  →  ${process.env.YOUR_EMAIL}\n`);
});
