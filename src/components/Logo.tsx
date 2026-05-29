interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 28, md: 36, lg: 48 }

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const h = heights[size]
  // En header (dark) usamos versión oscura; en footer/hero (light) la versión blanca PNG original
  // Como el PNG es sobre fondo negro/transparente, lo usamos siempre con filter en modo dark
  return (
    <img
      src="/logo-inco.png"
      alt="INCO Estudio Técnico, S.L."
      style={{
        height: h,
        width: 'auto',
        filter: variant === 'dark'
          ? 'brightness(0) saturate(100%) invert(18%) sepia(40%) saturate(600%) hue-rotate(185deg) brightness(80%)'
          : 'none',
        display: 'block',
      }}
    />
  )
}
