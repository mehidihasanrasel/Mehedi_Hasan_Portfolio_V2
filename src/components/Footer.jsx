// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Footer.jsx — Page Footer
//
//  Features:
//   • Logo + tagline
//   • Quick navigation links — সব section-এ smooth scroll
//   • Social media icons
//   • Copyright text + current year (auto-update)
//   • "Back to top" button — hover করলে glow করে
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Quick nav links — Navbar-এর মতো ──
const FOOTER_LINKS = [
  'Home', 'About', 'Skills', 'Services', 'Portfolio', 'Testimonials', 'Contact'
]

// ── Social links ──
const SOCIAL_LINKS = [
  { icon: 'fab fa-github',    href: 'https://github.com/mehidihasanrasel', label: 'GitHub'   },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/mehidi-hasan-961797271/', label: 'LinkedIn' },
  { icon: 'fab fa-whatsapp',  href: 'https://wa.me/8801540725111',         label: 'WhatsApp' },
  { icon: 'fas fa-briefcase', href: 'https://www.fiverr.com/mdrasel912',   label: 'Fiverr'   },
  // ✏️ UPWORK: নিচের line-এর comment সরিয়ে তোমার Upwork link বসাও
  // { icon: 'fas fa-laptop-code', href: 'https://www.upwork.com/freelancers/তোমার-profile', label: 'Upwork' },
]

export default function Footer() {
  // ── current year — copyright-এ auto-update হবে ──
  const year = new Date().getFullYear()

  // ── Smooth scroll to section ──
  const scrollTo = (section) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer-main">

      {/* ════════════════════════════════════════════
          Top Area — Logo + Links + Social
      ════════════════════════════════════════════ */}
      <div className="footer-top">

        {/* ── Logo + tagline ── */}
        <div className="footer-brand">
          <a
            href="#home"
            className="logo"
            onClick={(e) => { e.preventDefault(); scrollTo('home') }}
          >
            MH<span>Rasel</span>
          </a>
          <p className="footer-tagline">
            Excel &amp; Data Specialist · Navana Pharmaceuticals PLC ·
            Transforming data into powerful spreadsheet solutions.
          </p>

          {/* Social icons */}
          <div className="footer-social">
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

        {/* ── Quick Navigation Links ── */}
        <div className="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            {FOOTER_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link) }}
                >
                  <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem', marginRight: '6px' }} />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Services column ── */}
        <div className="footer-nav">
          <h4>Services</h4>
          <ul>
            {['Excel Dashboard', 'Data Analysis', 'Power Query', 'VBA Automation', 'HR Systems', 'Financial Reports'].map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); scrollTo('services') }}
                >
                  <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem', marginRight: '6px' }} />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ════════════════════════════════════════════
          Bottom Bar — Copyright + Back to Top
      ════════════════════════════════════════════ */}
      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; {year} <span>Mehidi Hasan Rasel</span>. All Rights Reserved.
          {/* নিজের নাম দিয়ে পরিবর্তন করো */}
        </p>

        <p className="footer-made">
          Excel &amp; Data Specialist · Dhaka, Bangladesh 🇧🇩
        </p>

        {/* ── Back to Top Button ── */}
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          title="Back to top"
        >
          <i className="fas fa-angle-up" />
        </button>
      </div>

    </footer>
  )
}
