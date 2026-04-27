// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// About.jsx — About Me Section
//
//  ৩টি অংশ আছে এই file-এ:
//   ① About — ছবি + bio text + mini inline stats
//   ② Stats  — বড় animated counter cards
//              (Projects, Clients, Experience, Awards)
//   ③ Experience — tabbed timeline
//              Tab 1: Work Experience
//              Tab 2: Education
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef } from 'react'
import raselImg from '../assets/rasel.jpg'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ① DATA — এখানে নিজের তথ্য দিয়ে পরিবর্তন করো
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// About section-এর ছোট stats (Experience, Projects, Clients)
const MINI_STATS = [
  { number: '8+', label: 'Years Exp.' },
  { number: '50+', label: 'Projects'   },
  { number: '75+', label: 'Formats'    },
]

// বড় animated counter cards (Stats section)
// target: যে সংখ্যায় গিয়ে থামবে
// suffix: সংখ্যার পরে '+' বা 'K' ইত্যাদি
const STAT_CARDS = [
  { icon: 'fas fa-file-excel',  target: 16,  suffix: '+', label: 'Excel Projects'       },
  { icon: 'fas fa-users',       target: 85,  suffix: '+', label: 'Happy Clients'         },
  { icon: 'fas fa-calendar-alt',target: 8,   suffix: '+', label: 'Years Experience'      },
  { icon: 'fas fa-layer-group', target: 50,  suffix: '+', label: 'Formats Created'       },
]

// Experience tab-এর timeline data
const EXPERIENCE = [
  {
    year:    '2017 — Present',
    title:   'Excel & Data Specialist',
    company: 'Navana Pharmaceuticals PLC',
    desc:    'Sales Report, HR Automation, Dashboard Design, Salary & Attendance System, Depot Performance Reports, Power Query-based data pipelines — ৮ বছরের real-world Excel expertise।',
  },
  {
    year:    '2020 — Present',
    title:   'Freelance Excel Consultant',
    company: 'Fiverr & Upwork',
    desc:    '16+ professional Excel projects delivered. Custom dashboards, automation macros, data analysis — 5.0 rating with 85+ client reviews on Fiverr.',
  },
]

