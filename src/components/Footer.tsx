/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { School, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUp, Send } from "lucide-react";
import footerLogo from "../assets/images/regenerated_image_1780643539725.jpg";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  schoolLogo?: string;
}

export default function Footer({ onNavigate, schoolLogo = footerLogo }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      
      {/* Upper footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          
          {/* Brand/Insignia */}
          <div className="md:col-span-4 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div 
                onClick={handleScrollToTop}
                className="flex items-center gap-3 cursor-pointer group self-start"
              >
                <div className="bg-white p-1 rounded-xl transition-transform duration-300 group-hover:scale-105 border border-slate-850 w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                  <img 
                    src={schoolLogo} 
                    alt="Logo Tebaev" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">SEV • DGTEBAEV</span>
                  <span className="text-base font-display font-extrabold text-white tracking-tight -mt-0.5">
                    Tebaev Mahuixtlán
                  </span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                Formando parte activa de la comunidad de Mahuixtlán en el municipio de Coatepec, Veracruz, entregamos educación integral de excelente calidad para inspirar vidas y transformar hogares.
              </p>
            </div>

            {/* Official School Identifiers */}
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1.5 text-xs text-slate-400 mt-4 leading-relaxed">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-red-500 shrink-0" />
                <span><strong className="text-slate-350">CCT:</strong> 30ETH0627X</span>
              </div>
              <div className="pl-6">
                <span><strong className="text-slate-350">Zona Escolar:</strong> 05 - Coatepec, Veracruz</span>
              </div>
            </div>
          </div>

          {/* School Navigation Directory */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 pb-2 border-b border-slate-800">
              Directorio del Sitio
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <button onClick={() => onNavigate("inicio")} className="text-left hover:text-white transition-colors cursor-pointer">Inicio Principal</button>
              <button onClick={() => onNavigate("identidad")} className="text-left hover:text-white transition-colors cursor-pointer">Identidad y Misión</button>
              <button onClick={() => onNavigate("plan-estudios")} className="text-left hover:text-white transition-colors cursor-pointer">Syllabus Semestral</button>
              <button onClick={() => onNavigate("galeria")} className="text-left hover:text-white transition-colors cursor-pointer">Recorrido del Plantel</button>
              <button onClick={() => onNavigate("requisitos")} className="text-left hover:text-white transition-colors cursor-pointer">Pasos de Admisión</button>
              <button onClick={() => onNavigate("contacto")} className="text-left hover:text-white transition-colors cursor-pointer">Atención y Dudas</button>
            </div>
          </div>

          {/* Plantel Location Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 pb-2 border-b border-slate-800">
              Contacto y Ubicación
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5 leading-relaxed font-sans">
                <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  C. Salvador Esquer Apodaca 26, 91608 Mahuixtlán, Ver.<br />
                  <span className="text-[10px] text-red-400 font-medium block mt-1">(A un costado de las canchas deportivas estatales)</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <span>+52 228 477 6436</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <span>30eth0627x@mediasuperior.msev.gob.mx</span>
              </div>

              <div className="flex items-start gap-2.5 leading-relaxed">
                <Clock className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-350">Horario Turno Matutino:</strong><br />
                  Lunes a Viernes de 8:00 AM a 1:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Social connections & Newsletter mockup */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div className="space-y-4 font-sans focus-within:text-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 pb-2 border-b border-slate-800">
                Boletín Comunitario
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Recibe avisos oficiales, calendarización de becas Benito Juárez y convocatorias vecinales en tu buzón.
              </p>
              
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Tu correo aquí"
                    className="bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-650 w-full font-sans"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-red-650 hover:bg-red-700 text-white p-2.5 rounded-xl transition-all shrink-0 cursor-pointer flex items-center justify-center"
                    title="Suscribirse"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-400 font-semibold font-sans">
                  ✓ ¡Suscripción registrada para avisos comunitarios!
                </div>
              )}
            </div>

            {/* Back to top button */}
            <button
              onClick={handleScrollToTop}
              className="group py-2 px-3 border border-slate-800 hover:border-red-500 rounded-xl text-xs text-slate-400 hover:text-white transition-all flex items-center gap-2 self-start cursor-pointer mt-6"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>Volver Arriba</span>
            </button>
          </div>

        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="bg-slate-950 border-t border-slate-850/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} Telebachillerato de Veracruz, Plantel Mahuixtlán. Todos los derechos reservados.</span>
            <span className="block mt-1 sm:inline sm:mt-0 sm:ml-2 text-slate-600 border-l sm:border-l sm:border-slate-800 pr-2 sm:pl-2">
              Secretaría de Educación de Veracruz • SEV
            </span>
          </div>
          <div className="flex items-center gap-1.5 justify-center sm:justify-end text-slate-600 text-[10px]">
            <span>Hecho con orgullo y</span>
            <Heart className="h-3 w-3 text-red-600 fill-red-600" />
            <span>para el desarrollo rural de Veracruz</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
