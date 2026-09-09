# 🚀 Neurona Landing Page – Tech Stack & Arquitectura

Documento técnico completo del stack tecnológico, dependencias, patrones de diseño, flujos de integración y estrategias de despliegue del proyecto **Neurona Landing Page**.

---

## 🏗️ 1. Resumen del Stack Tecnológico

| Capa / Categoría | Tecnología | Versión | Propósito principal |
| :--- | :--- | :--- | :--- |
| **Runtime & Bundler** | [Vite](https://vitejs.dev/) | `^5.4.19` | Build tool ultrarrápido y servidor de desarrollo con HMR. |
| **Compiler Plugin** | `@vitejs/plugin-react-swc` | `^3.11.0` | Compilación de React con SWC para máxima velocidad. |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | `^5.8.3` | Tipado estático estricto y escalabilidad. |
| **Framework Core** | [React](https://react.dev/) | `^18.3.1` | Biblioteca base de interfaz de usuario. |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.17` | Utility-first CSS framework con soporte de diseño oscuro/claro. |
| **Componentes UI** | [shadcn/ui](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/) | Primitivas `^1.x` - `^2.x` | Componentes accesibles, sin estilos forzados, totalmente personalizables. |
| **Enrutamiento** | [React Router DOM](https://reactrouter.com/) | `^6.30.1` | Gestión de rutas SPA (`/`, 404, etc.) con soporte de rewrites. |
| **Gestión de Estado & Cache** | [TanStack React Query](https://tanstack.com/query) | `^5.83.0` | Manejo de peticiones asíncronas y caching en memoria. |
| **Formularios y Validación** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | `^7.61.1` / `^3.25.76` | Formularios performantes y validación de esquemas tipados. |
| **Internacionalización (i18n)** | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) | `^25.4.2` / `^15.7.2` | Soporte multilingüe en tiempo real (Español / Inglés). |
| **Animaciones & Gráficos** | `tailwindcss-animate`, `react-countup`, `recharts` | Varios | Transiciones fluidas, contadores animados y visualización de datos. |
| **Iconografía** | [Lucide React](https://lucide.dev/) | `^0.462.0` | Conjunto consistente de iconos vectoriales. |
| **Automatización & Backend** | [n8n](https://n8n.io/) Workflow | Custom Webhooks | Ingesta de leads, Google Meet, Google Sheets y confirmación por Email. |
| **Modo Demostración** | `simulateDemoLead()` en `leadService.ts` | Local | Simulación realista con agendamiento dinámico a Calendly. |

---

## 📦 2. Detalle de Dependencias Clave

### 2.1 UI & Primitivas Accesibles (Radix UI + shadcn)
- `@radix-ui/react-accordion`, `alert-dialog`, `avatar`, `checkbox`, `dialog`, `dropdown-menu`, `popover`, `select`, `tabs`, `tooltip`, etc.
- `class-variance-authority (cva)` (`^0.7.1`) y `tailwind-merge` (`^2.6.0`): Construcción dinámica y segura de clases CSS.
- `sonner` (`^1.7.4`): Notificaciones Toast modernas y fluidas.
- `embla-carousel-react` (`^8.6.0`): Carouseles táctiles y responsivos (testimonios, partners).

### 2.2 Formularios e Integración
- `react-hook-form` + `@hookform/resolvers`: Integración nativa con esquemas Zod.
- `date-fns` (`^3.6.0`) y `react-day-picker` (`^8.10.1`): Selectores de fecha para agendamiento de citas.
- `react-intersection-observer` (`^9.16.0`): Disparo de animaciones cuando los componentes entran al viewport.

### 2.3 Bot de Automatización e Ingesta de Leads (n8n & Modo Demo)
- **Servicio**: `src/services/leadService.ts`
- **Flujo**:
  1. Frontend envía `POST` al webhook con `name`, `email`, `source`, `meeting_at`.
  2. Si `VITE_N8N_WEBHOOK_URL="mock"` o el servidor no responde: se ejecuta **Modo Demo**, retornando agendamiento interactivo en Calendly en ~700ms.
  3. Si el servidor n8n está activo: sanitiza, responde `202 Accepted`, genera cita en Google Meet, deduplica en Google Sheets y envía email SMTP de confirmación.

---

## 📂 3. Estructura de Directorios

```text
NeuronaPage/
├── .agents/                      # Configuración y skills de agentes de IA
│   └── skills/                   # Antigravity Skills para desarrollo y workflows
├── bot/                          # Definición de workflows n8n y documentación
│   ├── My workflow.json          # Workflow JSON para n8n
│   ├── README.md                 # Documentación del flujo de leads
│   └── README_workflow_meet...   # Guía detallada de Google Meet + Sheets
├── public/                       # Assets estáticos y rewrites (_redirects)
├── src/
│   ├── assets/                   # Logos, imágenes y recursos estáticos
│   ├── components/               # Componentes de la interfaz
│   │   ├── ui/                   # Componentes base shadcn/ui (Button, Dialog, etc.)
│   │   ├── animations/           # Componentes de efectos visuales
│   │   ├── AIValueStreams.tsx    # Sección de flujos de valor IA
│   │   ├── About.tsx             # Sección sobre la empresa y estadísticas
│   │   ├── Clients.tsx           # Testimonios y casos de éxito
│   │   ├── Contact.tsx           # Formulario interactivo y chatbot Christal
│   │   ├── Header.tsx / Footer.tsx # Encabezado y pie de página
│   │   ├── Hero.tsx              # Sección principal de bienvenida
│   │   ├── Products.tsx          # Catálogo de productos
│   │   └── Solutions.tsx         # Soluciones y servicios
│   ├── hooks/                    # Hooks reutilizables (useToast, useLanguage, useMobile)
│   ├── i18n/                     # Configuración y diccionarios de traducción (ES / EN)
│   ├── lib/                      # Funciones utilitarias (cn, utils)
│   ├── pages/                    # Vistas principales (Index.tsx, NotFound.tsx)
│   ├── services/                 # Servicios de comunicación (leadService.ts)
│   ├── App.tsx                   # Proveedores globales, rutas y layout
│   └── main.tsx                  # Punto de entrada de la aplicación
├── AGENTS.md                     # Reglas para agentes de IA
├── DEPLOYMENT.md                 # Guía paso a paso para despliegue en Vercel / Netlify
├── STACK.md                      # Este documento
├── vercel.json                   # Configuración de rewrites SPA para Vercel
├── package.json                  # Dependencias y scripts
├── tailwind.config.ts            # Configuración de Tailwind CSS y temas
├── tsconfig.json                 # Configuración de TypeScript
└── vite.config.ts                # Configuración de Vite con alias @ -> /src
```

---

## ⚡ 4. Scripts Disponibles

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga en vivo (puerto 5173 por defecto). |
| `npm run build` | Compila TypeScript y genera el bundle optimizado para producción en `dist/`. |
| `npm run build:dev` | Compila el proyecto en modo desarrollo para depuración. |
| `npm run lint` | Ejecuta ESLint para validar calidad de código y buenas prácticas. |
| `npm run preview` | Previsualiza localmente la compilación de producción. |

---

## 🌐 5. Variables de Entorno

| Variable | Descripción | Valor por defecto / Ejemplo |
| :--- | :--- | :--- |
| `VITE_N8N_WEBHOOK_URL` | URL del Webhook de n8n o `'mock'` para demo | `'mock'` (por defecto ejecuta simulación demo para portafolios) |

---

## 📐 6. Convenciones de Código y Buenas Prácticas

1. **Imports limpios y alias**: Usar `@/components/...`, `@/lib/...`, `@/hooks/...` en lugar de rutas relativas profundas `../../`.
2. **Componentes Accesibles**: Usar componentes de `@/components/ui/` basados en Radix UI con `cva` y `cn()`.
3. **i18n siempre presente**: Los textos visibles para el usuario deben estar registrados en `src/i18n/es` y `src/i18n/en`.
4. **Validación Zod**: Todo formulario de usuario debe contar con un schema de Zod y manejo de errores mediante `react-hook-form`.
