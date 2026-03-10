# Panas Flavor — Landing Page & Catering System
## Documento Técnico para Claude Code

---

## 1. Resumen del Proyecto

**Cliente:** Panas Flavor — Food Truck de comida venezolana en Raleigh, NC  
**Dueño:** Carlos  
**Dominio:** panasflavor.com  
**Objetivo:** Landing page bilingüe (EN/ES) orientada a servicios de catering, con sistema de solicitud de reservas y envío de formulario por correo.

---

## 2. Stack Tecnológico

| Herramienta       | Uso                                      |
|--------------------|------------------------------------------|
| **Next.js 14+**    | Framework (App Router)                   |
| **Tailwind CSS**   | Estilos                                   |
| **TypeScript**     | Tipado                                    |
| **Vercel**         | Deploy y hosting                         |
| **Resend**         | Envío de correos transaccionales          |
| **next-intl**      | Internacionalización (EN/ES)             |
| **React DatePicker** o **react-day-picker** | Selector de fechas en formulario de catering |
| **Framer Motion**  | Animaciones sutiles (scroll reveals, transiciones) |
| **next/image**     | Optimización de imágenes                 |

---

## 3. Estructura del Proyecto

```
panas-flavor/
├── public/
│   ├── images/
│   │   ├── gallery/           # Fotos de comida y eventos (~19 fotos)
│   │   ├── logo-color.png     # Logo a color
│   │   └── logo-black.png     # Logo en negro
│   └── videos/                # Videos si se agregan después
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Home (landing completa)
│   │   │   └── globals.css
│   │   └── api/
│   │       └── catering-request/
│   │           └── route.ts       # API Route para envío de correo con Resend
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Gallery.tsx        # Fotos y videos de comida
│   │   │   ├── CateringMenu.tsx   # Menú de catering + galería de experiencias
│   │   │   ├── CateringForm.tsx   # Formulario de solicitud
│   │   │   ├── Schedule.tsx       # Calendario de disponibilidad
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── DatePicker.tsx
│   │       └── ImageLightbox.tsx
│   ├── lib/
│   │   ├── resend.ts              # Config de Resend
│   │   └── utils.ts
│   ├── i18n/
│   │   ├── request.ts
│   │   └── routing.ts
│   └── messages/
│       ├── en.json                # Traducciones inglés
│       └── es.json                # Traducciones español
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Secciones de la Página (Single Page, scroll-based)

La página es un **single-page** con navegación por anclas. Cada sección scrollea suavemente a la siguiente.

### 4.1 Navbar
- Logo de Panas Flavor (versión color sobre fondo oscuro, versión negra sobre fondo claro)
- Links de navegación: Home | Gallery | Catering | Schedule | About | Contact
- **Language Switcher** (botón toggle EN/ES) visible en la esquina derecha
- Navbar sticky con efecto de transparencia que se vuelve sólido al hacer scroll
- Menú hamburguesa en mobile

### 4.2 Hero Section
- Imagen de fondo a pantalla completa (la mejor foto del food truck o de un plato estrella)
- Título principal: "Authentic Venezuelan Flavors" / "Auténticos Sabores Venezolanos"
- Subtítulo: "Catering for your next event in Raleigh & the Triangle area"
- CTA principal: **"Request Catering"** → scrollea al formulario
- CTA secundario: **"See Our Menu"** → scrollea a CateringMenu

### 4.3 Gallery (Fotos y Videos)
- Grid responsive de fotos de comida y del food truck
- Lightbox al hacer click en cada imagen (ampliación con navegación prev/next)
- Espacio reservado para videos embebidos (Instagram reels o YouTube) — por ahora placeholder si no hay videos subidos
- Layout sugerido: 3 columnas en desktop, 2 en tablet, 1 en mobile
- Efecto masonry o grid uniforme con aspect-ratio consistente

### 4.4 Catering Menu & Experiencias Pasadas
Esta sección se divide en dos subsecciones:

**A) Menú de Catering**
- Texto explicativo: "Our catering is fully customized for your event. Tell us what you need, and we'll create the perfect menu for you."
- Lista visual de categorías generales de comida que ofrecen (con foto representativa de cada una):
  - Arepas
  - Tequeños
  - Empanadas
  - Cachapas
  - Bowls
  - Postres
  - Bebidas
- **NOTA:** No hay precios fijos. Cada ítem muestra una breve descripción y la leyenda "Custom pricing based on your event" / "Precio personalizado según tu evento"
- CTA: "Request a Quote" → scrollea al formulario

**B) Experiencias Pasadas**
- Galería/carrusel de fotos de eventos de catering anteriores
- Opcionalmente: testimoniales cortos de clientes (si Carlos los provee después)
- Mostrar tipos de eventos atendidos: "Breweries · Festivals · Corporate Events · Private Parties · Schools"

### 4.5 Catering Request Form (Formulario de Solicitud)
- Título: "Book Your Event" / "Reserva Tu Evento"
- Campos del formulario:

| Campo                | Tipo         | Requerido | Notas                                      |
|----------------------|--------------|-----------|---------------------------------------------|
| Nombre completo      | text         | Sí        |                                              |
| Email                | email        | Sí        |                                              |
| Teléfono             | tel          | Sí        |                                              |
| Fecha deseada        | date picker  | Sí        | Componente de calendario visual             |
| Fecha alternativa    | date picker  | No        | Segunda opción de fecha                     |
| Tipo de evento       | select       | Sí        | Opciones: Corporate, Private Party, Wedding, Festival, School, Brewery, Other |
| Número de invitados  | number       | Sí        | Con rango estimado (ej: 20-50, 50-100, 100+) |
| Ubicación del evento | text         | Sí        | Dirección o nombre del venue                |
| Detalles adicionales | textarea     | No        | Preferencias de menú, alergias, etc.        |
| ¿Cómo nos encontraste? | select    | No        | Instagram, Facebook, Google, Referral, Other |

- Botón de envío: "Send Request" / "Enviar Solicitud"
- Al enviar: el formulario se procesa vía API Route (`/api/catering-request`) que usa **Resend** para enviar un correo formateado al email de Carlos
- Feedback visual: spinner durante envío, mensaje de éxito/error después
- Validación client-side con mensajes en el idioma seleccionado

### 4.6 Schedule / Disponibilidad
- Calendario visual (vista mensual) que muestra disponibilidad
- **Versión inicial (MVP):** Calendario estático embebido desde Google Calendar público, o componente de calendario que muestra las fechas del mes actual y siguiente
- Las fechas se muestran como disponibles por defecto (ya que Carlos prefiere recibir todas las solicitudes y decidir manualmente)
- Texto acompañante: "Check our availability and request your date" / "Consulta nuestra disponibilidad y solicita tu fecha"
- CTA debajo del calendario: "Request This Date" → scrollea al formulario
- **Nota para evolución futura:** Cuando se implemente el mini-dashboard, este calendario se alimentará dinámicamente de las fechas confirmadas y bloqueará automáticamente las no disponibles

### 4.7 About Us
- Historia de Carlos y Panas Flavor (contenido ya provisto en el PDF adjunto)
- Usar la versión en el idioma correspondiente (EN o ES según selección del usuario)
- Foto de Carlos y/o del equipo junto al food truck
- Tono cálido y personal, mantener la narrativa original
- Mencionar la apertura del segundo food truck (febrero 2026)

### 4.8 Footer
- Logo
- Links de navegación repetidos
- Redes sociales: Instagram (@PanasFlavor), Facebook (@PanasFlavor)
- Dirección general: "Raleigh, NC & the Triangle Area"
- Copyright: "© 2026 Panas Flavor. All rights reserved."
- Link a política de privacidad (placeholder por ahora)

---

## 5. Sistema de Internacionalización (i18n)

### Configuración con `next-intl`
- Locales soportados: `en`, `es`
- Locale por defecto: `en`
- Detección automática por browser con opción de cambio manual
- URL structure: `/en/...` y `/es/...`
- Todos los textos visibles deben estar en los archivos de traducción (`messages/en.json`, `messages/es.json`)
- El About Us tiene contenido diferente por idioma (no es una traducción literal, sino versiones adaptadas — ambas ya están en el PDF)

### Estructura de archivos de traducción

```json
// messages/en.json (ejemplo parcial)
{
  "nav": {
    "home": "Home",
    "gallery": "Gallery",
    "catering": "Catering",
    "schedule": "Schedule",
    "about": "About Us",
    "contact": "Contact"
  },
  "hero": {
    "title": "Authentic Venezuelan Flavors",
    "subtitle": "Catering for your next event in Raleigh & the Triangle area",
    "cta_primary": "Request Catering",
    "cta_secondary": "See Our Menu"
  },
  "catering_form": {
    "title": "Book Your Event",
    "name": "Full Name",
    "email": "Email",
    "phone": "Phone",
    "date": "Preferred Date",
    "alt_date": "Alternative Date",
    "event_type": "Event Type",
    "guests": "Number of Guests",
    "location": "Event Location",
    "details": "Additional Details",
    "how_found": "How did you find us?",
    "submit": "Send Request",
    "success": "Your request has been sent! We'll get back to you within 24 hours.",
    "error": "Something went wrong. Please try again or email us directly."
  }
}
```

---

## 6. API Route — Catering Request (Resend)

### Endpoint: `POST /api/catering-request`

```typescript
// src/app/api/catering-request/route.ts

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      preferredDate,
      alternativeDate,
      eventType,
      guests,
      location,
      details,
      howFound,
    } = body;

    // Validación server-side básica
    if (!name || !email || !phone || !preferredDate || !eventType || !guests || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Enviar correo a Carlos
    await resend.emails.send({
      from: 'Panas Flavor Website <onboarding@resend.dev>',
      to: ['bjcdevelop@gmail.com'],
      replyTo: email,
      subject: `🔥 New Catering Request — ${eventType} on ${preferredDate}`,
      html: `
        <h2>New Catering Request from panasflavor.com</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Preferred Date:</strong></td><td>${preferredDate}</td></tr>
          <tr><td><strong>Alternative Date:</strong></td><td>${alternativeDate || 'N/A'}</td></tr>
          <tr><td><strong>Event Type:</strong></td><td>${eventType}</td></tr>
          <tr><td><strong>Guests:</strong></td><td>${guests}</td></tr>
          <tr><td><strong>Location:</strong></td><td>${location}</td></tr>
          <tr><td><strong>Details:</strong></td><td>${details || 'N/A'}</td></tr>
          <tr><td><strong>How Found Us:</strong></td><td>${howFound || 'N/A'}</td></tr>
        </table>
      `,
    });

    // Enviar confirmación al cliente
    await resend.emails.send({
      from: 'Panas Flavor <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your catering request! — Panas Flavor',
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We received your catering request for <strong>${preferredDate}</strong>.</p>
        <p>Our team will review the details and get back to you within 24 hours.</p>
        <p>If you have any urgent questions, feel free to DM us on Instagram: 
           <a href="https://instagram.com/PanasFlavor">@PanasFlavor</a></p>
        <br/>
        <p>— The Panas Flavor Team 🇻🇪</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Catering request error:', error);
    return NextResponse.json(
      { error: 'Failed to send request' },
      { status: 500 }
    );
  }
}
```

### Variables de entorno necesarias (.env.local)

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### Configuración de Resend
1. Ir a resend.com/domains
2. Agregar y verificar el dominio `panasflavor.com` (agregar registros DNS de verificación)
3. Una vez verificado, los correos se enviarán desde `catering@panasflavor.com`
4. Mientras tanto, para desarrollo, usar el dominio de prueba de Resend

---

## 7. Sistema de Reservas — Diseño Actual y Evolución

### Fase 1: MVP (Implementar ahora)

El sistema de reservas funciona así:

1. El usuario ve el **calendario visual** en la sección Schedule (todas las fechas aparecen como disponibles)
2. El usuario hace click en una fecha o scrollea al **formulario de catering**
3. Llena el formulario y lo envía
4. **Resend** envía un correo a Carlos con todos los detalles
5. **Resend** envía un correo de confirmación automática al cliente
6. Carlos revisa el correo y contacta al cliente para confirmar, negociar menú y precio
7. La gestión es 100% manual por ahora

### Fase 2: Mini-Dashboard (Implementar después)

Cuando se quiera evolucionar el sistema, este sería el plan para un mini-dashboard de administración:

**Stack adicional:**
- **Sanity CMS** o **Supabase** como backend/base de datos
- Ruta protegida `/admin` con autenticación básica (NextAuth o Clerk)

**Funcionalidades del dashboard:**
1. **Lista de solicitudes:** Ver todas las solicitudes de catering entrantes con status (Pending, Confirmed, Declined, Completed)
2. **Calendario admin:** Vista de calendario donde Carlos puede ver todas las solicitudes y confirmar/rechazar
3. **Bloqueo de fechas:** Al confirmar un evento, la fecha se marca como "Reserved" y aparece bloqueada en el calendario público de la landing
4. **Gestión de menú:** Editar ítems del menú de catering, subir fotos, cambiar descripciones
5. **Galería admin:** Subir y organizar fotos de nuevos eventos
6. **Notas internas:** Campo de notas por solicitud para seguimiento

**Flujo mejorado:**
1. Cliente envía solicitud → se guarda en base de datos + correo a Carlos
2. Carlos abre `/admin` → ve solicitud nueva → la revisa
3. Carlos confirma → fecha se bloquea automáticamente en calendario público
4. Cliente recibe correo de confirmación con detalles finales

---

## 8. Diseño y UX

### Paleta de Colores (sugerida, adaptar según branding real)
- Usar los colores del logo de Panas Flavor como base
- Si el logo usa rojo/amarillo/negro (colores típicos venezolanos), trabajar con:
  - **Primario:** Color dominante del logo
  - **Secundario:** Color de acento del logo
  - **Fondo:** Tonos neutros (blanco, crema, gris muy claro)
  - **Texto:** Negro/gris oscuro para legibilidad
  - **Acentos:** Dorado o amarillo para CTAs

### Tipografía
- Heading: Una fuente bold y con personalidad (ej: Montserrat, Poppins, o la que use la marca)
- Body: Fuente limpia y legible (ej: Inter, Open Sans)
- Importar desde Google Fonts via `next/font`

### Principios de UX
- Mobile-first design (la mayoría del tráfico vendrá de Instagram → mobile)
- Scroll suave entre secciones
- Lazy loading de imágenes
- Formulario accesible (labels, aria attributes, tab navigation)
- Feedback visual inmediato en interacciones (hover states, loading states, success/error)
- Imágenes optimizadas con `next/image` (WebP automático, responsive sizes)

### Responsive Breakpoints
- Mobile: < 640px (1 columna)
- Tablet: 640px - 1024px (2 columnas)
- Desktop: > 1024px (3+ columnas según sección)

---

## 9. SEO y Performance

### Meta Tags
- Title: "Panas Flavor | Venezuelan Food Truck & Catering in Raleigh, NC"
- Description: "Authentic Venezuelan catering for events in Raleigh and the Triangle area. Arepas, tequeños, empanadas & more. Request a quote today!"
- Open Graph tags para compartir en redes sociales
- Implementar con `metadata` de Next.js App Router

### Performance
- Usar `next/image` para todas las imágenes
- Implementar lazy loading en la galería
- Minimizar JavaScript del cliente
- Score objetivo: 90+ en Lighthouse (mobile y desktop)

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Panas Flavor",
  "description": "Venezuelan food truck and catering service in Raleigh, NC",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Raleigh",
    "addressRegion": "NC",
    "addressCountry": "US"
  },
  "servesCuisine": "Venezuelan",
  "url": "https://panasflavor.com",
  "sameAs": [
    "https://instagram.com/PanasFlavor",
    "https://facebook.com/PanasFlavor"
  ]
}
```

---

## 10. Deploy en Vercel

### Pasos
1. Push del repo a GitHub
2. Conectar repo con Vercel
3. Configurar variables de entorno en Vercel:
   - `RESEND_API_KEY`
4. Configurar dominio `panasflavor.com`:
   - En Vercel: Settings → Domains → Add `panasflavor.com`
   - En el registrador del dominio: Apuntar nameservers a Vercel o agregar registros A/CNAME según instrucciones de Vercel
5. Habilitar HTTPS (automático en Vercel)

---

## 11. Instrucciones para Claude Code

### Orden de ejecución sugerido

```
Paso 1: Inicializar proyecto
  → npx create-next-app@latest panas-flavor --typescript --tailwind --app --src-dir
  → cd panas-flavor
  → npm install next-intl resend framer-motion react-day-picker date-fns lucide-react

Paso 2: Configurar i18n
  → Configurar next-intl con App Router
  → Crear archivos de mensajes en.json y es.json
  → Configurar middleware para detección de locale
  → Crear LanguageSwitcher component

Paso 3: Crear layout base
  → Navbar con navegación por anclas y language switcher
  → Footer con redes sociales y links
  → Layout responsive con Tailwind

Paso 4: Construir secciones (en orden)
  → Hero con imagen de fondo y CTAs
  → Gallery con grid de imágenes y lightbox
  → CateringMenu con categorías y galería de experiencias
  → CateringForm con todos los campos y validación
  → Schedule con calendario visual
  → About Us con contenido bilingüe
  → Contact integrado en footer

Paso 5: Implementar API Route
  → /api/catering-request con Resend
  → Validación server-side
  → Correo a Carlos + confirmación al cliente

Paso 6: Optimización
  → SEO meta tags y structured data
  → Optimización de imágenes
  → Pruebas de responsive
  → Lighthouse audit

Paso 7: Deploy
  → Push a GitHub
  → Conectar con Vercel
  → Configurar env vars
  → Conectar dominio
```

### Assets necesarios
- Copiar las ~21 fotos a `public/images/gallery/`
- Copiar logos a `public/images/logo-color.png` y `public/images/logo-black.png`
- Optimizar imágenes antes de subir (max 1920px wide, formato WebP preferido)

---

## 12. Notas Finales

- **Contenido del About Us:** Ya está provisto en español e inglés en el PDF adjunto. Usar tal cual, adaptando formato para la web.
- **Videos:** Por ahora no hay videos. Dejar espacio preparado en la galería para embeber videos de Instagram/YouTube cuando estén disponibles.
- **Google Calendar:** Para la Fase 1, el calendario es visual y estático (no conectado a Google Calendar). El link a Google Calendar se puede agregar como un botón "Add to Calendar" cuando el cliente confirme una fecha (por correo). En la Fase 2, se conectaría dinámicamente.
- **Rate limiting:** Implementar rate limiting básico en la API route de catering para evitar spam (ej: máximo 5 solicitudes por IP por hora).
- **Honeypot field:** Agregar un campo oculto en el formulario como protección anti-bot básica.
- **Email de destino:** Configurado a `bjcdevelop@gmail.com`. Cuando se verifique el dominio en Resend, cambiar el `from` de `onboarding@resend.dev` a `catering@panasflavor.com`.
