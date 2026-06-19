import { Link } from 'react-router-dom'
import { Navbar }        from '../layout/Navbar'
import { Footer }        from '../layout/Footer'
import { CookieConsent } from '../widgets/CookieConsent'
import { useSEO }        from '../../hooks/useSEO'

interface Props {
  title: string
  description: string
  path: string
  children: React.ReactNode
}

export const LegalLayout = ({ title, description, path, children }: Props) => {
  useSEO({
    title:       `${title} | INCO Estudio Técnico`,
    description,
    path,
    breadcrumb:  title,
  })
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-blue border-b-[3px] border-amber pt-24 pb-12 px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="eyebrow text-white/60 before:bg-amber mb-4">
              Legal
            </div>
            <h1
              className="font-serif text-white font-semibold leading-tight"
              style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-stone-50 py-14 px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[13px] text-amber hover:text-amber-dark transition-colors duration-150 mb-10 focus:outline-none focus-visible:underline"
            >
              ← Volver al inicio
            </Link>
            {children}
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}
