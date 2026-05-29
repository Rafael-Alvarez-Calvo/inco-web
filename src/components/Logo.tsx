interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { wrap: 32, arc: 20, fontSize: 14, subSize: 8 },
  md: { wrap: 42, arc: 26, fontSize: 18, subSize: 10 },
  lg: { wrap: 56, arc: 34, fontSize: 24, subSize: 12 },
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const s = sizes[size]
  const textColor = variant === 'light' ? '#ffffff' : '#1a3a5c'
  const subColor  = variant === 'light' ? 'rgba(255,255,255,0.6)' : '#8a8680'

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Logotipo fiel al original: media luna + trazo horizontal (igual al SVG de inco.com.es) */}
      <svg
        width={s.wrap} height={s.wrap}
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="INCO logo"
      >
        {/* Base marrón/arena */}
        <rect x="4" y="30" width="34" height="5" rx="1" fill="#8B6914" opacity="0.9"/>
        {/* Arco naranja — media luna característica del logo INCO */}
        <path
          d="M8 30 C8 16 34 16 34 30"
          stroke="#C17F3E"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Línea horizontal inferior del arco */}
        <line x1="4" y1="35" x2="38" y2="35" stroke="#8B6914" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      <div className="flex flex-col leading-tight">
        <span
          className="font-serif font-semibold tracking-wide"
          style={{ fontSize: s.fontSize, color: textColor }}
        >
          INCO
        </span>
        <span
          className="uppercase tracking-widest"
          style={{ fontSize: s.subSize, color: subColor, letterSpacing: '0.15em' }}
        >
          Estudio Técnico, S.L.
        </span>
      </div>
    </div>
  )
}
