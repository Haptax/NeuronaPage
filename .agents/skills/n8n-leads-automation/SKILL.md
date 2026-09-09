---
name: n8n-leads-automation
description: >-
  Guía para interactuar, probar o modificar el flujo de automatización de leads mediante
  webhooks de n8n, agendamiento con Google Meet, persistencia en Google Sheets y LeadService.
---

# n8n Leads Automation Skill

Esta habilidad guía al agente en la arquitectura y manipulación del sistema de ingesta de leads, automatización con n8n, Google Meet, Google Sheets y el servicio `leadService.ts`.

---

## 🧭 Arquitectura del Flujo de Automatización

```
Frontend (Contact.tsx / Christal Chat)
   │
   ▼
LeadService.submitLead() [src/services/leadService.ts]
   │
   ▼ POST Webhook
n8n (Workflow en bot/My workflow.json)
   ├── Sanitización y Validación
   ├── Respuesta HTTP 202 Inmediata (sin bloquear)
   ├── Creación de Evento con Google Meet en Google Calendar
   ├── Deduplicación en Google Sheets (Hoja: Leads)
   │     ├─ Si no existe: Append fila con datos del lead
   │     └─ Si existe: Omitir o actualizar
   ├── Envío de Email de Confirmación con Meet Link
   └── En caso de error (400): Log en Hoja 'Errors'
```

---

## 📡 Estructura del Payload

### Petición enviada por el cliente (POST JSON):
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "source": "cristal-chat",
  "meeting_at": "2026-09-09T15:00:00.000Z"
}
```

### Respuesta esperada (HTTP 202):
```json
{
  "status": "accepted",
  "message": "Lead procesado exitosamente",
  "bookingUrl": "https://meet.google.com/xxx-xxxx-xxx",
  "meetingTime": "2026-09-09T15:00:00.000Z"
}
```

---

## 🔧 Archivos Clave
- **Servicio TypeScript**: [leadService.ts](file:///c:/HaptaxProjects/NeuronaPage/src/services/leadService.ts)
- **Workflow n8n JSON**: [My workflow.json](file:///c:/HaptaxProjects/NeuronaPage/bot/My%20workflow.json)
- **Documentación de n8n**: [README.md](file:///c:/HaptaxProjects/NeuronaPage/bot/README.md)

---

## 🧪 Pruebas del Servicio
Al realizar cambios en la integración:
1. Verifica que la variable `VITE_N8N_WEBHOOK_URL` esté configurada en `.env` o en las variables de entorno.
2. Comprueba que `LeadService.validateLead(lead)` cubra los casos límite de nombres y emails.
3. Asegura el manejo de timeout (`AbortController` configurado en 10s) para evitar que la UI quede congelada.
