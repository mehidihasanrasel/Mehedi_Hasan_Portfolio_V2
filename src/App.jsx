import { useEffect } from 'react'
import Navbar      from './components/Navbar'
import Home        from './components/Home'
import About       from './components/About'
import Skills      from './components/Skills'
import Services    from './components/Services'
import Portfolio   from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Contact     from './components/Contact'
import Footer      from './components/Footer'

export default function App() {

  // ── Global Scroll Reveal ──
  // Skills, Testimonials, Contact-এ নিজস্ব observer নেই।
  // এই একটা global observer সব .reveal element handle করে।
  useEffect(() => {
    // ── IntersectionObserver: .reveal → .active ──
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    // সব .reveal observe করা
    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.active)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        // ইতিমধ্যে viewport-এ থাকলে সরাসরি active করো
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active')
        } else {
          io.observe(el)
        }
      })
    }

    // Initial scan — paint হওয়ার পর
    const timer = setTimeout(observeAll, 50)

    // ── MutationObserver: নতুন .reveal element DOM-এ যোগ হলে ধরো ──
    // About tab switch করলে নতুন TimelineItem render হয় — এটা সেগুলো handle করে
    const mo = new MutationObserver(() => {
      observeAll()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
