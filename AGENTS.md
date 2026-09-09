# 🤖 Reglas e Instrucciones para Agentes de IA – NeuronaPage

Bienvenido al repositorio **Neurona Landing Page**. Como agente de IA, sigue estrictamente las siguientes directrices al inspeccionar, modificar o ampliar este proyecto.

---

## 🎯 Objetivo del Proyecto
Este proyecto es la **landing page oficial de Neurona**, construida con **React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui**, con integración de automatización de leads en **n8n** (Google Meet + Google Sheets).

---

## 🧭 Reglas Principales de Desarrollo

### 1. 📁 Arquitectura y Componentes
- **Alias de importación**: Usa siempre `@/...` (mapeado a `src/` en `vite.config.ts` y `tsconfig.json`).
- **Componentes UI base**: Ubicados en `src/components/ui/` (primitivas de Radix UI estilizadas con Tailwind y CVA). No recrees componentes que ya existan en `ui/`.
- **Estructura Modular**: Las secciones de la landing page residen en `src/components/*.tsx` y se ensamblan en `src/pages/Index.tsx`.

### 2. 🌍 Internacionalización (i18n)
- Toda cadena de texto visible para el usuario **debe soportar inglés y español**.
- Modifica o agrega las claves correspondientes en `src/i18n/es/` y `src/i18n/en/`.
- Usa el hook `useTranslation()` de `react-i18next`.

### 3. 📝 Formularios y Validación
- Usa **`react-hook-form`** en combinación con **`zod`** y `@hookform/resolvers/zod`.
- Valida los datos antes de enviarlos a `src/services/leadService.ts`.

### 4. 🔗 Integración con n8n & Backend
- Toda interacción con el webhook de n8n debe realizarse mediante `LeadService` (`src/services/leadService.ts`).
- La URL del webhook se configura mediante la variable de entorno `VITE_N8N_WEBHOOK_URL`.
- El flujo espera un estado HTTP `202` y devuelve información de la reunión en caso de éxito.

### 5. 🎨 Estilos & Animaciones
- Usa clases utilitarias de **Tailwind CSS**.
- Mantén la coherencia con el sistema de diseño oscuro/azul tecnológico definido en `tailwind.config.ts` y `src/index.css`.
- Usa `cn(...)` de `@/lib/utils` para combinar clases condicionales.

---

## 🛠️ Comandos de Verificación
Antes de dar por completada una tarea, verifica que no haya errores de compilación o linter:
- Validar tipos y linter: `npm run lint`
- Probar build: `npm run build`
