# INCO Estudio Técnico, S.L. — Web corporativa

Web corporativa de **INCO Estudio Técnico, S.L.**, empresa de consultoría en ingeniería civil y arquitectura con más de 30 años de experiencia.

## Stack

- **Vite** — bundler
- **React 18** + **TypeScript**
- **Tailwind CSS v3**

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── components/
│   ├── Logo.tsx           # Logo SVG fiel al original
│   ├── Navbar.tsx         # Navegación fija con scroll
│   ├── Hero.tsx           # Hero con imagen real + stats animados
│   ├── IntroStrip.tsx     # Franja azul con cifras clave
│   ├── About.tsx          # Quiénes somos
│   ├── Services.tsx       # 9 servicios en grid
│   ├── ProjectBanner.tsx  # Bloque obra pública
│   ├── Guarantees.tsx     # Garantías con imágenes
│   ├── Presence.tsx       # 4 oficinas nacionales
│   ├── Certifications.tsx # ISO, PRL, Kit Digital
│   ├── Contact.tsx        # Formulario de contacto
│   └── Footer.tsx         # Pie de página completo
├── hooks/
│   ├── useInView.ts       # Intersection Observer hook
│   └── useCounter.ts      # Animación de contadores
└── App.tsx
```

## Imágenes

Las imágenes se sirven directamente desde `inco.com.es`. Para producción se recomienda descargarlas y servirlas desde `/public/images/`.

## Contacto

**INCO Estudio Técnico, S.L.**  
C/ Casas de Miravete 22A – 3ª Planta, Oficina 3  
28031 Madrid  
📞 +34 91 499 47 17  
✉️ info@inco.com.es
