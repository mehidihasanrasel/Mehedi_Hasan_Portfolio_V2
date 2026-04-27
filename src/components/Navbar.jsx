// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Navbar.jsx — Fixed Header with:
//   • Scroll Progress Bar (page এর top-এ পাতলা line)
//   • Dark / Light Mode Toggle (☀️ / 🌙 button)
//   • Active Section Auto-detect (scroll করলে nav link highlight)
//   • Sticky shadow (scroll করলে header-এ shadow আসে)
//   • Mobile Hamburger Menu
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect } from 'react'

// ── Navigation links ──
// এই array-তে সব nav link এর নাম আছে।
// নতুন section যোগ করলে এখানে add করো।
const NAV_LINKS = ['Home', 'About', 'Skills', 'Services', 'Portfolio', 'Testimonials', 'Contact']

export default function Navbar() {
  // ── State Variables ──
  const [menuOpen,  setMenuOpen]  = useState(false)   // mobile menu open/close
  const [active,    setActive]    = useState('Home')   // কোন nav link active (highlight)
  const [sticky,    setSticky]    = useState(false)    // scroll করলে header sticky হয়
  const [scrollPct, setScrollPct] = useState(0)        // scroll progress bar এর % (0–100)
  const [darkMode,  setDarkMode]  = useState(true)     // true = dark, false = light

  // ── Scroll Progress + Sticky Header ──
  // window scroll করলে এই effect চলে।
  // scrollY / (total scrollable height) × 100 = progress percentage
  useEffect(() => {
    const handleScroll = () => {
      // ১. Sticky header — 100px scroll করলে shadow দেখাবে
      setSticky(window.scrollY > 100)

      // ২. Progress bar calculation
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollPct(progress)
    }

    // passive: true দিলে scroll performance ভালো হয়
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Active Section Auto-detect ──
  // IntersectionObserver দিয়ে দেখে কোন section টা screen-এ আছে,
  // সেই section-এর নাম nav-এ active করে।
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.toLowerCase())

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // section id এর first letter uppercase করে active state set করি
            const name = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1)
            setActive(name)
          }
        })
      },
      { threshold: 0.4 } // section এর ৪০% দেখা গেলে active হবে
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // ── Outside Click + Escape Key — mobile menu বন্ধ করে ──
  useEffect(() => {
    if (!menuOpen) return // menu বন্ধ থাকলে listener দরকার নেই

    const handleClickOutside = (e) => {
      // header-এর বাইরে click করলে menu বন্ধ হবে
      if (!e.target.closest('header')) {
        setMenuOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside) // mobile touch support
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  // ── Dark / Light Mode Toggle ──
  // html element-এ data-theme="light" বা "dark" set করে।
  // index.css এ [data-theme="light"] দিয়ে color পাল্টানো হয়।
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // ── Smooth Scroll to Section ──
  const scrollTo = (sectionName) => {
    const el = document.getElementById(sectionName.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(sectionName)
    setMenuOpen(false) // mobile menu বন্ধ করে
  }

  return (
    <>
      {/* ── Scroll Progress Bar ──
          page এর একদম উপরে, fixed।
          scrollPct অনুযায়ী width বাড়ে (0% থেকে 100%)। */}
      <div
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          height:     '3px',
          width:      `${scrollPct}%`,
          background: 'linear-gradient(to right, #00eeff, #0077ff)',
          zIndex:     9999,
          transition: 'width 0.1s linear',
          boxShadow:  '0 0 8px #00eeff',
        }}
      />

      {/* ── Main Header ──
          sticky class যোগ হলে shadow দেখায়। */}
      <header className={`header${sticky ? ' sticky shadow-lg' : ''}`}>

        {/* ── Logo — click করলে Home-এ smooth scroll ── */}
        <a
          href="#home"
          className="logo"
          onClick={(e) => { e.preventDefault(); scrollTo('Home') }}
        >
          MH<span>Rasel</span>
        </a>

        {/* ── Nav Links ──
            active link-এ 'active' class যায় → cyan color হয়। */}
        <nav className={`navbar${menuOpen ? ' open' : ''}`}>

          {/* ── Mobile Close Button ──
              mobile menu-এর উপরে right side-এ X button।
              click করলে menu বন্ধ হয়। */}
          <button
            className="menu-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fas fa-times" />
          </button>

          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={active === link ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo(link) }}
            >
              {link}
            </a>
          ))}

          {/* Mobile screen-এ nav-এর ভেতরে theme toggle দেখায় */}
          <button
            className="theme-toggle-mobile"
            onClick={() => setDarkMode(d => !d)}
            aria-label="Toggle theme"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`} />
            <span style={{ marginLeft: '6px' }}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </nav>

        {/* ── Desktop Dark/Light Mode Button ──
            darkMode = true হলে sun icon দেখায় (light-এ যাওয়ার option)
            darkMode = false হলে moon icon দেখায় (dark-এ ফেরার option) */}
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(d => !d)}
          aria-label="Toggle dark/light mode"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`} />
        </button>

        {/* ── Hamburger Icon (mobile only) ──
            open হলে X দেখায়, বন্ধ হলে ☰ (bars) দেখায় */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
        </div>

      </header>
    </>
  )
}
