import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { PATHS } from './data/clinic'
import { LanguageProvider } from './i18n/LanguageProvider'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Treatments } from './pages/Treatments'

/** A new page starts at the top; a link to a category (#hash) scrolls itself. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path={PATHS.home} element={<Home />} />
          <Route path={PATHS.treatments} element={<Treatments />} />
          {/* The old category and treatment pages folded into the one list. */}
          <Route path={`${PATHS.treatments}/*`} element={<Navigate to={PATHS.treatments} replace />} />
          <Route path={PATHS.about} element={<About />} />
          <Route path={PATHS.contact} element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
