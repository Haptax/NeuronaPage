import { useState, useEffect, useRef } from 'react';
import { Send, Calendar, Mail, MessageCircle, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NeuronIA from '../assets/christal-avatar.jpg';
import { LeadService, type Lead } from '../services/leadService';

// Tipos para Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: new() => SpeechRecognition;
    webkitSpeechRecognition: new() => SpeechRecognition;
  }
}


const Contact = () => {
  const { t } = useTranslation();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState(() => ([
    {
      type: 'bot',
      message: t('contact.chat.initialMessage')
    }
  ]));
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);
  
  // Estados para el manejo de leads
  const [isProcessingLead, setIsProcessingLead] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [leadMessage, setLeadMessage] = useState('');
  
  // Estados para recolectar información del usuario
  const [collectingInfo, setCollectingInfo] = useState<{
    step: 'idle' | 'name' | 'email' | 'confirm';
    name?: string;
    email?: string;
  }>({ step: 'idle' });

  useEffect(() => {
    if (showChat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showChat]);

  // Actualizar el mensaje inicial cuando cambie el idioma
  useEffect(() => {
    setMessages([{
      type: 'bot',
      message: t('contact.chat.initialMessage')
    }]);
  }, [t]);

  // Scroll automático al final del chat cuando se agreguen nuevos mensajes (solo el contenedor del chat)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const openCalendly = () => {
    window.open('https://calendly.com/alvaro-quiroga-tw/30min', '_blank');
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(t('contact.methods.whatsapp.message'));
    window.open(`https://wa.me/56942983302?text=${message}`, '_blank');
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz. Por favor, usa Chrome o Edge.');
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'es-ES'; // Español por defecto
      
      recognition.current.onstart = () => {
        setIsListening(true);
      };
      
      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognition.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Error de reconocimiento de voz:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert('Por favor, permite el acceso al micrófono para usar esta función.');
        }
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
      
      recognition.current.start();
    } catch (error) {
      console.error('Error al iniciar reconocimiento de voz:', error);
      alert('Error al acceder al micrófono. Verifica los permisos del navegador.');
      setIsListening(false);
    }
  };

  const stopVoiceRecognition = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsListening(false);
  };const processLead = async (name: string, email: string) => {
  setIsProcessingLead(true);
  setLeadStatus('idle');
  
  const lead: Lead = { name, email, source: 'cristal-chat' };

  const validation = LeadService.validateLead(lead);
  if (!validation.isValid) {
    setLeadStatus('error');
    setLeadMessage(validation.errors.join('. '));
    setIsProcessingLead(false);
    return;
  }

  try {
    const result = await LeadService.submitLead(lead);

    if (result.status === "accepted") {
      setLeadStatus("success");
      setLeadMessage("¡Perfecto! He registrado tu información. 📅✨");

      const bookingUrl =
        result.meetingLink ||
        `https://calendly.com/alvaro-quiroga-tw/30min?name=${encodeURIComponent(
          name
        )}&email=${encodeURIComponent(email)}`;

      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          message: `✅ ¡Listo! He procesado tu solicitud exitosamente.\n📅 Agenda tu reunión aquí: ${bookingUrl}`,
        },
      ]);

      // 👇 abre Calendly en nueva pestaña
      window.open(bookingUrl, "_blank");
    } else {
      setLeadStatus("error");
      setLeadMessage(result.message || "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.");
    }
  } catch (error) {
    console.error("Error enviando lead:", error);
    setLeadStatus("error");
    setLeadMessage("Error de conexión. Por favor, verifica tu internet e intenta nuevamente.");
  } finally {
    setIsProcessingLead(false);
    setTimeout(() => {
      setCollectingInfo({ step: "idle" });
      setLeadStatus("idle");
    }, 3000);
  }
};



  

  const handleCristalResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Si está en proceso de recolección de información
    if (collectingInfo.step === 'name') {
      const name = userMessage.trim();
      if (LeadService.validateName(name)) {
        setCollectingInfo(prev => ({ ...prev, step: 'email', name }));
        return `Perfecto, ${name}! 👤 Ahora necesito tu email para enviarte los detalles de la reunión.`;
      } else {
        return 'Por favor, ingresa un nombre válido (al menos 2 caracteres).';
      }
    }
    
    if (collectingInfo.step === 'email') {
      const email = userMessage.trim().toLowerCase();
      if (LeadService.validateEmail(email)) {
        setCollectingInfo(prev => ({ ...prev, step: 'confirm', email }));
        return `Excelente! 📧 Confirma tus datos:\n\n👤 Nombre: ${collectingInfo.name}\n📧 Email: ${email}\n\n¿Es correcto? Responde "sí" para continuar o "no" para corregir.`;
      } else {
        return 'Por favor, ingresa un email válido (ejemplo: tu@email.com).';
      }
    }
    
    if (collectingInfo.step === 'confirm') {
      if (lowerMessage.includes('sí') || lowerMessage.includes('si') || lowerMessage.includes('correcto') || lowerMessage.includes('confirmo') || lowerMessage === 'yes') {
        // Procesar el lead
        if (collectingInfo.name && collectingInfo.email) {
          processLead(collectingInfo.name, collectingInfo.email);
          return '⏳ Procesando tu información...';
        }
      } else if (lowerMessage.includes('no') || lowerMessage.includes('corregir')) {
        setCollectingInfo({ step: 'name' });
        return 'Sin problema! 🔄 Empecemos de nuevo. ¿Cuál es tu nombre completo?';
      }
      return 'Por favor, responde "sí" para confirmar o "no" para corregir tus datos.';
    }
    
    // Detectar respuestas positivas para agendar
    if (lowerMessage === 'si' || lowerMessage === 'sí' || lowerMessage === 'yes' || 
        lowerMessage === 'claro' || lowerMessage === 'perfecto' || lowerMessage === 'ok' ||
        lowerMessage.includes('me interesa') || lowerMessage.includes('quiero agendar')) {
      setCollectingInfo({ step: 'name' });
      return '¡Perfecto! Me encanta ayudarte a agendar una reunión. 📅✨\n\nPara empezar, ¿cuál es tu nombre completo?';
    }
    
    // Detectar respuestas negativas
    if (lowerMessage === 'no' || lowerMessage === 'nah' || lowerMessage === 'not now' ||
        lowerMessage.includes('no gracias') || lowerMessage.includes('ahora no') ||
        lowerMessage.includes('no quiero') || lowerMessage.includes('no me interesa')) {
      return '¡No hay problema! 😊 Estoy aquí cuando necesites información sobre nuestros servicios de IA y desarrollo. \n\n¿Hay algo específico sobre Neurona que te gustaría conocer? Por ejemplo:\n• Nuestros proyectos\n• Servicios de IA\n• Consultoría tecnológica';
    }
    
    // Detectar intención de agendar reunión (palabras clave más específicas)
    if (lowerMessage.includes('reunión') || lowerMessage.includes('reunion') || 
        lowerMessage.includes('cita') || lowerMessage.includes('meeting') || 
        lowerMessage.includes('agendar') || lowerMessage.includes('consulta') ||
        lowerMessage.includes('contacto') || lowerMessage.includes('hablar') ||
        lowerMessage.includes('llamada') || lowerMessage.includes('call')) {
      
      setCollectingInfo({ step: 'name' });
      return '¡Perfecto! Me encanta ayudarte a agendar una reunión. 📅✨\n\nPara empezar, ¿cuál es tu nombre completo?';
    }
    
    // Respuestas sobre servicios
    if (lowerMessage.includes('servicios') || lowerMessage.includes('que hacen') || 
        lowerMessage.includes('productos') || lowerMessage.includes('qué hacen') ||
        lowerMessage.includes('que ofrecen') || lowerMessage.includes('especialidad')) {
      return '🚀 En Neurona nos especializamos en:\n\n• Soluciones de IA personalizadas\n• Desarrollo de software avanzado\n• Consultoría tecnológica\n• Automatización de procesos\n• Chatbots inteligentes\n• Machine Learning\n\n¿Te interesa conocer más detalles de algún servicio específico? ¡Podemos agendar una reunión!';
    }
    
    // Respuestas sobre capacidades
    if (lowerMessage.includes('que puedes hacer') || lowerMessage.includes('qué puedes hacer') ||
        lowerMessage.includes('que sabes') || lowerMessage.includes('capacidades') ||
        lowerMessage.includes('funciones') || lowerMessage.includes('ayudar')) {
      return '🤖 ¡Puedo ayudarte con muchas cosas!\n\n• Información sobre servicios de Neurona\n• Agendar reuniones automáticamente\n• Responder preguntas sobre IA y desarrollo\n• Conectarte con nuestro equipo\n• Explicar nuestros proyectos\n\n¿Qué te interesa más? ¿O prefieres que agendemos una consulta personalizada?';
    }
    
    // Respuestas sobre proyectos
    if (lowerMessage.includes('proyectos') || lowerMessage.includes('portfolio') ||
        lowerMessage.includes('casos') || lowerMessage.includes('ejemplos') ||
        lowerMessage.includes('trabajos') || lowerMessage.includes('clientes')) {
      return '🏆 Hemos trabajado en proyectos increíbles:\n\n• Chatbots para atención al cliente\n• Sistemas de automatización\n• Plataformas de IA personalizada\n• Soluciones para finanzas, salud, educación\n\n¿Te gustaría ver casos específicos? ¡Podemos mostrarte todo en una reunión!';
    }
    
    // Saludos
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || 
        lowerMessage.includes('hello') || lowerMessage.includes('buenos') ||
        lowerMessage.includes('buenas')) {
      return '¡Hola! 👋 Soy Cristal, tu asistente virtual de Neurona. Estoy aquí para ayudarte con cualquier consulta sobre nuestros servicios de IA y desarrollo. \n\n¿Te gustaría agendar una reunión con nuestro equipo?';
    }
    
    // Respuesta por defecto más útil
    return '🤔 Entiendo. Como asistente de Neurona, puedo ayudarte con:\n\n• Información sobre nuestros servicios\n• Agendar reuniones\n• Responder dudas sobre IA\n• Conectarte con el equipo\n\n¿Hay algo específico que te interese? ¡O simplemente dime "sí" si quieres agendar una reunión!';
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    const botResponse = handleCristalResponse(userMessage);
    
    const newMessages = [
      ...messages,
      { type: 'user', message: userMessage },
      { type: 'bot', message: botResponse }
    ];
    
    setMessages(newMessages);
    setInputMessage('');
  };

  return (
    <section id="contacto" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Título y descripción */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl">
           <span className="text-gradient">{t('contact.title')}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 mt-4 max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
         {/* AI Assistant Card */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-gradient-to-b from-[#0E1525] to-[#1C2333] rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row">
                {/* Columna izquierda (30%) */}
                <div className="w-full md:w-[30%] p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/10 bg-gradient-to-b from-[#0E1525] to-[#1C2333]">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-pulse"></div>
                    <img
                      src={NeuronIA}
                      alt="NeuronIA"
                      className="w-full h-full rounded-full border-4 border-blue-500/30 object-cover"
                    />
                  </div>
                  <div className="mt-6 bg-[#1C2333]/50 rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                    <span className="text-white/70 text-sm">{t('contact.chat.status')}</span>
                  </div>
                </div>

                {/* Columna derecha (70%) */}
                <div className="w-full md:w-[70%] p-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-semibold text-white mb-3">{t('contact.chat.title')}</h3>
                    <p className="text-base text-white/70">
                      {t('contact.chat.description')}
                    </p>
                  </div>

                  <div 
                    ref={messagesContainerRef}
                    className="bg-[#1C2333]/50 rounded-xl p-4 mb-6 max-h-[300px] overflow-y-auto scroll-smooth"
                  >
                    <div className="flex flex-col space-y-4">
                      {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                          {message.type === 'bot' && (
                            <img
                              src={NeuronIA}
                              alt="NeuronIA"
                              className="w-8 h-8 rounded-full border border-blue-500/30"
                            />
                          )}
                          <div className={`max-w-[80%] text-white/90 text-sm ${message.type === 'bot' ? 'bg-[#0E1525]/80' : 'bg-blue-600'} rounded-2xl px-4 py-2 whitespace-pre-line`}>
                            {message.message}
                          </div>
                        </div>
                      ))}
                      
                      {/* Mostrar estado de procesamiento */}
                      {isProcessingLead && (
                        <div className="flex items-start gap-3">
                          <img
                            src={NeuronIA}
                            alt="NeuronIA"
                            className="w-8 h-8 rounded-full border border-blue-500/30"
                          />
                          <div className="bg-[#0E1525]/80 rounded-2xl px-4 py-2 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                            <span className="text-white/90 text-sm">Procesando tu solicitud...</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Elemento de referencia para scroll automático */}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Estado de Lead */}
                  {leadStatus !== 'idle' && (
                    <div className={`mb-4 p-3 rounded-lg border ${
                      leadStatus === 'success' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        {leadStatus === 'success' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="text-sm">{leadMessage}</span>
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <div className="bg-[#1C2333]/80 rounded-xl flex items-center px-4">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={t('contact.chat.inputPlaceholder')}
                        className="w-full bg-transparent text-white py-4 focus:outline-none text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                          className={`p-2 rounded-lg transition-all ${
                            isListening 
                              ? 'bg-red-500 text-white animate-pulse' 
                              : 'text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                          title={isListening ? 'Detener grabación' : 'Usar micrófono'}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isListening ? (
                              // Icono de parar cuando está grabando
                              <rect x="6" y="6" width="12" height="12" rx="2" />
                            ) : (
                              // Icono de micrófono cuando no está grabando
                              <>
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                              </>
                            )}
                          </svg>
                        </button>
                        <button
                          onClick={sendMessage}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition-all"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>

                    {isListening && (
                      <div className="absolute -bottom-24 left-0 right-0 bg-[#1C2333] rounded-lg p-4 text-center">
                        <div className="flex justify-center items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-1 h-4 bg-blue-500 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </div>
                        <p className="text-white/80 text-sm mb-2">{t('contact.chat.listening.status')}</p>
                        <button
                          onClick={stopVoiceRecognition}
                          className="text-white/60 text-sm hover:text-white"
                        >
                          {t('contact.chat.listening.stop')}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mt-8">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span>{t('contact.chat.features.accurate')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span>{t('contact.chat.features.secure')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{t('contact.chat.features.available')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="product-card-glow bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{t('contact.methods.meeting.title')}</h3>
                  <p className="text-base text-white/70 mb-4">{t('contact.methods.meeting.description')}</p>
                  <button onClick={openCalendly} className="w-full btn-gradient py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                    {t('contact.methods.meeting.button')}
                  </button>
                </div>
              </div>

              <div className="product-card-glow bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <Mail className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{t('contact.methods.email.title')}</h3>
                  <p className="text-base text-white/70 mb-4">{t('contact.methods.email.description')}</p>
                  <p className="text-white/90 mb-4">{t('contact.methods.email.address')}</p>
                  <button 
                    onClick={() => window.location.href = 'mailto:' + t('contact.methods.email.address')} 
                    className="w-full bg-black/50 text-white py-2 px-4 rounded-lg border border-white/20 hover:bg-black/70 transition-all flex items-center justify-center gap-2"
                  >
                    {t('contact.methods.email.button')}
                  </button>
                </div>
              </div>

              <div className="product-card-glow bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <MessageCircle className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{t('contact.methods.whatsapp.title')}</h3>
                  <p className="text-base text-white/70 mb-4">{t('contact.methods.whatsapp.description')}</p>
                  <button onClick={openWhatsApp} className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                    {t('contact.methods.whatsapp.button')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;