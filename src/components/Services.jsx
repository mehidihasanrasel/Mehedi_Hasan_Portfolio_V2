// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Services.jsx — My Services Section
//
//  ৩টি অংশ আছে:
//   ① ৬টি Service Card
//      • Hover করলে card flip হয় (front → back)
//      • Front: icon + title + short description
//      • Back:  feature list + "Get Started" button
//   ② "How I Work" Process Steps
//      • ৪ ধাপে কাজের process দেখায়
//      • Step নম্বর + icon + description
//   ③ CTA Banner — "Ready to work together?"
//      • Contact section-এ scroll করে নিয়ে যায়
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA — এখানে নিজের services দিয়ে পরিবর্তন করো
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SERVICES = [
  {
    icon:  'fas fa-chart-bar',
    title: 'Excel Dashboard Design',
    desc:  'Interactive Excel dashboards with Pivot Table, Slicers, dynamic charts, and Conditional Formatting — business intelligence at a glance.',
    features: [
      'Pivot Table & Slicer Integration',
      'Dynamic Charts & Graphs',
      'KPI Monitoring Dashboard',
      'Automated Data Refresh',
    ],
  },
  {
    icon:  'fas fa-sync-alt',
    title: 'Power Query Automation',
    desc:  'Multiple source data merge, clean & transform — automated refresh সহ large dataset management এবং ETL pipeline।',
    features: [
      'Multi-source Data Merge',
      'Data Cleaning & Transformation',
      'Automated Refresh Setup',
      'Large Dataset Management',
    ],
  },
  {
    icon:  'fas fa-file-excel',
    title: 'Advanced Formula Solutions',
    desc:  'VLOOKUP, XLOOKUP, INDEX-MATCH, Array Formula, Nested IF, SUMIF/COUNTIF — complex multi-sheet formula logic।',
    features: [
      'XLOOKUP / INDEX-MATCH',
      'Array & Dynamic Formulas',
      'Multi-sheet Data Links',
      'Error Handling & Validation',
    ],
  },
  {
    icon:  'fas fa-users',
    title: 'HR & Payroll Systems',
    desc:  'Salary calculation, attendance tracking, depot management — full HR automation system as used in Navana Pharmaceuticals।',
    features: [
      'Salary Calculation Automation',
      'Attendance Tracking System',
      'Leave & Payroll Management',
      'Depot Attendance Reports',
    ],
  },
  {
    icon:  'fas fa-chart-line',
    title: 'Sales & Financial Reporting',
    desc:  'Yearly, monthly, territory-wise sales reports, REPSL reports, GL account integration — professional financial data analysis।',
    features: [
      'Territory-wise Sales Reports',
      'Target vs Achievement Tracking',
      'Monthly & Yearly Summaries',
      'GL Account Integration',
    ],
  },
  {
    icon:  'fas fa-boxes',
    title: 'Inventory & Stock Management',
    desc:  'Gift stock count systems, depot inventory tracking — automated count, reorder alert, version-controlled format।',
    features: [
      'Stock Count Automation',
      'Category-wise Breakdown',
      'Reorder Level Alerts',
      'Version-controlled Format',
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// "How I Work" — Process Steps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PROCESS_STEPS = [
  {
    step: '01',
    icon: 'fas fa-comments',
    title: 'Requirement Discussion',
    desc:  'আপনার data structure, goals এবং deliverable বুঝে নিই — কী ধরনের solution দরকার সেটা clearly define করা হয়।',
  },
  {
    step: '02',
    icon: 'fas fa-table',
    title: 'Data Collection & Planning',
    desc:  'Raw data collect করি, structure analyze করি এবং best approach plan করি — formula logic বা automation strategy নির্ধারণ।',
  },
  {
    step: '03',
    icon: 'fas fa-file-excel',
    title: 'Excel Solution Build',
    desc:  'Dashboard, automation বা report তৈরি করি — clean code, organized sheets, user-friendly design সহ।',
  },
  {
    step: '04',
    icon: 'fas fa-check-circle',
    title: 'Delivery & Support',
    desc:  'Final file deliver করি, walkthrough দিই এবং post-delivery support প্রদান করি — সব সমস্যায় সাহায্য করতে প্রস্তুত।',
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ServiceCard Component
//
// কাজ: Flip card — hover করলে front থেকে back দেখায়।
//   Front: icon + title + description
//   Back:  features list + Get Started button
//
// CSS perspective + rotateY দিয়ে 3D flip হয়।
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ServiceCard({ icon, title, desc, features, index }) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // transitionDelay দিয়ে একটার পর একটা reveal হয়
    <div
      className="service-flip-container reveal"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* ── Card Inner — এটাই rotate হয় ── */}
      <div className="service-flip-inner">

        {/* ── FRONT SIDE ── */}
        <div className="service-face service-front">
          {/* Icon */}
          <div className="service-icon-box">
            <i className={icon} />
          </div>

          {/* Title */}
          <h3>{title}</h3>

          {/* Short description */}
          <p>{desc}</p>

          {/* Hover hint */}
          <span className="flip-hint">
            <i className="fas fa-sync-alt" style={{ marginRight: '6px' }} />
            Hover to see details
          </span>
        </div>

        {/* ── BACK SIDE — rotateY(180deg) দিয়ে পেছনে থাকে ── */}
        <div className="service-face service-back">
          {/* Back-এ title আবার দেখায় */}
          <h3>{title}</h3>

          {/* Feature list */}
          <ul className="service-features">
            {features.map((f, i) => (
              <li key={i}>
                {/* চেকমার্ক icon */}
                <i className="fas fa-check-circle" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Contact section-এ নিয়ে যায় */}
          <button className="btn" onClick={scrollToContact}>
            <i className="fas fa-paper-plane" style={{ marginRight: '8px' }} />
            Get Started
          </button>
        </div>

      </div>
    </div>
  )
}

import ServiceCardStack from './ServiceCardStack'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Services() {

  // Scroll reveal is handled globally in App.jsx

  return (
    <section className="services-section" id="services">

      {/* ── Section Title ── */}
      <h2 className="heading reveal">
        My <span>Services</span>
      </h2>

      {/* ── Subtitle ── */}
      <p className="section-subtitle reveal">
        Here's what I can do for you. Hover over a card to see details.
      </p>

      {/* ════════════════════════════════════════════
          ① Glassmorphism Card Stack — interactive overview
      ════════════════════════════════════════════ */}
      <ServiceCardStack />

      {/* ════════════════════════════════════════════
          ① Service Cards Grid — ৬টি flip card
      ════════════════════════════════════════════ */}
      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} {...service} index={i} />
        ))}
      </div>

      {/* ════════════════════════════════════════════
          ② How I Work — Process Steps (৪ ধাপ)
      ════════════════════════════════════════════ */}
      <div className="process-section">
        <h3 className="process-heading reveal">
          <i className="fas fa-cogs" style={{ marginRight: '10px', color: 'var(--accent)' }} />
          How I Work
        </h3>

        <div className="process-grid">
          {PROCESS_STEPS.map(({ step, icon, title, desc }, i) => (
            <div
              className="process-step reveal"
              key={step}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Step number — বড় background number */}
              <div className="step-number">{step}</div>

              {/* Icon circle */}
              <div className="step-icon">
                <i className={icon} />
              </div>

              <h4>{title}</h4>
              <p>{desc}</p>

              {/* শেষ step ছাড়া সব step-এর পরে arrow দেখায় */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="step-arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          ③ CTA Banner — "Ready to work together?"
      ════════════════════════════════════════════ */}
      <div className="services-cta reveal">
        <h3>Ready to work together?</h3>
        <p>
          Have a project in mind? Let's discuss how I can help bring
          your vision to life.
        </p>
        <button
          className="btn"
          onClick={() =>
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <i className="fas fa-envelope" style={{ marginRight: '8px' }} />
          Let's Talk
        </button>
      </div>

    </section>
  )
}
