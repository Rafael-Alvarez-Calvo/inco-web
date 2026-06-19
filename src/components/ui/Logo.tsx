interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 28, md: 34, lg: 46 }

export const Logo = ({ variant = 'dark', size = 'md' }: LogoProps) => {
  const h = heights[size]
  // dark variant: texto navy + naranja/marrón sobre fondo blanco (header)
  // light variant: texto blanco + naranja/marrón sobre fondo azul (footer, hero)
  const src = variant === 'dark'
    ? '/logo-inco-dark.png'
    : '/logo-inco-transparent.png'

  return (
    <img
      src={src}
      alt="INCO Estudio Técnico, S.L."
      style={{ height: h, width: 'auto', display: 'block' }}
    />
  )
}
