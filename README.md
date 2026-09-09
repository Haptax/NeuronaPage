# Neurona Landing Page 🚀

![Neurona Logo](./src/assets/neurona-logo.png)

Una moderna y responsiva landing page institucional para **Neurona**, diseñada con las mejores prácticas de la industria, interfaz futurista en modo oscuro, soporte multilingüe y flujos de automatización de leads con **n8n / Google Meet / Google Sheets** y **Modo Demo para Portafolio**.

---

## ✨ Características Principales

- 🌐 **Soporte Multilingüe (i18n)**: Español e Inglés con cambio de idioma en tiempo real (`i18next`).
- 🎨 **UI Moderna & Accesible**: Componentes estilizados con **Tailwind CSS**, **shadcn/ui** y primitivas de **Radix UI**.
- 💬 **Asistente Virtual & Chatbot Interactivo (Christal)**: Interfaz conversacional con soporte de reconocimiento por voz (Web Speech API).
- 📅 **Agendamiento Integrado**: Integración con **Calendly** y flujo de creación de reuniones en **Google Meet**.
- 🪄 **Modo Demo para Portafolio**: Permite a reclutadores y visitantes probar el formulario y agendamiento sin depender de infraestructura activa de backend.
- 📱 **Diseño 100% Responsivo**: Optimizado para dispositivos móviles, tablets y monitores de alta resolución.
- 📊 **Estadísticas y Métricas Animadas**: Con `react-countup` y `recharts`.
- 🤖 **Agent Skills Integrados**: Configuración para asistentes de IA en `.agents/skills/` y `AGENTS.md`.

---

## 🛠️ Tech Stack

| Categoría | Tecnologías |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Build Tool** | [Vite 5](https://vitejs.dev/) + SWC Plugin |
| **Estilos & Animaciones** | [Tailwind CSS 3](https://tailwindcss.com/), `tailwindcss-animate`, `cva`, `tailwind-merge` |
| **Componentes UI** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Enrutamiento** | [React Router DOM v6](https://reactrouter.com/) |
| **Formularios & Validación**| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Internacionalización** | [i18next](https://www.i18next.com/) + `react-i18next` |
| **Backend & Workflows** | [n8n](https://n8n.io/) Webhook Automation (`bot/My workflow.json`) |

---

## 🚀 Despliegue en 1 Clic (Vercel / Netlify)

El proyecto incluye preconfiguraciones en `vercel.json` y `public/_redirects` para soportar SPA routing sin errores 404:

### Opción 1: Vercel (Recomendado para Portafolio)
1. Conecta tu repositorio en **[vercel.com](https://vercel.com)**.
2. Vercel detectará el framework **Vite** de forma automática.
3. Haz clic en **Deploy**. ¡Listo en menos de 1 minuto!
4. *(Opcional)* Si cuentas con tu servidor n8n en línea, agrega la variable `VITE_N8N_WEBHOOK_URL` en *Settings → Environment Variables*. Si no la agregas, funcionará fluidamente en **Modo Demo Interactivo**.

Para más detalles, consulta la [Guía de Despliegue (DEPLOYMENT.md)](./DEPLOYMENT.md).

---

## 💻 Desarrollo Local

### Prerrequisitos
- **Node.js**: v18.0 o superior
- **npm** o **bun**

### Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/Haptax/NeuronaPage.git

# 2. Entrar a la carpeta
cd NeuronaPage

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 🏗️ Estructura del Proyecto

```text
NeuronaPage/
├── .agents/                      # Skills y configuraciones para Agentes de IA
│   └── skills/
│       ├── neurona-frontend/     # Guía de componentes y estándares UI
│       └── n8n-leads-automation/ # Arquitectura del flujo de automatización
├── bot/                          # Workflows y documentación de n8n
│   ├── My workflow.json          # Workflow exportado de n8n
│   └── README.md                 # Documentación del flujo de Google Meet / Sheets
├── public/                       # Favicon, manifiesto y reglas de redirección
├── src/
│   ├── assets/                   # Imágenes y logotipos
│   ├── components/               # Secciones de la landing y componentes UI (shadcn)
│   ├── hooks/                    # Custom React hooks (useToast, useLanguage, etc.)
│   ├── i18n/                     # Diccionarios de traducción (ES / EN)
│   ├── lib/                      # Utilidades compartidas (cn, utils)
│   ├── pages/                    # Vistas principales (Index, NotFound)
│   ├── services/                 # Servicios de datos (leadService.ts)
│   ├── App.tsx                   # Proveedores globales y enrutador
│   └── main.tsx                  # Punto de entrada
├── AGENTS.md                     # Directrices para agentes de IA
├── DEPLOYMENT.md                 # Guía paso a paso para despliegue en la nube
├── STACK.md                      # Análisis exhaustivo del stack tecnológico
├── vercel.json                   # Configuración de rewrites para Vercel
└── vite.config.ts                # Configuración de Vite y path aliases (@/)
```

---

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local con recarga en vivo (HMR).
- `npm run build`: Genera la compilación optimizada para producción en `dist/`.
- `npm run preview`: Previsualiza la compilación de producción localmente.
- `npm run lint`: Ejecuta ESLint para validar la calidad del código.

---

## 📄 Licencia

Este proyecto es software propietario perteneciente a Neurona. Todos los derechos reservados.
