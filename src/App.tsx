import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import IntroStrip     from './components/IntroStrip'
import About          from './components/About'
import Services       from './components/Services'
import Gallery        from './components/Gallery'
import ProjectBanner  from './components/ProjectBanner'
import Guarantees     from './components/Guarantees'
import Presence       from './components/Presence'
import Certifications from './components/Certifications'
import Contact        from './components/Contact'
import Footer         from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroStrip />
        <About />
        <Services />
        <Gallery />
        <ProjectBanner />
        <Guarantees />
        <Presence />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
