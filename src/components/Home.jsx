// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Home.jsx — Hero Section (First screen)
//
//  নতুন features:
//   • Typing effect (useTyped hook থেকে)
//   • Scroll Reveal — নিচে scroll করলে elements fade-in হয়
//   • Particle dots background — subtle animated dots
//   • Shimmer glow effect ছবির পেছনে
//   • GitHub + LinkedIn + Resume buttons
//   • "Scroll Down" indicator arrow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef } from 'react'
import useTyped from '../hooks/useTyped'
import raselImg from '../assets/rasel.jpg'

// ── কোন কোন শব্দ type হবে — এখানে পরিবর্তন করো ──
const TYPED_WORDS = [
  'Excel Specialist',
  'Data Analyst',
  'Dashboard Designer',
  'Automation Expert',
]

// ── Social Media Links — এখানে নিজের link দাও ──
const SOCIAL_LINKS = [
  { icon: 'fab fa-github',    href: 'https://github.com/mehidihasanrasel', label: 'GitHub'   },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/mehidi-hasan-961797271/', label: 'LinkedIn' },
  { icon: 'fab fa-whatsapp',  href: 'https://wa.me/8801540725111',         label: 'WhatsApp' },
  { icon: 'fas fa-briefcase', href: 'https://www.fiverr.com/mdrasel912',   label: 'Fiverr'   },
  // ✏️ UPWORK: নিচের line-এর comment (#) সরিয়ে তোমার Upwork link বসাও
  // { icon: 'fas fa-laptop-code', href: 'https://www.upwork.com/freelancers/তোমার-profile', label: 'Upwork' },
]

export default function Home() {
  // ── Typing hook থেকে current typed text নেওয়া হচ্ছে ──
  const typed = useTyped(TYPED_WORDS, 100, 1800)

  // ── Scroll Reveal — ref দিয়ে DOM element ধরা হয় ──
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    // IntersectionObserver — element screen-এ আসলে .active class যোগ করে
    // এতে CSS এ opacity: 0 → 1, translateY(40px) → 0 হয়
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            // একবার দেখা গেলে আর observe করতে হবে না
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 } // element-এর ২০% দেখা গেলে trigger হবে
    )

    // left ও right side দুটো observe করা হচ্ছে
    if (leftRef.current)  observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)

    return () => observer.disconnect()
  }, [])

  // ── Smooth scroll to About section ──
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="home-section" id="home">

      {/* ──────────────────────────────────────────────
          LEFT SIDE — Text Content
          reveal class: initially opacity:0, translateY(40px)
          active হলে opacity:1, translateY(0) হয়
      ────────────────────────────────────────────── */}
      <div className="home-content reveal" ref={leftRef}>

        {/* Greeting */}
        <h3>Hello, It's Me</h3>

        {/* ── নিজের নাম এখানে পরিবর্তন করো ── */}
        <h1>Mehidi Hasan Rasel</h1>

        {/* Typed role text — useTyped hook থেকে আসে */}
        <h3>
          And I'm a{' '}
          <span className="typed-text">{typed}</span>
          {/* cursor — CSS animation দিয়ে blink হয় */}
          <span className="cursor" />
        </h3>

        {/* ── Bio paragraph — নিজের সম্পর্কে লিখো ── */}
        <p>
          Excel &amp; Google Sheets specialist with 8+ years of experience at Navana
          Pharmaceuticals PLC. I transform complex data into automated dashboards,
          reports, and spreadsheet solutions — saving businesses hours every week.
        </p>

        {/* ── Social Media Icons ── */}
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

        {/* ── CTA Buttons ── */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {/*
            CV download করতে:
            1. CV file → src/assets/john-cv.pdf এ রাখো
            2. href="/john-cv.pdf" করো অথবা import করে use করো
          */}
          <a href="https://canva.link/otv0lb7oudwvz2q" className="btn" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-download" style={{ marginRight: '8px' }} />
            Download CV
          </a>

          {/* Contact section-এ scroll করে যায় */}
          <a
            href="#contact"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <i className="fas fa-envelope" style={{ marginRight: '8px' }} />
            Hire Me
          </a>
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          RIGHT SIDE — Profile Photo
          reveal-right: right থেকে slide করে আসে
      ────────────────────────────────────────────── */}
      <div className="home-img reveal-right" ref={rightRef}>
        <div className="img-box">
          {/*
            ── নিজের ছবি যোগ করতে ──
            ১. ছবি src/assets/ ফোল্ডারে রাখো (যেমন: profile.jpg)
            ২. উপরে import করো: import profileImg from '../assets/profile.jpg'
            ৩. নিচের src={...} এ সেই variable দাও
          */}
          <img
            src={raselImg}
            alt="Mehidi Hasan Rasel — Excel &amp; Data Specialist"
            loading="eager"
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          Scroll Down Indicator
          নিচে bounce animation দিয়ে arrow দেখায়
          click করলে About section-এ যায়
      ────────────────────────────────────────────── */}
      <button
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        style={{
          position:        'absolute',
          bottom:          '2rem',
          left:            '50%',
          transform:       'translateX(-50%)',
          background:      'transparent',
          border:          'none',
          cursor:          'pointer',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          gap:             '4px',
          animation:       'bounce 2s infinite',   /* CSS animation নিচে define করা */
          color:           'var(--accent)',
          fontSize:        '0.75rem',
          fontWeight:      '600',
          letterSpacing:   '0.1em',
          textTransform:   'uppercase',
        }}
      >
        <span>Scroll</span>
        <i className="fas fa-chevron-down" style={{ fontSize: '1.2rem' }} />
      </button>

      {/* ── Bounce keyframe animation — এখন global index.css-এ define করা আছে ── */}
      {/* reveal-right: right থেকে slide করে আসে */}
      <style>{`
        .reveal-right {
          opacity:   0;
          transform: translateX(60px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-right.active {
          opacity:   1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  )
}
