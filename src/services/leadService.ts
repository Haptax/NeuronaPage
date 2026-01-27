// Servicio para manejar leads con el bot de n8n

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

const N8N_WEBHOOK_URL = 
  import.meta.env.VITE_N8N_WEBHOOK_URL || 
  'https://n8n.3-134-22-156.sslip.io/webhook/leads-meet-zz';

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

// ——— Envío con timeout ———
async function submitLead(lead: Lead, timeoutMs = 10000): Promise<LeadResponse> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const payload = {
      name: lead.name.trim(),
      email: lead.email.trim().toLowerCase(),
      source: lead.source || 'cristal-chat',
      meeting_at: lead.meeting_at, // ideal en ISO: new Date().toISOString()
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await safeJson(response);

    // Error HTTP
    if (!response.ok) {
      return {
        status: 'error',
        message: data?.message || `Error HTTP ${response.status}`,
      };
    }

    // ✅ Interpretar la respuesta de n8n
    return {
      status: 'accepted',
      message: data?.message || 'Lead procesado exitosamente',
      meetingLink: data?.bookingUrl || data?.meetingLink, // n8n devuelve bookingUrl
      meetingTime: data?.meetingTime,
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        status: 'error',
        message: 'Timeout al contactar el webhook. Intenta nuevamente.',
      };
    }
    console.error('Error submitting lead:', error);
    return {
      status: 'error',
      message: 'Error de conexión. Por favor, intenta nuevamente.',
    };
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
