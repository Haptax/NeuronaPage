// src/components/Contact.jsx
import { useState, useEffect } from "react";
import { Send, Calendar, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import NeuronIA from "../assets/christal-avatar.jpg";

// ⚙️ Config del Webhook (cambia VITE_N8N_WEBHOOK_URL en .env si querés)
const WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  "http://3.134.22.156:5678/webhook/contacto";

export default function Contact() {
  const { t } = useTranslation();

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState(() => [
    { type: "bot", message: t("contact.chat.initialMessage", "¡Hola! ¿En qué puedo ayudarte?") },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showChat ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showChat]);

  // Actualizar el mensaje inicial si cambia el idioma
  useEffect(() => {
    setMessages([{ type: "bot", message: t("contact.chat.initialMessage", "¡Hola! ¿En qué puedo ayudarte?") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const openCalendly = () => {
    window.open("https://calendly.com/alvaro-quiroga-tw/30min", "_blank");
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      t("contact.methods.whatsapp.message", "Hola, me gustaría recibir más información 🤖")
    );
    window.open(`https://wa.me/56942983302?text=${message}`, "_blank");
  };

  const startVoiceRecognition = () => setIsListening(true);
  const stopVoiceRecognition = () => setIsListening(false);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { type: "user", message: inputMessage },
      { type: "bot", message: t("contact.chat.botResponse", "Gracias por tu mensaje. Un asesor te responderá pronto.") },
    ]);
    setInputMessage("");
  };

  return (
    <section id="contacto" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Título y descripción */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{t("contact.title", "Contacto")}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 mt-4 max-w-3xl mx-auto">
            {t("contact.description", "Escribinos y conectamos tu proyecto con automatizaciones inteligentes.")}
          </p>
        </div>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {/* AI Assistant Card */}
          <div className="w-full">
            <div className="bg-gradient-to-b from-[#0E1525] to-[#1C2333] rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row">
                {/* Columna izquierda */}
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
                    <span className="text-white/70 text-sm">
                      {t("contact.chat.status", "Disponible ahora")}
                    </span>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="w-full md:w-[70%] p-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-semibold text-white mb-3">
                      {t("contact.chat.title", "Asistente IA")}
                    </h3>
                    <p className="text-base text-white/70">
                      {t("contact.chat.description", "Consultas rápidas y orientación inicial en tiempo real.")}
                    </p>
                  </div>

                  {/* Mensajes */}
                  <div className="bg-[#1C2333]/50 rounded-xl p-4 mb-6 max-h-[300px] overflow-y-auto">
                    <div className="flex flex-col space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                        >
                          {message.type === "bot" && (
                            <img
                              src={NeuronIA}
                              alt="NeuronIA"
                              className="w-8 h-8 rounded-full border border-blue-500/30"
                            />
                          )}
                          <div
                            className={`max-w-[80%] text-white/90 text-sm ${
                              message.type === "bot" ? "bg-[#0E1525]/80" : "bg-blue-600"
                            } rounded-2xl px-4 py-2`}
                          >
                            {message.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="relative">
                    <div className="bg-[#1C2333]/80 rounded-xl flex items-center px-4">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder={t("contact.chat.inputPlaceholder", "Escribí tu mensaje...")}
                        className="w-full bg-transparent text-white py-4 focus:outline-none text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={startVoiceRecognition}
                          aria-label="Iniciar dictado"
                          className={`p-2 rounded-lg transition-all ${
                            isListening ? "text-red-500" : "text-white/60 hover:text-white"
                          }`}
                        >
                          {/* mic icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                          </svg>
                        </button>
                        <button
                          onClick={sendMessage}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition-all"
                          aria-label="Enviar"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>

                    {isListening && (
                      <div className="absolute -bottom-24 left-0 right-0 bg-[#1C2333] rounded-lg p-4 text-center">
                        <div className="flex justify-center items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-4 bg-blue-500 animate-pulse"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            />
                          ))}
                        </div>
                        <p className="text-white/80 text-sm">
                          {t("contact.chat.listening.status", "Escuchando...")}
                        </p>
                        <button
                          onClick={stopVoiceRecognition}
                          className="text-white/60 text-sm hover:text-white mt-2"
                        >
                          {t("contact.chat.listening.stop", "Detener")}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-6 mt-8">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span>{t("contact.chat.features.accurate", "Preciso")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span>{t("contact.chat.features.secure", "Seguro")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{t("contact.chat.features.available", "Disponible")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form → envía directo al Webhook de n8n */}
          <div className="w-full">
            <div className="product-card-glow bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                {t("contact.form.title", "Envíanos tu mensaje")}
              </h3>
              <p className="text-white/70 mb-6">
                {t("contact.form.subtitle", "Completá el formulario y te contactamos")}
              </p>

              <form
                action={WEBHOOK_URL}
                method="POST"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                encType="application/x-www-form-urlencoded"
              >
                {/* Honeypot anti-spam */}
                <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="col-span-1">
                  <label className="block text-sm text-white/70 mb-1">
                    {t("contact.form.name", "Nombre")}
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder={t("contact.form.namePlaceholder", "Tu nombre")}
                    className="w-full bg-[#0E1525] border border-white/10 rounded-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm text-white/70 mb-1">
                    {t("contact.form.email", "Email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t("contact.form.emailPlaceholder", "tu@email.com")}
                    className="w-full bg-[#0E1525] border border-white/10 rounded-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm text-white/70 mb-1">
                    {t("contact.form.message", "Mensaje")}
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={5}
                    placeholder={t("contact.form.messagePlaceholder", "Contanos brevemente en qué podemos ayudarte")}
                    className="w-full bg-[#0E1525] border border-white/10 rounded-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Metadatos útiles para el flujo */}
                <input type="hidden" name="origen" value="neuronawebpage-contact-section" />
                <input type="hidden" name="timestamp" defaultValue={new Date().toISOString()} />

                <div className="col-span-1 md:col-span-2 flex justify-end">
                  <button type="submit" className="btn-gradient px-6 py-3 rounded-lg text-white font-medium">
                    {t("contact.form.send", "Enviar")}
                  </button>
                </div>
              </form>

              <p className="text-xs text-white/50 mt-3">
                {t("contact.form.notice", "Al enviar aceptás nuestra política de privacidad.")}
              </p>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="product-card-glow bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {t("contact.methods.meeting.title", "Agendá una reunión")}
                  </h3>
                  <p className="text-base text-white/70 mb-4">
                    {t("contact.methods.meeting.description", "Coordinemos por videollamada")}
                  </p>
                  <button onClick={openCalendly} className="w-full btn-gradient py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                    {t("contact.methods.meeting.button", "Agendar")}
                  </button>
                </div>
              </div>

              <div className="product-card-glow bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <Mail className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {t("contact.methods.email.title", "Correo")}
                  </h3>
                  <p className="text-base text-white/70 mb-4">
                    {t("contact.methods.email.description", "Envíanos un email y te respondemos")}
                  </p>
                  <p className="text-white/90 mb-4">
                    {t("contact.methods.email.address", "hola@neuronagroup.tech")}
                  </p>
                  <button
                    onClick={() => (window.location.href = "mailto:" + t("contact.methods.email.address", "hola@neuronagroup.tech"))}
                    className="w-full bg-black/50 text-white py-2 px-4 rounded-lg border border-white/20 hover:bg-black/70 transition-all flex items-center justify-center gap-2"
                  >
                    {t("contact.methods.email.button", "Escribir email")}
                  </button>
                </div>
              </div>

              <div className="product-card-glow bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <MessageCircle className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {t("contact.methods.whatsapp.title", "WhatsApp")}
                  </h3>
                  <p className="text-base text-white/70 mb-4">
                    {t("contact.methods.whatsapp.description", "Escribinos por WhatsApp")}
                  </p>
                  <button
                    onClick={openWhatsApp}
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    {t("contact.methods.whatsapp.button", "Abrir WhatsApp")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /Contact Methods */}
        </div>
      </div>
    </section>
  );
}
