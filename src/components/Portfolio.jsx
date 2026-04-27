// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Portfolio.jsx — My Projects Section
//
//  ৩টি অংশ আছে:
//   ① Filter Buttons — All / React / UI-UX / E-commerce / App
//      Click করলে সেই category-র projects দেখায়
//      বাকিগুলো smooth animate হয়ে hide হয়
//   ② Project Cards Grid
//      Hover করলে overlay আসে — title, desc, links
//      প্রতিটি card-এ category badge আছে
//   ③ Project Detail Modal
//      Card-এ "View Details" click করলে modal খোলে
//      Full description, tech stack, live/github links
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useCallback } from 'react'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA — এখানে নিজের projects দিয়ে পরিবর্তন করো
//
// category: filter button-এর সাথে মিলাতে হবে
//   'react' | 'ui-ux' | 'ecommerce' | 'app'
// tech: technology badge array
// live: deployed site URL (না থাকলে '#' দাও)
// github: GitHub repo URL (না থাকলে '#' দাও)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PROJECTS = [
  {
    id:       1,
    img:      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    title:    'Sales Report — Yearly & DHK/NRG',
    category: 'dashboard',
    badge:    'Dashboard',
    desc:     'Yearly ও Regional (Dhaka & Narayanganj) Sales Report — Territory wise breakdown, target vs achievement.',
    longDesc: 'Navana Pharmaceuticals PLC-এর জন্য তৈরি Yearly ও Regional Sales Report। Territory-wise breakdown, target vs achievement analysis, trend charts এবং automated Power Query refresh সহ।',
    tech:     ['Advanced Excel', 'Power Query', 'Pivot Table', 'Charts', 'Conditional Formatting'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/Sales%20Report%20Update%20NRG%20Master%20Copy.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/Sales%20Report%20Update%20NRG%20Master%20Copy.xlsx',
  },
  {
    id:       2,
    img:      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    title:    'Salary & Attendance System',
    category: 'automation',
    badge:    'Automation',
    desc:     'Full HR automation — Attendance tracking, Full Salary calculation, Depot Attendance management সবকিছু একটি system-এ।',
    longDesc: 'Full HR automation system — Monthly attendance tracking, salary calculation with all allowances/deductions, depot attendance management, and automated payroll generation। Navana Pharma-তে actively used।',
    tech:     ['VBA Macro', 'Advanced Formulas', 'Data Validation', 'Automation', 'HR System'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/Full%20Salary.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/Full%20Salary.xlsx',
  },
  {
    id:       3,
    img:      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    title:    'Depot Performance Monthly Report',
    category: 'dashboard',
    badge:    'Dashboard',
    desc:     'প্রতিটি Depot-এর মাসিক performance tracking — Target achievement, KPI monitoring, comparative analysis।',
    longDesc: 'প্রতিটি Depot-এর monthly performance dashboard। Target vs Achievement, KPI monitoring, trend analysis, comparative reports এবং automated data refresh সহ।',
    tech:     ['Pivot Table', 'Dashboard', 'KPI Tracking', 'Charts', 'Power Query'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/Depot%20Performance%20Monthly%20Report.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/Depot%20Performance%20Monthly%20Report.xlsx',
  },
  {
    id:       4,
    img:      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    title:    'Gift Stock Count System v2',
    category: 'analysis',
    badge:    'Analysis',
    desc:     'Gift item-এর stock counting ও management system — Category-wise breakdown, reorder alerts।',
    longDesc: 'Gift item inventory management system। Category-wise stock count, reorder level alerts, version-controlled format, automated stock summary এবং distribution tracking।',
    tech:     ['Inventory System', 'Stock Management', 'VLOOKUP', 'Conditional Formatting', 'Reporting'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/Register.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/Register.xlsx',
  },
  {
    id:       5,
    img:      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
    title:    'REPSL Report — Monthly & Yearly',
    category: 'dashboard',
    badge:    'Dashboard',
    desc:     'REPSL (Representative Performance) Monthly ও Yearly report — GL Accounts integration সহ।',
    longDesc: 'Representative Performance monthly ও yearly comprehensive report। GL Accounts integration, target tracking, territory-wise breakdown এবং automated summary dashboard।',
    tech:     ['Advanced Excel', 'GL Accounts', 'SUMIF', 'INDEX-MATCH', 'Financial Report'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/REPSL%20Monthly.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/REPSL%20Monthly.xlsx',
  },
  {
    id:       6,
    img:      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
    title:    'Lock Status & Territory Report',
    category: 'analysis',
    badge:    'Analysis',
    desc:     'Territory-wise Lock Status tracking (v7) — Field officer performance ও area-wise data management।',
    longDesc: 'Territory Lock Status tracking v7 — Field officer performance monitoring, area-wise data management, lock/unlock status reports এবং Territory Lock Information system।',
    tech:     ['Territory Management', 'Data Analysis', 'XLOOKUP', 'Array Formula', 'Reporting'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/Territory%20Lock%20Information.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/Territory%20Lock%20Information.xlsx',
  },
  {
    id:       7,
    img:      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    title:    'Daily Cash Report System',
    category: 'automation',
    badge:    'Automation',
    desc:     'প্রতিদিনের cash flow tracking — Income, expense, balance calculation সহ automated daily reporting।',
    longDesc: 'Daily cash flow tracking system। Income, expense, balance calculation, automated daily summaries এবং monthly consolidated report তৈরির সুবিধা সহ।',
    tech:     ['Cash Flow', 'Daily Report', 'Automation', 'Finance', 'Formula-driven'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/Daily%20Cash%20Report.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/Daily%20Cash%20Report.xlsx',
  },
  {
    id:       8,
    img:      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80',
    title:    '97 Enterprise System v7',
    category: 'automation',
    badge:    'Automation',
    desc:     'Enterprise-level data management — Multi-sheet, complex formula-driven automated reporting।',
    longDesc: 'Large-scale enterprise data management system। Multi-sheet complex formulas, automated reporting pipelines, cross-reference validation এবং version-controlled data management।',
    tech:     ['Enterprise System', 'Complex Formula', 'Multi-sheet', 'VBA', 'Automation'],
    live:     'https://raw.githubusercontent.com/mehidihasanrasel/My-Excel-Files/main/97%20Enterprise%20Format.xlsx',
    github:   'https://github.com/mehidihasanrasel/My-Excel-Files/blob/main/97%20Enterprise%20Format.xlsx',
  },
]

// ── Filter button list ──
const FILTERS = [
  { label: 'All',         value: 'all'        },
  { label: '📊 Dashboard', value: 'dashboard'  },
  { label: '⚡ Automation', value: 'automation' },
  { label: '📈 Analysis',   value: 'analysis'   },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ProjectModal Component
//
// কাজ: project-এর full details দেখায়।
//   • backdrop click করলে বা ✕ click করলে বন্ধ হয়
//   • ESC key দিয়েও বন্ধ করা যায়
//   • Scroll lock — modal খোলা থাকলে body scroll বন্ধ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProjectModal({ project, onClose }) {

  // ESC key দিয়ে modal বন্ধ করা
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)

    // modal খোলা থাকলে body scroll বন্ধ করি
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = '' // modal বন্ধ হলে scroll ফিরিয়ে দাও
    }
  }, [onClose])

  if (!project) return null

  return (
    // ── Backdrop — click করলে modal বন্ধ হয় ──
    <div className="modal-backdrop" onClick={onClose}>

      {/* ── Modal Box ──
          e.stopPropagation() — modal-এর ভেতরে click করলে backdrop-এর
          onClick চলবে না, তাই modal বন্ধ হবে না */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* ── Close Button ── */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <i className="fas fa-times" />
        </button>

        {/* ── Project Image ── */}
        <div className="modal-img">
          <img src={project.img} alt={project.title} loading="lazy" />
          {/* Category badge */}
          <span className="modal-badge">{project.badge}</span>
        </div>

        {/* ── Modal Content ── */}
        <div className="modal-content">

          {/* Title */}
          <h3>{project.title}</h3>

          {/* Full description — longDesc */}
          <p className="modal-desc">{project.longDesc}</p>

          {/* ── Tech Stack Badges ── */}
          <div className="modal-tech">
            <h4>
              <i className="fas fa-tools" style={{ marginRight: '8px', color: 'var(--accent)' }} />
              Tech Stack
            </h4>
            <div className="tech-badges">
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>

          {/* ── Action Buttons — Live Demo + GitHub ── */}
          <div className="modal-actions">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <i className="fas fa-external-link-alt" style={{ marginRight: '8px' }} />
              Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <i className="fab fa-github" style={{ marginRight: '8px' }} />
              GitHub
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Portfolio() {
  // ── active filter — default: 'all' সব দেখায় ──
  const [activeFilter, setActiveFilter] = useState('all')

  // ── modal-এ কোন project দেখাবে — null হলে modal বন্ধ ──
  const [modalProject, setModalProject] = useState(null)

  // ── Filter logic ──
  // activeFilter = 'all' হলে সব project দেখায়
  // অন্যথায় project.category মিলালে দেখায়
  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter)

  // modal বন্ধ করার function — useCallback দিয়ে memoize করা
  // Modal component-এ dependency হিসেবে pass হয়
  const closeModal = useCallback(() => setModalProject(null), [])

  // Scroll reveal is handled globally in App.jsx

  return (
    <>
      <section className="portfolio-section" id="portfolio">

        {/* ── Section Title ── */}
        <h2 className="heading reveal">
          My <span>Projects</span>
        </h2>

        {/* ── Subtitle ── */}
        <p className="section-subtitle reveal">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          {activeFilter !== 'all' && ` in "${FILTERS.find(f => f.value === activeFilter)?.label}"`}
        </p>

        {/* ════════════════════════════════════════════
            ① Filter Buttons
            active filter button-এ accent style যায়
        ════════════════════════════════════════════ */}
        <div className="portfolio-filters reveal">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              className={`filter-btn ${activeFilter === value ? 'active' : ''}`}
              onClick={() => setActiveFilter(value)}
            >
              {label}
              {/* Active filter-এ project count badge দেখায় */}
              <span className="filter-count">
                {value === 'all'
                  ? PROJECTS.length
                  : PROJECTS.filter(p => p.category === value).length}
              </span>
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════
            ② Project Cards Grid
            filteredProjects map করে card render হয়
        ════════════════════════════════════════════ */}
        <div className="portfolio-container">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className="portfolio-box reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Project Image */}
              <img src={project.img} alt={project.title} loading="lazy" />

              {/* Category badge — card-এর উপর বাম কোণে */}
              <span className="project-badge">{project.badge}</span>

              {/* ── Hover Overlay ──
                  hover করলে opacity: 0 → 1 হয় (CSS transition) */}
              <div className="portfolio-layer">
                <h4>{project.title}</h4>
                <p>{project.desc}</p>

                <div className="portfolio-actions">
                  {/* Details Modal খোলে */}
                  <button
                    className="p-action-btn"
                    onClick={() => setModalProject(project)}
                    aria-label="View project details"
                    title="View Details"
                  >
                    <i className="fas fa-eye" />
                  </button>

                  {/* Live site নতুন tab-এ খোলে */}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-action-btn"
                    aria-label="Live demo"
                    title="Live Demo"
                  >
                    <i className="fas fa-external-link-alt" />
                  </a>

                  {/* GitHub repo নতুন tab-এ খোলে */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-action-btn"
                    aria-label="GitHub repository"
                    title="GitHub"
                  >
                    <i className="fab fa-github" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ════════════════════════════════════════════
          ③ Project Detail Modal
          modalProject null না হলে Modal render হয়
      ════════════════════════════════════════════ */}
      {modalProject && (
        <ProjectModal project={modalProject} onClose={closeModal} />
      )}
    </>
  )
}