// Education tab-এর timeline data
const EDUCATION = [
  {
    year:    'Ongoing',
    title:   'Advanced Excel & Data Analytics',
    company: 'Self-Learning & Professional Training',
    desc:    'Power Query, VBA Macros, Advanced Dashboard Design, Google Sheets automation — continuous learning through online courses and hands-on practice.',
  },
  {
    year:    'Prior 2017',
    title:   'Higher Secondary Education',
    company: 'Dhaka, Bangladesh',
    desc:    'Completed higher secondary education in Bangladesh. Developed strong analytical skills and an early passion for data management and spreadsheet tools.',
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Custom Hook: useCounter
//
// কাজ: একটি সংখ্যা 0 থেকে শুরু করে target পর্যন্ত
//       animated ভাবে count up করে।
// start: true হলে animation শুরু হয়
// duration: কত ms-এ target-এ পৌঁছাবে (default 2000ms)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function useCounter(target, start, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return // start = false হলে চলবে না

    let startTime = null
    const startVal = 0

    // requestAnimationFrame দিয়ে smooth animation
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp

      // elapsed: কতটা সময় পার হয়েছে
      const elapsed  = timestamp - startTime
      // progress: 0 থেকে 1 এর মধ্যে (duration-এর fraction)
      const progress = Math.min(elapsed / duration, 1)

      // easeOut — শেষের দিকে slow হয়ে থামে
      const eased = 1 - Math.pow(1 - progress, 3)

      // বর্তমান count = startVal থেকে target পর্যন্ত interpolate
      setCount(Math.floor(startVal + (target - startVal) * eased))

      if (progress < 1) requestAnimationFrame(step) // এখনো শেষ হয়নি, চালু থাকো
      else setCount(target) // শেষ — exactly target-এ set করো
    }

    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// StatCard Component
//
// কাজ: একটি stat card render করে।
//       card screen-এ আসলে counter animation শুরু হয়।
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StatCard({ icon, target, suffix, label }) {
  const [visible, setVisible] = useState(false) // card screen-এ এসেছে কিনা
  const ref = useRef(null)

  // IntersectionObserver — card দেখা গেলে visible = true করে
  // তখন useCounter চালু হয়
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // visible হলে 0 থেকে target পর্যন্ত count করে
  const count = useCounter(target, visible, 2000)

  return (
    <div className="stat-card reveal" ref={ref}>
      {/* Icon */}
      <i className={icon} />

      {/* Animated number + suffix */}
      <div className="stat-number">
        {count}{suffix}
      </div>

      {/* Label */}
      <div className="stat-label">{label}</div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TimelineItem Component
//
// কাজ: একটি timeline entry (job বা education) render করে।
//       dot + card layout, hover করলে card shift করে।
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function TimelineItem({ year, title, company, desc, index }) {
  return (
    // index দিয়ে delay দেওয়া হয় যাতে একটার পর একটা আসে
    <div
      className="timeline-item reveal"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Vertical line-এর উপর glowing dot */}
      <div className="timeline-dot" />

      {/* Card */}
      <div className="timeline-card">
        {/* Year badge */}
        <span className="year">{year}</span>

        {/* Job/Degree title */}
        <h3>{title}</h3>

        {/* Company/Institution name — accent color */}
        <h4>{company}</h4>

        {/* Description */}
        <p>{desc}</p>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function About() {
  // ── Active tab: 'experience' অথবা 'education' ──
  const [activeTab, setActiveTab] = useState('experience')

  // Scroll reveal is handled globally in App.jsx

  return (
    <>
      {/* ════════════════════════════════════════════
          ① ABOUT SECTION — ছবি + bio + mini stats
      ════════════════════════════════════════════ */}
      <section className="about-section" id="about">

        {/* ── Profile Photo ── */}
        <div className="about-img reveal">
          {/*
            নিজের ছবি দিতে:
            import profileImg from '../assets/profile.jpg'
            তারপর src={profileImg} করো
          */}
          <img
            src={raselImg}
            alt="Mehidi Hasan Rasel — Excel &amp; Data Specialist"
            loading="eager"
          />
        </div>

        {/* ── Text Content ── */}
        <div className="about-content reveal">

          {/* Section title */}
          <h2 className="heading" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            About <span>Me</span>
          </h2>

          {/* Sub-title */}
          <h3>Excel & Data Specialist · Navana Pharmaceuticals PLC</h3>

          {/* Bio — নিজের সম্পর্কে লিখো */}
          <p>
            I'm a dedicated Excel &amp; Google Sheets specialist based in Dhaka,
            Bangladesh, with 8+ years of hands-on experience at Navana
            Pharmaceuticals PLC. I transform complex, messy data into clean,
            automated spreadsheet solutions.
          </p>
          <p>
            My expertise includes Dashboard Design, Power Query, VBA Automation,
            and professional reporting systems. On Fiverr &amp; Upwork, I've delivered
            16+ projects with a 5.0 rating and 85+ happy clients.
          </p>

          {/* ── Mini Stats Row (Years / Projects / Clients) ──
              এগুলো static number — animate হয় না।
              বড় animated counter নিচে Stats section-এ আছে। */}
          <div className="about-stats">
            {MINI_STATS.map(({ number, label }) => (
              <div className="about-stat-box" key={label}>
                <h4>{number}</h4>
                <p>{label}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a href="https://drive.google.com/file/d/1bTzK-NEsyCNLace6hPM4VVyHm384qLSB/view?usp=drive_link">
            <i className="fas fa-download" style={{ marginRight: '8px' }} />
            Download CV
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ② STATS SECTION — Animated Counter Cards
          screen-এ আসলে 0 থেকে count up শুরু হয়
      ════════════════════════════════════════════ */}
      <section className="stats-section" id="stats">
        <div className="stats-container">
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ③ EXPERIENCE SECTION — Tabbed Timeline
          Tab 1: Work Experience
          Tab 2: Education
      ════════════════════════════════════════════ */}
      <section className="experience-section" id="experience">

        {/* Section Title */}
        <h2 className="heading">
          My <span>Journey</span>
        </h2>

        {/* ── Tab Buttons ──
            activeTab state পরিবর্তন করলে নিচের timeline বদলায় */}
        <div className="exp-tabs">
          <button
            className={`exp-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <i className="fas fa-briefcase" style={{ marginRight: '8px' }} />
            Experience
          </button>
          <button
            className={`exp-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <i className="fas fa-graduation-cap" style={{ marginRight: '8px' }} />
            Education
          </button>
        </div>

        {/* ── Timeline ──
            activeTab অনুযায়ী EXPERIENCE অথবা EDUCATION data দেখায়।
            conditional rendering: ternary operator দিয়ে কোন array টা map করবে। */}
        <div className="timeline">
          {(activeTab === 'experience' ? EXPERIENCE : EDUCATION).map((item, i) => (
            <TimelineItem key={i} {...item} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
