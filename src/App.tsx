import { Routes, Route } from "react-router-dom";

import { ScrollToTop } from "./components/ui/ScrollToTop";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CookieConsent } from "./components/widgets/CookieConsent";
import { AccessibilityWidget } from "./components/widgets/AccessibilityWidget";
// import { WhatsAppButton }     from './components/widgets/WhatsAppButton'

import { Hero } from "./components/sections/Hero";
import { IntroStrip } from "./components/sections/IntroStrip";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Gallery } from "./components/sections/Gallery";
import { References } from "./components/sections/References";
import { ProjectBanner } from "./components/sections/ProjectBanner";
import { Guarantees } from "./components/sections/Guarantees";
import { Presence } from "./components/sections/Presence";
import { Certifications } from "./components/sections/Certifications";
import { Contact } from "./components/sections/Contact";

import { AvisoLegalPage } from "./components/legal/AvisoLegalPage";
import { PrivacidadPage } from "./components/legal/PrivacidadPage";
import { CookiesPage } from "./components/legal/CookiesPage";
import { AccesibilidadPage } from "./components/legal/AccesibilidadPage";

const HomePage = () => (
  <>
    <Navbar />
    <main id="contenido-principal">
      <Hero />
      <IntroStrip />
      <About />
      <Services />
      <Gallery />
      <References />
      <ProjectBanner />
      <Guarantees />
      <Presence />
      <Certifications />
      <Contact />
    </main>
    <Footer />
    <CookieConsent />
  </>
);

export const App = () => (
  <>
    <a href="#contenido-principal" className="skip-link">
      Saltar al contenido principal
    </a>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aviso-legal" element={<AvisoLegalPage />} />
      <Route path="/privacidad" element={<PrivacidadPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/accesibilidad" element={<AccesibilidadPage />} />
    </Routes>
    {/* Floating buttons — stacked bottom-right; AccessibilityWidget panel opens upward */}
    <div className="fixed bottom-6 right-4 z-[60] flex flex-col items-end gap-3">
      <AccessibilityWidget />
      {/* <WhatsAppButton /> */}
    </div>
  </>
);
