// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ServiceCardStack.jsx — Glassmorphism Card Stack
//
//  Services section-এর শুরুতে একটা interactive
//  card stack দেখায় — scroll বা dot click করে
//  navigate করা যায়। Portfolio-র color theme
//  (--accent, --bg-card, etc.) ব্যবহার করে।
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useRef, useCallback, useEffect } from 'react'

// ── Service data — Services.jsx-এর SERVICES থেকে same ──
const STACK_ITEMS = [
  {
    icon:     'fas fa-chart-bar',
    label:    'Excel Dashboard',
    sub:      'Data Visualization',
    proficiency: 95,
    tags:     ['Pivot Table', 'Slicers', 'KPI', 'Charts'],
    accent:   '#00eeff',   // portfolio cyan
    glow:     'rgba(0,238,255,0.25)',
    cardBg:   'rgba(0,238,255,0.07)',
  },
  {
    icon:     'fas fa-sync-alt',
    label:    'Power Query',
    sub:      'Data Automation',
    proficiency: 88,
    tags:     ['ETL Pipeline', 'Auto Refresh', 'Multi-source', 'Merge'],
    accent:   '#a78bfa',
    glow:     'rgba(167,139,250,0.25)',
    cardBg:   'rgba(167,139,250,0.07)',
  },
  {
    icon:     'fas fa-file-excel',
    label:    'Advanced Formulas',
    sub:      'Formula Engineering',
    proficiency: 92,
    tags:     ['XLOOKUP', 'INDEX-MATCH', 'Array', 'Dynamic'],
    accent:   '#34d399',
    glow:     'rgba(52,211,153,0.25)',
    cardBg:   'rgba(52,211,153,0.07)',
  },
  {
    icon:     'fas fa-users',
    label:    'HR & Payroll',
    sub:      'HR Automation',
    proficiency: 90,
    tags:     ['Salary Calc', 'Attendance', 'Leave Mgmt', 'Payroll'],
    accent:   '#f59e0b',
    glow:     'rgba(245,158,11,0.25)',
    cardBg:   'rgba(245,158,11,0.07)',
  },
  {
    icon:     'fas fa-chart-line',
    label:    'Sales Reporting',
    sub:      'Financial Analysis',
    proficiency: 93,
    tags:     ['Territory', 'Target vs Actual', 'GL Accounts', 'Trends'],
    accent:   '#f87171',
    glow:     'rgba(248,113,113,0.25)',
    cardBg:   'rgba(248,113,113,0.07)',
  },
  {
    icon:     'fas fa-boxes',
    label:    'Inventory System',
    sub:      'Stock Management',
    proficiency: 85,
    tags:     ['Stock Count', 'Reorder Alert', 'Category', 'Version Control'],
    accent:   '#38bdf8',
    glow:     'rgba(56,189,248,0.25)',
    cardBg:   'rgba(56,189,248,0.07)',
  },
]

