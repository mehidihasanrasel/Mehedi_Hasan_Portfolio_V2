// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Contact.jsx — Contact Section
//
//  Features:
//   • Real-time form validation — field-এ blur হলে validate হয়
//   • Field error messages — কোন field ভুল সেটা দেখায়
//   • Loading state — submit করার সময় button-এ spinner
//   • Success / Error state — submit হলে বড় success message
//   • Character counter — textarea-য় কতটুকু লেখা হয়েছে
//   • Availability badge — "Available for work" status
//   • Info cards — email, phone, location
//   • Quick response promise — "24hr reply" badge
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from 'react'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA — এখানে নিজের তথ্য দাও
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CONTACT_INFO = [
  {
    icon:  'fas fa-envelope',
    label: 'Email',
    value: 'imrasel51@gmail.com',
    href:  'mailto:imrasel51@gmail.com',
  },
  {
    icon:  'fas fa-phone',
    label: 'Phone',
    value: '+880 1944-717795',
    href:  'tel:+8801944717795',
  },
  {
    icon:  'fab fa-whatsapp',
    label: 'WhatsApp',
    value: '+880 1540-725111',
    href:  'https://wa.me/8801540725111',
  },
  {
    icon:  'fas fa-map-marker-alt',
    label: 'Location',
    value: 'Dhaka, Bangladesh 🇧🇩',
    href:  'https://maps.google.com/?q=Dhaka,Bangladesh',
  },
]

// Social links — contact info-র নিচে দেখায়
const SOCIAL_LINKS = [
  { icon: 'fab fa-github',    href: 'https://github.com/mehidihasanrasel', label: 'GitHub'   },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/mehidi-hasan-961797271/', label: 'LinkedIn' },
  { icon: 'fab fa-whatsapp',  href: 'https://wa.me/8801540725111',         label: 'WhatsApp' },
  { icon: 'fas fa-briefcase', href: 'https://www.fiverr.com/mdrasel912',   label: 'Fiverr'   },
  // ✏️ UPWORK: নিচের line-এর comment সরিয়ে তোমার Upwork link বসাও
  // { icon: 'fas fa-laptop-code', href: 'https://www.upwork.com/freelancers/তোমার-profile', label: 'Upwork' },
]

// ── Form field validation rules ──
// প্রতিটি field-এর জন্য validate function
const VALIDATORS = {
  name:    (v) => v.trim().length < 2   ? 'Name must be at least 2 characters' : '',
  email:   (v) => !/\S+@\S+\.\S+/.test(v) ? 'Please enter a valid email address' : '',
  mobile:  (v) => v && !/^[\d\s+\-()]{7,}$/.test(v) ? 'Please enter a valid phone number' : '',
  subject: (v) => v.trim().length < 3   ? 'Subject must be at least 3 characters' : '',
  message: (v) => v.trim().length < 20  ? 'Message must be at least 20 characters' : '',
}

// ── Initial empty form state ──
const INITIAL_FORM = { name: '', email: '', mobile: '', subject: '', message: '' }

// ── Max message characters ──
const MAX_MSG_CHARS = 500

