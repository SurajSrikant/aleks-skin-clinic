import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from 'motion/react'
import { ReactLenis, useLenis } from 'lenis/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Category } from './pages/Category'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Treatment } from './pages/Treatment'
import { Treatments } from './pages/Treatments'

/**
 * Screens cross-fade on navigation. The old page leaves quickly, the window
 * jumps to the top while nothing is shown, and the new page arrives — so the
 * reset never reads as a scroll. An in-page anchor keeps its own position.
 */
function Pages() {
  const location = useLocation()
  const lenis = useLenis()

  const toTop = () => {
    if (location.hash) return
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={toTop}>
      <m.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatments/:categoryId" element={<Category />} />
          <Route path="/treatments/:categoryId/:treatmentId" element={<Treatment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </m.div>
    </AnimatePresence>
  )
}

function Site() {
  return (
    <>
      <Nav />
      {/* Sits above the footer, which waits underneath to be uncovered. */}
      <main className="relative z-10 bg-cream">
        <Pages />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const reduced = useReducedMotion()

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {/* Weighted wheel scrolling on desktop only: touch keeps the phone's
            own scroll, and a reduced-motion request gets native scrolling. */}
        {reduced ? (
          <Site />
        ) : (
          <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: true }}>
            <Site />
          </ReactLenis>
        )}
      </MotionConfig>
    </LazyMotion>
  )
}
