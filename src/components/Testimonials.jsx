// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Testimonials.jsx — Client Reviews Section
//
//  Features:
//   • Auto-play slider — প্রতি ৫ সেকেন্ডে পরের card-এ যায়
//   • Prev / Next arrow buttons
//   • Dot navigation — click করলে সেই slide-এ যায়
//   • Touch/Swipe support — mobile-এ swipe করে navigate করা যায়
//   • Star rating display (⭐)
//   • Pause on hover — hover করলে auto-play থামে
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef, useCallback } from 'react'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA — এখানে নিজের client reviews দাও
//
// rating: 1–5 (star দেখানোর জন্য)
// role: client-এর পদবি ও company
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TESTIMONIALS = [
  {
    name:   'Ahmed Al-Rashid',
    role:   'Business Owner, Dubai',
    img:    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text:   'Mehidi created an incredible sales dashboard for my business. The Power Query automation saved us 10+ hours per week. Absolutely professional work, delivered on time. Will definitely hire again!',
  },
  {
    name:   'Sarah Mitchell',
    role:   'HR Manager, UK',
    img:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text:   'The payroll and attendance system Mehidi built is outstanding. Complex formulas work perfectly, the interface is clean, and he even added extra features beyond what I requested. 5-star service!',
  },
  {
    name:   'Rajesh Kumar',
    role:   'Operations Manager, India',
    img:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text:   'Best Excel specialist on Fiverr! Mehidi transformed our messy inventory data into a clean, automated tracking system. The reorder alerts alone saved us from several stockout situations.',
  },
  {
    name:   'Jessica Thompson',
    role:   'Financial Analyst, USA',
    img:    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text:   'Mehidi\'s knowledge of advanced Excel formulas is exceptional. He solved a complex multi-sheet XLOOKUP problem in minutes that had been troubling our team for days. Highly recommended!',
  },
  {
    name:   'Mohammad Al-Farsi',
    role:   'CEO, Retail Chain, Qatar',
    img:    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text:   'Excellent work on our monthly financial reporting system. Mehidi integrated all our GL accounts, created beautiful charts, and automated the entire monthly report generation. Truly 8 years of expertise shows!',
  },
]

export default function Testimonials() {
  // ── current slide index ──
  const [current, setCurrent]   = useState(0)
  // ── hover করলে auto-play pause হয় ──
  const [paused,  setPaused]    = useState(false)

  // swipe detection-এর জন্য touch start position store করা হয়
  const touchStartX = useRef(null)
  const total = TESTIMONIALS.length

  // ── পরের slide-এ যাওয়া ──
  // useCallback দিয়ে memoize করা — useEffect-এ dependency হিসেবে ব্যবহার হয়
  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % total) // শেষে গেলে আবার শুরুতে আসে
  }, [total])

  // ── আগের slide-এ যাওয়া ──
  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total) // শুরুতে গেলে শেষে চলে যায়
  }, [total])

  // ── Auto-play — প্রতি ৫ সেকেন্ডে goNext() চলে ──
  // paused = true হলে interval clear হয়
  useEffect(() => {
    if (paused) return

    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval) // cleanup — component unmount বা paused হলে
  }, [goNext, paused])

  // ── Touch Swipe — mobile-এ বাম/ডান swipe ──
  const handleTouchStart = (e) => {
    // touch শুরুর X position save করা
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return

    // swipe distance = শেষ X - শুরু X
    const diff = touchStartX.current - e.changedTouches[0].clientX

    if (diff > 50)       goNext() // বাম দিকে swipe → পরের slide
    else if (diff < -50) goPrev() // ডান দিকে swipe → আগের slide

    touchStartX.current = null
  }

  return (
    <section className="testimonials-section" id="testimonials">

      {/* ── Section Title ── */}
      <h2 className="heading reveal">
        Client <span>Reviews</span>
      </h2>
      <p className="section-subtitle reveal">
        What my clients say about working with me
      </p>

      {/* ── Slider Wrapper ──
          onMouseEnter → auto-play pause
          onMouseLeave → auto-play resume */}
      <div
        className="testimonials-slider reveal"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* ── Prev Arrow ── */}
        <button
          className="testimonial-arrow prev"
          onClick={goPrev}
          aria-label="Previous review"
        >
          <i className="fas fa-chevron-left" />
        </button>

        {/* ── Slider Track ──
            translateX দিয়ে slide হয়।
            current = 2 হলে → translateX(-200%) → 3rd card দেখায় */}
        <div
          className="testimonials-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">

              {/* ── Client Photo ── */}
              <img
                src={t.img}
                alt={t.name}
                className="testimonial-img"
                loading="lazy"
              />

              {/* ── Star Rating ──
                  Array(t.rating).fill() — rating সংখ্যক star তৈরি করে */}
              <div className="testimonial-stars">
                {Array(t.rating).fill(null).map((_, si) => (
                  <i key={si} className="fas fa-star" />
                ))}
              </div>

              {/* ── Quote icon + Review text ── */}
              <div style={{ position: 'relative' }}>
                {/* Decorative quote mark */}
                <i
                  className="fas fa-quote-left"
                  style={{
                    position: 'absolute',
                    top:      '-10px',
                    left:     '-5px',
                    fontSize: '2rem',
                    color:    'var(--accent)',
                    opacity:  0.3,
                  }}
                />
                <p style={{ paddingLeft: '1.5rem' }}>{t.text}</p>
              </div>

              {/* ── Client Name + Role ── */}
              <h4>{t.name}</h4>
              <span>{t.role}</span>

            </div>
          ))}
        </div>

        {/* ── Next Arrow ── */}
        <button
          className="testimonial-arrow next"
          onClick={goNext}
          aria-label="Next review"
        >
          <i className="fas fa-chevron-right" />
        </button>

      </div>

      {/* ── Dot Navigation ──
          active dot — accent color + wide pill shape */}
      <div className="testimonial-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Auto-play progress indicator ──
          paused হলে "Paused" দেখায়, নইলে countdown progress bar */}
      <p style={{
        textAlign:  'center',
        marginTop:  '1rem',
        fontSize:   '0.75rem',
        color:      'var(--text-muted)',
      }}>
        {paused
          ? '⏸ Paused — move cursor away to resume'
          : '▶ Auto-playing · hover to pause · swipe on mobile'}
      </p>

    </section>
  )
}
