/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Inquiry } from "../types";
import { TRAINING_PATHS } from "../data";
import { 
  FileText, CheckSquare, Upload, ArrowRight, User, Mail, Phone, 
  MapPin, Award, ArrowLeft, Printer, RefreshCw, Layers, Sparkles, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import defaultLogo from "../assets/images/regenerated_image_1780643533010.jpg";

interface AdmissionSectionProps {
  schoolLogo?: string;
}

export default function AdmissionSection({ schoolLogo = defaultLogo }: AdmissionSectionProps) {
  // Saved folio history state
  const [folios, setFolios] = useState<Inquiry[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<Inquiry | null>(null);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [secondarySchool, setSecondarySchool] = useState("");
  const [gpa, setGpa] = useState<number>(8.5);
  const [trainingPath, setTrainingPath] = useState("contabilidad");

  useEffect(() => {
    // Load existing folios from localStorage
    const saved = localStorage.getItem("tebaev_folios");
    if (saved) {
      try {
        setFolios(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!studentName.trim() || !parentName.trim() || !email.trim() || !phone.trim() || !secondarySchool.trim()) {
      setFormError("Por favor, completa todos los campos requeridos para continuar.");
      return;
    }

    const randomFolio = `TEB-MAH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: Inquiry = {
      id: Math.random().toString(36).substring(2),
      studentName: studentName.trim(),
      parentName: parentName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      secondarySchool: secondarySchool.trim(),
      gpa,
      trainingPath: TRAINING_PATHS.find(p => p.id === trainingPath)?.name || trainingPath,
      status: "Pendiente",
      folio: randomFolio,
      timestamp: new Date().toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updated = [newInquiry, ...folios];
    setFolios(updated);
    localStorage.setItem("tebaev_folios", JSON.stringify(updated));
    setActiveReceipt(newInquiry);

    // Reset Form Fields
    setStudentName("");
    setParentName("");
    setEmail("");
    setPhone("");
    setSecondarySchool("");
    setGpa(8.5);
    setTrainingPath("contabilidad");
  };

  const removeFolio = (id: string) => {
    const updated = folios.filter(f => f.id !== id);
    setFolios(updated);
    localStorage.setItem("tebaev_folios", JSON.stringify(updated));
    if (activeReceipt?.id === id) {
      setActiveReceipt(null);
    }
  };

  return (
    <section id="requisitos" className="py-24 bg-slate-50 text-slate-900 border-t border-gray-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-650 bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Admisión Ciclo Escolar 2026 - 2027
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-black uppercase italic tracking-tight">
            Pre-Inscripción Electrónica Directa
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500">
            Digitaliza tu información escolar para asegurar tu lugar. Completa el formulario de orientación y sube borradores de tus documentos.
          </p>
        </div>

        {/* Dynamic Display Wrapper */}
        <AnimatePresence mode="wait">
          {activeReceipt ? (
            /* Layout: Receipt View */
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto bg-white text-slate-900 rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-lg"
            >
              {/* Header inside receipt */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span className="text-xs uppercase font-mono tracking-wider text-emerald-400">Pre-Inscrito Exitosamente</span>
                  </div>
                  <button
                    onClick={() => setActiveReceipt(null)}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Volver
                  </button>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src={schoolLogo} 
                        alt="Logo Tebaev" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Ficha de Admisión Digital</h3>
                      <p className="text-xs text-slate-400 block mt-1">Telebachillerato de Veracruz "Mahuixtlán"</p>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl text-center self-start">
                    <span className="text-[9px] text-red-650 uppercase font-bold tracking-widest block font-mono">Folio Oficial</span>
                    <span className="text-base font-black font-mono text-red-600 tracking-tight mt-0.5 block">{activeReceipt.folio}</span>
                  </div>
                </div>
              </div>

              {/* Receipt Content Body */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Visual Barcode mockup */}
                <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex flex-col justify-center items-center">
                  <div className="w-full max-w-sm h-12 bg-cover bg-center bg-[repeating-linear-gradient(90deg,#000,#000_2px,#fff_2px,#fff_8px,#000_8px,#000_12px)] opacity-85"></div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 mt-1.5 font-bold">{activeReceipt.folio}</span>
                </div>

                {/* Specific details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Nombre del Aspirante</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 block">{activeReceipt.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Nombre del Tutor</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 block">{activeReceipt.parentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase font-mono">Secundaria procedencia</span>
                    <span className="text-sm font-medium text-slate-750 mt-1 block">{activeReceipt.secondarySchool} (Promedio: {activeReceipt.gpa.toFixed(1)})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Formación Elegida</span>
                    <span className="text-sm font-bold text-red-600 mt-1 block flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-red-600" />
                      {activeReceipt.trainingPath}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Contacto Directo</span>
                    <span className="text-sm text-slate-750 mt-1 block">{activeReceipt.phone} | {activeReceipt.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase font-sans">Fecha de Registro</span>
                    <span className="text-sm text-slate-750 mt-1 block">{activeReceipt.timestamp}</span>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Next Steps List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="h-4.5 w-4.5 text-red-650" />
                    Pasos Siguientes para Completar Inscripción:
                  </h4>
                  <div className="space-y-2 text-xs text-slate-500 font-sans">
                    <div className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 text-slate-700">1</span>
                      <p><strong>Imprime o guarda esta ficha</strong>. Deberás presentarla en ventanilla física del plantel Mahuixtlán.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 text-slate-700">2</span>
                      <p>Reúne tus documentos originales y copias completos organizados dentro de un <strong>folder tamaño oficio color crema</strong> para su recepción.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 text-slate-700">3</span>
                      <p>Asiste en la fecha correspondiente (Julio-Agosto) al plantel ubicado a un costado de las canchas municipales para cotejo de documentos.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons inside receipt */}
                <div className="flex gap-3 pt-4 border-t border-gray-150">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl text-center text-xs sm:text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    Imprimir Comprobante
                  </button>
                  <button
                    onClick={() => setActiveReceipt(null)}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    Nuevo Registro
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          ) : (
            /* Layout: Main Admission Form and Requirements checklist */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form panel left */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[2.5rem] border border-gray-200 shadow-sm relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

                <h3 className="text-lg font-display font-bold text-black flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-150">
                  <FileText className="h-5.5 w-5.5 text-red-600" />
                  Formulario Único de Orientación y Pre-Inscripción
                </h3>

                {formError && (
                  <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-bold">
                    ⚠️ {formError}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Student Name */}
                    <div className="space-y-2">
                      <label htmlFor="student-name" className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-400" /> Nombre del Alumno
                      </label>
                      <input
                        id="student-name"
                        type="text"
                        placeholder="Ej. Juan de la Cruz Solís"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full bg-slate-50 text-slate-950 border border-gray-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all font-sans"
                        required
                      />
                    </div>

                    {/* Parent Name */}
                    <div className="space-y-2">
                      <label htmlFor="parent-name" className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-400" /> Nombre del Tutor Legal
                      </label>
                      <input
                        id="parent-name"
                        type="text"
                        placeholder="Ej. Rogelio de la Cruz Benítez"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full bg-slate-50 text-slate-950 border border-gray-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all font-sans"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="student-email" className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> Correo Electrónico
                      </label>
                      <input
                        id="student-email"
                        type="email"
                        placeholder="Ej. tutor@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 text-slate-950 border border-gray-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all font-sans"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="student-phone" className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" /> Teléfono de Contacto
                      </label>
                      <input
                        id="student-phone"
                        type="tel"
                        placeholder="Ej. 228 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 text-slate-950 border border-gray-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all font-sans"
                        required
                      />
                    </div>
                  </div>

                  <hr className="border-gray-150" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Secondary School name */}
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="student-secondary" className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" /> Secundaria de Procedencia
                      </label>
                      <input
                        id="student-secondary"
                        type="text"
                        placeholder="Ej. Telesecundaria Mahuixtlán"
                        value={secondarySchool}
                        onChange={(e) => setSecondarySchool(e.target.value)}
                        className="w-full bg-slate-50 text-slate-950 border border-gray-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all font-sans"
                        required
                      />
                    </div>

                    {/* Secondary GPA number */}
                    <div className="space-y-2">
                      <label htmlFor="secondary-gpa" className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-slate-400" /> Promedio Obtenido
                      </label>
                      <input
                        id="secondary-gpa"
                        type="number"
                        min="6.0"
                        max="10.0"
                        step="0.1"
                        placeholder="8.5"
                        value={gpa}
                        onChange={(e) => setGpa(parseFloat(e.target.value) || 6.0)}
                        className="w-full bg-slate-50 text-slate-950 border border-gray-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Pre-select training path path */}
                  <div id="path-selection" className="space-y-3">
                    <label className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-slate-400" /> Formación para el Trabajo Recomendada
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {TRAINING_PATHS.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setTrainingPath(p.id)}
                          className={`p-3.5 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            trainingPath === p.id
                              ? "bg-red-50/50 border-red-600 text-slate-900"
                              : "bg-slate-50 border-gray-200 text-slate-500 hover:border-gray-350"
                          }`}
                        >
                          <span className="block font-bold">{p.name}</span>
                          <span className="block text-[9px] text-slate-400 mt-1 uppercase font-mono tracking-widest">{p.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center text-xs sm:text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      Generar Folio de Pre-Inscripción
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Requirement Checklist and mock files uploader right panel */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Requirements check cards */}
                <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                  <h3 className="text-base font-display font-bold text-black flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-150">
                    <CheckSquare className="h-5 w-5 text-red-600" />
                    Cotejo de Documentos Oficiales
                  </h3>

                  {/* Cream Folder Requirement Alert Box */}
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-normal font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-lg leading-none shrink-0">📁</span>
                    <div>
                      <p className="font-bold uppercase tracking-wide text-[10px] text-amber-800 mb-0.5">Formato de Entrega Obligatorio</p>
                      <p className="text-slate-600 text-xs balance">
                        Toda la documentación física se debe entregar puntualmente dentro de un <strong className="text-black">folder tamaño oficio color crema</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Certificado de Secundaria", desc: "Original y 2 copias" },
                      { label: "CURP", desc: "Impresión reciente del formato nuevo" },
                      { label: "Carta de Buena Conducta", desc: "Original de la telesecundaria o secundaria de procedencia" },
                      { label: "Grupo Sanguíneo y Certificado Médico", desc: "Expedido por institución de salud oficial" },
                      { label: "Acta de Nacimiento", desc: "Actualizada en original y 2 copias legibles" },
                      { label: "6 Fotografías Infantiles", desc: "Recientes de frente, blanco y negro o color" },
                      { label: "Comprobante de Domicilio", desc: "Reciente (recibo de luz, agua o teléfono de la región)" }
                    ].map((doc, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-xl border bg-slate-50 border-gray-200 flex items-center gap-3"
                      >
                        <div className="h-5 w-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100 text-red-600 font-bold text-xs font-mono">
                          ✓
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800">
                            {doc.label}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5 leading-relaxed font-sans">{doc.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checklist Summary */}
                  <div className="mt-6 pt-4 border-t border-gray-150 text-xs text-slate-500 leading-normal font-sans">
                    <p className="text-center font-medium text-slate-600 italic">
                      * Toda la documentación se debe entregar físicamente de forma directa en las oficinas del plantel Mahuixtlán con el personal escolar. No se requiere cargar archivos digitales por este medio.
                    </p>
                  </div>
                </div>

                {/* Local Storage Saved folios histories - contrasting dark bento card */}
                {folios.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 text-white rounded-[2rem] p-6 shadow-md">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4 flex items-center justify-between">
                      <span>Folios Registrados en el Dispositivo ({folios.length})</span>
                      <Sparkles className="h-3.5 w-3.5 text-red-500" />
                    </span>
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                      {folios.map((fol) => (
                        <div 
                          key={fol.id}
                          className="p-3 bg-slate-950 border border-slate-850 rounded-xl hover:border-slate-800 transition-all flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-red-500">{fol.folio}</span>
                              <span className="h-1 w-1 bg-slate-700 rounded-full"></span>
                              <span className="text-slate-500 font-sans font-medium text-[9px]">{fol.timestamp}</span>
                            </div>
                            <span className="block font-bold text-slate-200 mt-1 truncate max-w-44 text-sm sm:text-xs">
                              {fol.studentName}
                            </span>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => setActiveReceipt(fol)}
                              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-350 hover:text-white rounded font-bold border border-slate-800 cursor-pointer"
                              title="Detalles"
                            >
                              Ver
                            </button>
                            <button
                              onClick={() => removeFolio(fol.id)}
                              className="px-2 py-1.5 text-slate-500 hover:text-red-400 rounded font-bold cursor-pointer"
                              title="Eliminar del Dispositivo"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
