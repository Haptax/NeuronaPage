# 🚀 Guía de Despliegue y Alojamiento Gratuito

Esta guía detalla cómo desplegar la **Neurona Landing Page** en plataformas gratuitas con CDN global, SSL automático y soporte para portafolio.

---

## 🏆 Opción 1: Despliegue en Vercel (Recomendada)

Vercel es la plataforma estándar de la industria para aplicaciones construidas con **Vite + React**.

### Paso 1: Subir tus cambios a GitHub
Asegúrate de que tus últimos commits estén en la rama `main`:
```bash
git push origin main
```

### Paso 2: Importar en Vercel
1. Ingresa a **[vercel.com](https://vercel.com)** e inicia sesión con tu cuenta de GitHub.
2. En el panel principal, haz clic en **"Add New..."** → **"Project"**.
3. Selecciona tu repositorio **`NeuronaPage`** y haz clic en **"Import"**.

### Paso 3: Configuración del Proyecto
Vercel preconfigura el entorno automáticamente:
- **Framework Preset**: `Vite`
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Paso 4: Variables de Entorno (Environment Variables)
- **Para Portafolio (Modo Demo Activo)**:
  - *No necesitas agregar ninguna variable.* La aplicación detectará automáticamente el entorno y activará el **Modo Demo Interactivo** para que los formularios y agendamientos funcionen de inmediato sin errores.
- **Para Producción con n8n Activo**:
  - Si tienes tu servidor n8n encendido con el webhook listo, añade:
    - **Key**: `VITE_N8N_WEBHOOK_URL`
    - **Value**: Tu URL del webhook (ej. `https://tu-servidor-n8n.com/webhook/leads-meet-zz`)

### Paso 5: Desplegar
- Haz clic en **"Deploy"**.
- En ~45 segundos obtendrás tu URL pública permanente: `https://neurona-page.vercel.app`.

---

## 🌐 Opción 2: Despliegue en Netlify

1. Ingresa a **[netlify.com](https://www.netlify.com)** e inicia sesión con GitHub.
2. Haz clic en **"Add new site"** → **"Import an existing project"**.
3. Selecciona tu repositorio `NeuronaPage`.
4. Configuración de compilación:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. *(Opcional)* En **Environment variables**, agrega `VITE_N8N_WEBHOOK_URL`.
6. Haz clic en **"Deploy site"**. El archivo `public/_redirects` gestionará las rutas automáticamente.

---

## 🪄 ¿Cómo funciona el Modo Demo en tu Portafolio?

| Escenario | Comportamiento |
| :--- | :--- |
| **Servidor n8n apagado o sin variable** | La aplicación simula una respuesta realista en ~700ms, valida los datos, dispara los toasts de confirmación y redirige a agendamiento sin mostrar errores. |
| **Servidor n8n activo en la nube** | La aplicación envía el POST al webhook real de n8n, registra el lead en Google Sheets, crea la reunión en Google Calendar y envía el correo con Google Meet. |
