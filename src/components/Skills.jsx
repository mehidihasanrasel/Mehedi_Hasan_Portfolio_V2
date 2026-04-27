// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Skills.jsx — My Skills Section
//
//  ৩টি অংশ আছে:
//   ① Category Tab Buttons (Frontend / Backend / Tools)
//      Tab click করলে সেই category-র skills দেখায়
//   ② Skill Progress Bars
//      Screen-এ আসলে 0% থেকে animated fill হয়
//      প্রতিটি bar-এ icon + name + percentage আছে
//   ③ Tools & Technologies — icon badge grid
//      যে tools regularly use করো সেগুলো badge হিসেবে
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef } from 'react'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA — এখানে নিজের skills দিয়ে পরিবর্তন করো
//
// icon: Font Awesome class (https://fontawesome.com)
// pct:  Skill percentage (0–100)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SKILL_CATEGORIES = [
  {
    id:     'excel',
    label:  'Excel',
    icon:   'fas fa-file-excel',
    skills: [
      { name: 'Advanced Excel',   icon: 'fas fa-table',          pct: 97 },
      { name: 'Power Query',      icon: 'fas fa-sync-alt',        pct: 90 },
      { name: 'Dashboard Design', icon: 'fas fa-chart-bar',       pct: 93 },
      { name: 'Pivot Table',      icon: 'fas fa-th',              pct: 95 },
      { name: 'VBA Macro',        icon: 'fas fa-code',            pct: 82 },
      { name: 'Advanced Formulas',icon: 'fas fa-superscript',     pct: 96 },
    ],
  },
  {
    id:     'data',
    label:  'Data',
    icon:   'fas fa-chart-line',
    skills: [
      { name: 'Data Analysis',    icon: 'fas fa-search-dollar',   pct: 95 },
      { name: 'Sales Reporting',  icon: 'fas fa-receipt',         pct: 97 },
      { name: 'HR & Payroll',     icon: 'fas fa-users',           pct: 92 },
      { name: 'Financial Report', icon: 'fas fa-money-bill-wave',  pct: 90 },
      { name: 'Inventory Mgmt',   icon: 'fas fa-boxes',           pct: 88 },
      { name: 'Google Sheets',    icon: 'fas fa-table',            pct: 85 },
    ],
  },
  {
    id:     'tools',
    label:  'Tools',
    icon:   'fas fa-tools',
    skills: [
      { name: 'Microsoft Excel',  icon: 'fas fa-file-excel',      pct: 97 },
      { name: 'Google Sheets',    icon: 'fas fa-table',            pct: 85 },
      { name: 'Power BI (Basic)', icon: 'fas fa-chart-pie',        pct: 70 },
      { name: 'MS Word',          icon: 'fas fa-file-word',        pct: 90 },
      { name: 'MS PowerPoint',    icon: 'fas fa-file-powerpoint',  pct: 85 },
      { name: 'GitHub',           icon: 'fab fa-github',           pct: 75 },
    ],
  },
]

