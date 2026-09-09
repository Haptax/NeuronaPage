---
name: neurona-frontend
description: >-
  Guía para el desarrollo, modificación de componentes UI, internacionalización (i18n),
  estilos Tailwind, gestión de estado con React Query y enrutamiento en la landing page de Neurona.
---

# Neurona Frontend Development Skill

Esta habilidad proporciona el flujo de trabajo estándar y las mejores prácticas para desarrollar y modificar componentes visuales y páginas en la aplicación NeuronaPage.

---

## 🛠️ Stack Tecnológico en Frontend
- **React 18** + **TypeScript**
- **Vite** (con alias `@/` apuntando a `src/`)
- **Tailwind CSS** + `tailwindcss-animate`
- **shadcn/ui** (componentes accesibles en `src/components/ui/`)
- **react-i18next** (soporte multilingüe en `src/i18n/`)
- **React Router DOM v6** (en `src/App.tsx`)
- **TanStack React Query v5**

---

## 📋 Procedimientos Paso a Paso

### 1. Creación o Modificación de Componentes UI
1. Si necesitas un componente UI base (como botón, modal, select, etc.), verifica primero `src/components/ui/`.
2. Para nuevos componentes de sección, créalos en `src/components/` (ej. `FeatureSection.tsx`).
3. Importa utilidades mediante `@/lib/utils` usando `cn()` para clases dinámicas:
   ```tsx
   import { cn } from "@/lib/utils";
   ```

### 2. Agregar Textos e Internacionalización (i18n)
1. Nunca quemes textos en español o inglés directamente en el JSX.
2. Agrega las claves en los archivos de traducción:
   - `src/i18n/es/translation.json` (o módulo correspondiente)
   - `src/i18n/en/translation.json` (o módulo correspondiente)
3. En el componente:
   ```tsx
   import { useTranslation } from "react-i18next";
   
   export const MyComponent = () => {
     const { t } = useTranslation();
     return <h2>{t("mySection.title")}</h2>;
   };
   ```

### 3. Formularios y Validaciones
1. Define el esquema con **Zod**:
   ```tsx
   import { z } from "zod";
   import { useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";
   
   const schema = z.object({
     name: z.string().min(2, "Nombre requerido"),
     email: z.string().email("Email inválido"),
   });
   ```
2. Conecta con `react-hook-form` y los componentes de formulario de `src/components/ui/`.

---

## 🔍 Verificación
Ejecuta la validación de código antes de finalizar:
```bash
npm run lint
npm run build
```