export default function Contact() {
  // ── Form field values ──
  const [form,    setForm]    = useState(INITIAL_FORM)

  // ── Validation errors — কোন field-এ কী error আছে ──
  const [errors,  setErrors]  = useState({})

  // ── Submit states ──
  // 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('idle')

  // ── field value পরিবর্তন হলে ──
  const handleChange = (e) => {
    const { name, value } = e.target

    // message field-এ max character limit enforce করা
    if (name === 'message' && value.length > MAX_MSG_CHARS) return

    setForm((f) => ({ ...f, [name]: value }))

    // typing করার সময় error clear করা (user friendly)
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  // ── field থেকে focus সরলে (blur) validate করা ──
  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = VALIDATORS[name]?.(value) || ''
    setErrors((e) => ({ ...e, [name]: error }))
  }

  // ── পুরো form validate করা (submit-এর সময়) ──
  // return: errors object (কোনো error না থাকলে সব empty string)
  const validateAll = () => {
    const newErrors = {}
    Object.keys(VALIDATORS).forEach((field) => {
      newErrors[field] = VALIDATORS[field](form[field]) || ''
    })
    setErrors(newErrors)
    // কোনো error আছে কিনা check করা
    return Object.values(newErrors).every((e) => !e)
  }

  // ── Form Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault()

    // সব field validate করো, error থাকলে submit করো না
    if (!validateAll()) return

    setStatus('loading') // button-এ spinner দেখাও

    // ──────────────────────────────────────────────
    // 🔧 Real email পাঠাতে এখানে API call করতে হবে।
    //
    // Option 1 — EmailJS (সহজ, free):
    //   import emailjs from '@emailjs/browser'
    //   await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
    //
    // Option 2 — Formspree:
    //   const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form)
    //   })
    //
    // এখন simulate করা হচ্ছে 1.5s delay দিয়ে
    // ──────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 1500))

    setStatus('success')
    setForm(INITIAL_FORM) // form reset

    // ৫ সেকেন্ড পরে আবার idle state-এ ফিরে আসে
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section className="contact-section" id="contact">

      {/* ── Section Title ── */}
      <h2 className="heading reveal">
        Get In <span>Touch</span>
      </h2>

      {/* ── Availability Badge ── */}
      <div className="availability-badge reveal">
        <span className="avail-dot" /> {/* blinking green dot */}
        Available for freelance work
      </div>

      <div className="contact-container">

        {/* ══════════════════════════════════════════════
            LEFT — Contact Form
        ══════════════════════════════════════════════ */}
        <div className="contact-form reveal">

          {/* ── Success State — form submit হলে দেখায় ── */}
          {status === 'success' ? (
            <div className="form-success">
              <i className="fas fa-check-circle" />
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
              <button
                className="btn"
                onClick={() => setStatus('idle')}
                style={{ marginTop: '1rem' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            // ── Normal Form ──
            <form onSubmit={handleSubmit} noValidate>

              {/* ── Row 1: Name + Email ── */}
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name ? 'input-error' : ''}
                    required
                  />
                  {/* error message — error থাকলে দেখায় */}
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email ? 'input-error' : ''}
                    required
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              {/* ── Row 2: Phone + Subject ── */}
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Phone Number (optional)"
                    value={form.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.mobile ? 'input-error' : ''}
                  />
                  {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.subject ? 'input-error' : ''}
                    required
                  />
                  {errors.subject && <span className="field-error">{errors.subject}</span>}
                </div>
              </div>

              {/* ── Message Textarea ── */}
              <div className="form-group">
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Your Message * (minimum 20 characters)"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.message ? 'input-error' : ''}
                  required
                />

                {/* Character counter — textarea-র নিচে ডান কোণে */}
                <div className="char-counter">
                  <span className={errors.message ? 'field-error' : ''}>
                    {errors.message || ' '}
                  </span>
                  {/* রং বদলায় — limit কাছে আসলে warning color */}
                  <span style={{
                    color: form.message.length > MAX_MSG_CHARS * 0.9
                      ? '#f87171'  /* 90% পার হলে লাল */
                      : 'var(--text-muted)',
                  }}>
                    {form.message.length}/{MAX_MSG_CHARS}
                  </span>
                </div>
              </div>

              {/* ── Submit Button ── */}
              <button
                type="submit"
                className="btn contact-submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  // Loading state — spinner + text
                  <>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" style={{ marginRight: '8px' }} />
                    Send Message
                  </>
                )}
              </button>

            </form>
          )}
        </div>

        {/* ══════════════════════════════════════════════
            RIGHT — Contact Info Cards + Social Links
        ══════════════════════════════════════════════ */}
        <div className="contact-info reveal">

          {/* Intro heading + text */}
          <h3>Let's Work Together</h3>
          <p>
            Have a project in mind or just want to say hello? I'd love to hear
            from you. Fill out the form or reach out directly — I typically
            respond within 24 hours.
          </p>

          {/* ── Info Cards — Email, Phone, Location, Hours ── */}
          <div className="info-cards">
            {CONTACT_INFO.map(({ icon, label, value, href }) => (
              <div key={label} className="info-card">
                {/* Icon circle */}
                <div className="info-icon">
                  <i className={icon} />
                </div>
                <div>
                  <span className="info-label">{label}</span>
                  {/* href থাকলে link, না থাকলে plain text */}
                  {href ? (
                    <a
                      href={href}
                      className="info-value"
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="info-value">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Social Media Links ── */}
          <div className="contact-socials">
            <p className="social-label">Find me on</p>
            <div className="social-media">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