// ── Tools badge section-এর data ──
// এগুলো progress bar ছাড়া শুধু icon + name badge হিসেবে দেখায়
const TOOL_BADGES = [
  { name: 'MS Excel',     icon: 'fas fa-file-excel'     },
  { name: 'Power Query',  icon: 'fas fa-sync-alt'       },
  { name: 'Google Sheets',icon: 'fas fa-table'           },
  { name: 'VBA Macro',    icon: 'fas fa-code'           },
  { name: 'Pivot Table',  icon: 'fas fa-th'             },
  { name: 'GitHub',       icon: 'fab fa-github'         },
  { name: 'Dashboard',    icon: 'fas fa-chart-bar'       },
  { name: 'Power BI',     icon: 'fas fa-chart-pie'       },
  { name: 'MS Word',      icon: 'fas fa-file-word'       },
  { name: 'PowerPoint',   icon: 'fas fa-file-powerpoint' },
  { name: 'Data Analysis',icon: 'fas fa-search-dollar'  },
  { name: 'Automation',   icon: 'fas fa-robot'           },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SkillBar Component
//
// কাজ: একটি skill-এর progress bar render করে।
//   • Screen-এ আসলে 0% → pct% animated fill হয়
//   • Hover করলে bar-এ glow effect দেখায়
//   • Icon + Name বাম দিকে, Percentage ডান দিকে
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SkillBar({ name, icon, pct, index }) {
  // width: bar কতটা fill হয়েছে (0 থেকে pct পর্যন্ত)
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    // bar screen-এ আসলে width set করি — CSS transition দিয়ে animate হয়
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // index দিয়ে delay — একটার পর একটা আসে
          setTimeout(() => setWidth(pct), index * 100)
          observer.disconnect() // একবার animate হলে আর দেখতে হবে না
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [pct, index])

  return (
    <div className="skill-item reveal" ref={ref}>

      {/* ── Label row: icon + name বাম দিকে, % ডান দিকে ── */}
      <div className="skill-label">
        <span className="skill-name">
          {/* Skill icon */}
          <i className={icon} style={{
            color:       'var(--accent)',
            marginRight: '8px',
            fontSize:    '1rem',
          }} />
          {name}
        </span>
        {/* Percentage — bar fill হওয়ার সাথে সাথে দেখায় */}
        <span className="skill-pct">{width}%</span>
      </div>

      {/* ── Progress Bar ── */}
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}  /* width animate হয় CSS transition দিয়ে */
        >
          {/* Bar-এর ডান প্রান্তে একটা glowing dot */}
          {width > 5 && (
            <span style={{
              position:     'absolute',
              right:        '-1px',
              top:          '50%',
              transform:    'translateY(-50%)',
              width:        '12px',
              height:       '12px',
              borderRadius: '50%',
              background:   'var(--accent)',
              boxShadow:    '0 0 8px var(--accent)',
            }} />
          )}
        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Skills() {
  // ── Active category tab — default: 'frontend' ──
  const [activeTab, setActiveTab] = useState('excel')

  // ── Active category-র skills list বের করা ──
  // SKILL_CATEGORIES array থেকে activeTab-এর সাথে মিলে এমন object খুঁজে বের করে
  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab) ?? SKILL_CATEGORIES[0]

  // ── Tab change হলে bars আবার animate হবে ──
  // তার জন্য width reset করতে হবে — key prop দিয়ে component remount করি
  const [tabKey, setTabKey] = useState(0)

  // Tab click করলে activeTab বদলায় এবং key বাড়ে (force re-render)
  const handleTabChange = (id) => {
    setActiveTab(id)
    setTabKey(k => k + 1) // key বদলালে SkillBar component নতুন করে mount হয়
  }

  return (
    <section className="skills-section" id="skills">

      {/* Section Title */}
      <h2 className="heading reveal">
        My <span>Skills</span>
      </h2>

      {/* ── Category Tab Buttons ──
          Frontend / Backend / Tools
          active tab-এ accent background দেখায় */}
      <div className="skills-tabs reveal">
        {SKILL_CATEGORIES.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`skills-tab-btn ${activeTab === id ? 'active' : ''}`}
            onClick={() => handleTabChange(id)}
          >
            <i className={icon} style={{ marginRight: '8px' }} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Skill Bars Grid ──
          tabKey prop দিলে tab বদলানোর সময় component remount হয়
          → bars আবার 0% থেকে animate হয় */}
      <div className="skills-container" key={tabKey}>
        {activeCategory.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            pct={skill.pct}
            index={i} // delay-এর জন্য index পাঠানো হচ্ছে
          />
        ))}
      </div>

      {/* ── Tools & Technologies Badge Grid ──
          progress bar ছাড়া শুধু icon + name দিয়ে badge */}
      <div className="tools-section reveal">
        <h3 className="tools-heading">
          <i className="fas fa-cubes" style={{ marginRight: '10px', color: 'var(--accent)' }} />
          Tools & Technologies
        </h3>

        <div className="tools-grid">
          {TOOL_BADGES.map(({ name, icon }) => (
            <div className="tool-badge" key={name}>
              <i className={icon} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
