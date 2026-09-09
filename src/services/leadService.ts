// Servicio para manejar leads con el bot de n8n / Modo Demo

export interface Lead {
  name: string;
  email: string;
  source: string;
  meeting_at?: string; // ISO 8601 opcional
}

export interface LeadResponse {
  status: 'accepted' | 'error';
  message: string;
  meetingLink?: string;
  meetingTime?: string;
}

interface WebhookResponse {
  message?: string;
  bookingUrl?: string;
  meetingLink?: string;
  meetingTime?: string;
  ok?: boolean;
}

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'mock';

// ——— Validaciones ———
function validateName(name: string): boolean {
  return !!name && name.trim().length >= 2;
}

function validateEmail(email: string): boolean {
  const cleaned = email?.trim();
  if (!cleaned) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(cleaned);
}

function validateLead(lead: Partial<Lead>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!lead.name || !validateName(lead.name)) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }
  if (!lead.email || !validateEmail(lead.email)) {
    errors.push('Por favor, ingresa un email válido');
  }
  return { isValid: errors.length === 0, errors };
}

// ——— Helper: parseo seguro de JSON ———
async function safeJson(resp: Response): Promise<WebhookResponse> {
  const text = await resp.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: `Error parsing response: ${text}` };
  }
}

// ——— Simulación Modo Demo para Portafolio ———
async function simulateDemoLead(lead: Lead): Promise<LeadResponse> {
  // Simular latencia realista de red (700ms)
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    status: 'accepted',
    message: '¡Lead procesado exitosamente (Modo Portafolio)!',
    meetingLink: `https://calendly.com/alvaro-quiroga-tw/30min?name=${encodeURIComponent(
      lead.name.trim()
    )}&email=${encodeURIComponent(lead.email.trim())}`,
    meetingTime: lead.meeting_at || new Date().toISOString(),
  };
}

// ——— Envío con timeout y fallback a Demo ———
async function submitLead(lead: Lead, timeoutMs = 6000): Promise<LeadResponse> {
  // Si está explícitamente en modo mock o no hay URL configurada
  if (!N8N_WEBHOOK_URL || N8N_WEBHOOK_URL === 'mock') {
    return simulateDemoLead(lead);
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const payload = {
      name: lead.name.trim(),
      email: lead.email.trim().toLowerCase(),
      source: lead.source || 'cristal-chat',
      meeting_at: lead.meeting_at,
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await safeJson(response);

    if (!response.ok) {
      // Fallback a simulación demo si el backend retorna error de servidor
      console.warn('Webhook n8n no disponible. Usando fallback de demostración para portafolio.');
      return simulateDemoLead(lead);
    }

    return {
      status: 'accepted',
      message: data?.message || 'Lead procesado exitosamente',
      meetingLink: data?.bookingUrl || data?.meetingLink,
      meetingTime: data?.meetingTime,
    };
  } catch (error: unknown) {
    console.warn('Error de conexión con webhook n8n. Activando respuesta de demostración para portafolio.', error);
    // Para que el portafolio nunca quede roto si el servidor AWS está apagado
    return simulateDemoLead(lead);
  } finally {
    clearTimeout(id);
  }
}

export const LeadService = {
  submitLead,
  validateEmail,
  validateName,
  validateLead,
};