// ── একটা card-এর position/style compute করে ──
function getCardStyle(offset, total) {
  // offset 0 = top (active), বাড়লে নিচে
  const behind = Math.min(offset, 3)
  return {
    zIndex:     total - offset,
    transform:  `translateY(${behind * 22}px) scale(${1 - behind * 0.06})`,
    opacity:    offset === 0 ? 1 : offset === 1 ? 0.70 : offset === 2 ? 0.42 : 0.20,
    boxShadow:  offset === 0
      ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${STACK_ITEMS[0]?.glow ?? 'transparent'}`
      : 'none',
  }
}

// ── Ripple helper ──
function spawnRipple(container, e) {
  const rect   = container.getBoundingClientRect()
  const size   = Math.max(container.offsetWidth, container.offsetHeight)
  const x      = e.clientX - rect.left - size / 2
  const y      = e.clientY - rect.top  - size / 2
  const span   = document.createElement('span')
  span.className = 'scs-ripple'
  span.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`
  container.appendChild(span)
  span.addEventListener('animationend', () => span.remove())
}

export default function ServiceCardStack() {
  const total      = STACK_ITEMS.length
  const [current, setCurrent]       = useState(0)
  const [animating, setAnimating]   = useState(false)
  const scrollAcc  = useRef(0)
  const scrollTmr  = useRef(null)
  const wrapRef    = useRef(null)
  const touchY     = useRef(0)

  const item = STACK_ITEMS[current]

  const goTo = useCallback((idx) => {
    if (animating || idx === current || idx < 0 || idx >= total) return
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => setAnimating(false), 500)
  }, [animating, current, total])

  // ── Wheel ──
  const handleWheel = useCallback((e) => {
    if (animating) { e.preventDefault(); return }
    scrollAcc.current += e.deltaY
    clearTimeout(scrollTmr.current)
    if (Math.abs(scrollAcc.current) < 80) {
      e.preventDefault()
      scrollTmr.current = setTimeout(() => { scrollAcc.current = 0 }, 500)
      return
    }
    const dir  = scrollAcc.current > 0 ? 1 : -1
    scrollAcc.current = 0
    const next = current + dir
    if (next >= 0 && next < total) { e.preventDefault(); goTo(next) }
  }, [animating, current, total, goTo])

  // ── Touch ──
  const handleTouchStart = (e) => { touchY.current = e.touches[0].clientY }
  const handleTouchEnd   = useCallback((e) => {
    if (animating) return
    const dy  = touchY.current - e.changedTouches[0].clientY
    if (Math.abs(dy) < 40) return
    goTo(current + (dy > 0 ? 1 : -1))
  }, [animating, current, goTo])

  // ── Keyboard ──
  const handleKeyDown = useCallback((e) => {
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    const dir = map[e.key]
    if (dir == null) return
    e.preventDefault()
    goTo(current + dir)
  }, [current, goTo])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  return (
    <div className="scs-section reveal">

      {/* ── Label ── */}
      <p className="scs-eyebrow">
        <i className="fas fa-layer-group" style={{ marginRight: 8 }} />
        Service Overview
      </p>

      <div
        className="scs-wrapper"
        ref={wrapRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Service card stack — arrow keys or scroll to navigate"
      >

        {/* ══ LEFT — Info panel ══ */}
        <div className="scs-info">

          {/* Counter */}
          <span className="scs-counter" style={{ color: item.accent }}>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          {/* Icon + Title */}
          <div className="scs-icon-row">
            <div className="scs-icon-circle" style={{ borderColor: item.accent, boxShadow: `0 0 18px ${item.glow}` }}>
              <i className={item.icon} style={{ color: item.accent }} />
            </div>
            <div>
              <h3 className="scs-title" key={current}>{item.label}</h3>
              <span className="scs-sub">{item.sub}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="scs-tags" key={`tags-${current}`}>
            {item.tags.map((t, i) => (
              <span
                key={t}
                className="scs-tag"
                style={i === 0 ? { borderColor: item.accent, color: item.accent } : {}}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="scs-progress-wrap">
            <div className="scs-progress-track">
              <div
                className="scs-progress-fill"
                style={{ width: `${item.proficiency}%`, background: `linear-gradient(90deg, ${item.accent}99, ${item.accent})` }}
              />
            </div>
            <div className="scs-progress-labels">
              <span>Proficiency</span>
              <span style={{ color: item.accent }}>{item.proficiency}%</span>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="scs-hint">
            <div className="scs-mouse">
              <div className="scs-mouse-dot" />
            </div>
            <span>Scroll or use dots</span>
          </div>
        </div>

        {/* ══ RIGHT — Card Stack ══ */}
        <div className="scs-stack-wrap">
          <div className="scs-stack">
            {/* Render in reverse so active card is on top in DOM */}
            {[...STACK_ITEMS].reverse().map((s, revIdx) => {
              const i      = total - 1 - revIdx          // real index
              const offset = (i - current + total) % total
              const style  = getCardStyle(offset, total)
              const isFront = offset === 0

              return (
                <div
                  key={s.label}
                  className={`scs-card${isFront ? ' scs-card--front' : ''}`}
                  style={{
                    ...style,
                    background: `linear-gradient(135deg, ${s.cardBg} 0%, rgba(255,255,255,0.03) 100%)`,
                    borderColor: isFront ? s.accent + '55' : 'rgba(255,255,255,0.10)',
                    transition:  'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease, box-shadow 0.55s ease',
                    cursor:      isFront ? 'default' : 'pointer',
                  }}
                  onClick={(e) => {
                    spawnRipple(e.currentTarget, e)
                    if (!isFront) goTo((current + 1) % total)
                  }}
                >
                  {/* Ripple layer */}
                  <div className="scs-ripple-container" />

                  {/* Top shine */}
                  <div className="scs-shine" />

                  {/* Card content */}
                  <div className="scs-card-inner">
                    <div className="scs-card-header">
                      <span className="scs-card-brand" style={{ color: s.accent }}>
                        {s.label}
                      </span>
                      <div className="scs-card-circle" style={{ borderColor: s.accent + '66' }} />
                    </div>
                    <div className="scs-card-dots">•••• &nbsp; •••• &nbsp; •••• &nbsp; {i + 1}</div>
                    <div className="scs-card-footer">
                      <span className="scs-card-sub">{s.sub}</span>
                      <div className="scs-chip">
                        <i className={s.icon} style={{ color: s.accent, fontSize: 11 }} />
                      </div>
                    </div>
                  </div>

                  {/* Glow blob */}
                  <div className="scs-glow" style={{ background: s.accent, opacity: isFront ? 0.35 : 0.15 }} />
                </div>
              )
            })}
          </div>

          {/* ── Dot navigation ── */}
          <div className="scs-dots" role="tablist">
            {STACK_ITEMS.map((_, i) => (
              <button
                key={i}
                className={`scs-dot${i === current ? ' scs-dot--active' : ''}`}
                style={i === current ? { background: item.accent, width: 22 } : {}}
                onClick={() => goTo(i)}
                aria-label={`Go to service ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
