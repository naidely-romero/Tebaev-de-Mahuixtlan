/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CurriculumSection from "./components/CurriculumSection";
import AdmissionSection from "./components/AdmissionSection";
import Footer from "./components/Footer";
import { CAMPUS_STATS, GALLERY_IMAGES } from "./data";

import { 
  Compass, ArrowRight, MessageSquare, ChevronsDown, 
  MapPin, Phone, Mail, Check, ExternalLink,
  ShieldCheck, Sprout, Milestone, Award, Users, BookOpen,
  Settings, Upload, X, Image, RefreshCw
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import defaultLogo from "./assets/images/regenerated_image_1780643533010.jpg";
import defaultHeroLogo from "./assets/images/regenerated_image_1780643533677.jpg";

const DEFAULT_LOGO = defaultLogo;
const DEFAULT_HERO_LOGO = defaultHeroLogo;

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [galleryFilter, setGalleryFilter] = useState("Todas");

  // States for customized resources (Logo & Gallery Images)
  const [schoolLogo, setSchoolLogo] = useState<string>(() => {
    return localStorage.getItem("tebaev_school_logo") || DEFAULT_LOGO;
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem("tebaev_gallery_images");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return GALLERY_IMAGES;
      }
    }
    return GALLERY_IMAGES;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen es demasiado grande. Por favor selecciona una de menos de 2 MB para guardarla correctamente.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSchoolLogo(base64);
        localStorage.setItem("tebaev_school_logo", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUrlChange = (url: string) => {
    setSchoolLogo(url);
    localStorage.setItem("tebaev_school_logo", url);
  };

  const resetLogo = () => {
    setSchoolLogo(DEFAULT_LOGO);
    localStorage.removeItem("tebaev_school_logo");
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen es demasiado grande. Por favor selecciona una de menos de 2 MB para guardarla correctamente.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const updated = galleryImages.map((img: any) => {
          if (img.title === title) {
            return { ...img, url: base64 };
          }
          return img;
        });
        setGalleryImages(updated);
        localStorage.setItem("tebaev_gallery_images", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUrlChange = (title: string, url: string) => {
    const updated = galleryImages.map((img: any) => {
      if (img.title === title) {
        return { ...img, url: url };
      }
      return img;
    });
    setGalleryImages(updated);
    localStorage.setItem("tebaev_gallery_images", JSON.stringify(updated));
  };

  const resetGalleryImage = (title: string) => {
    const original = GALLERY_IMAGES.find((img: any) => img.title === title);
    if (original) {
      const updated = galleryImages.map((img: any) => {
        if (img.title === title) {
          return { ...img, url: original.url };
        }
        return img;
      });
      setGalleryImages(updated);
      localStorage.setItem("tebaev_gallery_images", JSON.stringify(updated));
    }
  };

  // User contact request fields
  const [contactName, setContactName] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Intersection observer to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "identidad", "plan-estudios", "galeria", "requisitos", "contacto"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Filter gallery images
  const filteredGallery = galleryFilter === "Todas" 
    ? galleryImages 
    : galleryImages.filter((img: any) => img.category === galleryFilter);

  const galleryCategories = ["Todas", "Instalaciones", "Identidad"];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMsg) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName("");
      setContactMsg("");
    }, 4000);
  };

  const [zoomLevel, setZoomLevel] = useState(15);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(18, prev + 1));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(12, prev - 1));
  };

  return (
    <div id="full-app-container" className="bg-slate-100 text-slate-900 min-h-screen selection:bg-red-600 selection:text-white font-sans antialiased">
      
      {/* Scroll indicator bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div className="h-full bg-red-600 w-1/3 transition-all duration-300"></div>
      </div>

      {/* Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} schoolLogo={schoolLogo} />

      {/* 1. Hero Section */}
      <section 
        id="inicio" 
        className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-slate-100"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Main Bento Grid layout: 12 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Bento box 1: Big Main Card (col-span-8) */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-sm border border-gray-200 text-slate-900">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                {/* Pill and Location identifier */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block">
                    CCT: 30ETH0627X • SEV
                  </span>
                  <div className="flex items-center gap-2 bg-slate-50 border border-gray-205 px-3 py-1 rounded-xl shadow-inner shrink-0">
                    <img 
                      src={schoolLogo === DEFAULT_LOGO ? DEFAULT_HERO_LOGO : schoolLogo} 
                      alt="Logo Oficial Tebaev" 
                      className="w-6 h-6 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wide">Logo Oficial</span>
                  </div>
                </div>

                {/* Title & Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-display font-black tracking-tight leading-none text-black uppercase italic">
                    Educa con Orgullo y <br className="hidden sm:inline" />
                    <span className="text-red-600">
                      Sustentabilidad Regional
                    </span>
                  </h1>

                  <p className="max-w-2xl text-base sm:text-lg text-slate-500 font-sans leading-relaxed">
                    Estudia tu bachillerato en el <strong className="text-slate-900 font-extrabold">Telebachillerato de Veracruz, Plantel Mahuixtlán (Región Xalapa C)</strong>. Con <strong className="text-slate-900 font-bold">25 años de trayectoria</strong>, somos un ambiente público e inclusivo de <strong className="text-slate-900 font-bold">+50 estudiantes</strong> que cuenta con <strong className="text-slate-900 font-bold">8 docentes</strong> altamente preparados en distintas áreas para asegurar <strong className="text-slate-900 font-bold">la mejor atención en cada aula para cada estudiante</strong>. Nadie es rechazado por motivos económicos de nuestro plantel.
                  </p>
                </div>

                {/* Instant Call to Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => handleNavigate("requisitos")}
                    className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-600/10 transition-all flex items-center gap-2 cursor-pointer text-sm"
                  >
                    Pre-Inscríbete Hoy
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => handleNavigate("galeria")}
                    className="px-6 py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all cursor-pointer text-sm"
                  >
                    Conocer el Plantel
                  </button>
                </div>

                {/* Micro Stats Row in Left Card */}
                <div className="flex gap-4 pt-6 border-t border-gray-150">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-black">25</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Años de Trayectoria</span>
                  </div>
                  <div className="w-[1px] bg-gray-200 h-10 mx-2"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-black">8</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Docentes Preparados</span>
                  </div>
                  <div className="w-[1px] bg-gray-200 h-10 mx-2"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-black">+50</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Alumnos Activos</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bento box 2: Accent Right Card (col-span-4) in Brand Red */}
            <div className="lg:col-span-4 bg-red-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-red-500 rounded-full opacity-50"></div>
              
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-red-100 uppercase tracking-widest font-mono">Simulador Activo</span>
                <h3 className="text-2xl sm:text-3.5xl font-black uppercase italic mt-2 mb-4 leading-tight">
                  Proceso de<br />Admisión
                </h3>
                
                {/* Secondary badge items */}
                <div className="space-y-3 my-6">
                  <div className="bg-red-700/40 p-4 rounded-2xl border border-red-500/30 flex items-center gap-3">
                    <Compass className="h-5 w-5 text-red-100 shrink-0" />
                    <div>
                      <span className="text-[9px] text-red-200 uppercase tracking-wider block">Zona Coatepec</span>
                      <span className="text-xs font-bold text-white block">Región de Mahuixtlán</span>
                    </div>
                  </div>
                </div>

                <p className="text-red-100 text-xs sm:text-sm leading-relaxed mt-4">
                  Asegura tu lugar en una de las instituciones públicas con mayor tradición y compromiso socioeconómico de la región.
                </p>
              </div>

              <button
                onClick={() => handleNavigate("requisitos")}
                className="relative z-10 bg-black text-white w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest mt-6 cursor-pointer hover:bg-neutral-900 transition-all flex items-center justify-center gap-1"
              >
                Consultar Requisitos
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

          {/* Stats Bar Component (Campus stats) as a subgrid of Bento Cards */}
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAMPUS_STATS.map((stat, idx) => {
                // Alternating third block to act as high contrast gray-900 bento box
                const isAlternativeStyle = idx === 2;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-7 rounded-[2rem] shadow-sm flex flex-col justify-between ${
                      isAlternativeStyle
                        ? "bg-gray-900 text-white border border-gray-850"
                        : "bg-white text-slate-900 border border-gray-200"
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-bold uppercase font-mono tracking-widest ${
                        isAlternativeStyle ? "text-slate-400" : "text-slate-400"
                      }`}>{stat.label}</span>
                      <h3 className="text-3xl font-display font-black leading-tight mt-1 mb-2 uppercase italic">
                        {stat.value}
                      </h3>
                    </div>
                    <p className={`text-xs leading-relaxed font-sans ${
                      isAlternativeStyle ? "text-slate-300" : "text-slate-500"
                    }`}>
                      {stat.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Scroll down trigger indicator */}
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => handleNavigate("identidad")}
              className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer flex flex-col items-center gap-1.5"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">Explorar Plantel</span>
              <ChevronsDown className="h-4 w-4 animate-bounce text-red-600" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. Identity and Core Values Section */}
      <section id="identidad" className="py-24 bg-slate-50 text-slate-900 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section layout side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual sidebar left */}
            <div className="lg:col-span-5 flex">
              <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-sm relative overflow-hidden flex flex-col justify-between w-full">
                <div className="absolute top-0 left-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none"></div>

                <div>
                  <div className="text-red-600 font-bold font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <Milestone className="h-4.5 w-4.5" /> Misión y Compromiso
                  </div>
                  
                  <h3 className="text-2xl font-display font-black uppercase italic text-black mb-4 tracking-tight">Educación para la Comunidad</h3>
                  
                  <p className="text-sm text-slate-500 leading-relaxed font-sans mb-6">
                    Nuestra escuela florece junto a las familias cafetaleras y cañeras veracruzanas. Nos basamos en valores de inclusión, esfuerzo, arraigo regional y superación técnica para asegurar el éxito estudiantil de Veracruz.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-150">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded bg-red-50 text-red-600 shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-900">Docentes Especializados:</strong> Cuentan con títulos de licenciatura y maestría en educación para acompañarte individualmente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description list cards right */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase text-red-600 font-mono tracking-widest bg-red-50 px-3 py-1 rounded inline-block mb-2">
                  Arraigo de Mahuixtlán
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-black uppercase italic tracking-tight">
                  ¿Por qué estudiar en el TEBAEV?
                </h2>
                <p className="text-sm text-slate-500 mt-2 font-sans">
                  El Telebachillerato Veracruzano combina la cercanía de tu localidad con rigor académico académico y talleres prácticos adaptados a la fisonomía socioeconómica de Coatepec.
                </p>
              </div>

              {/* Grid of values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Beca Federal Garantizada",
                    desc: "Recibe de manera universal el estímulo Benito Juárez ($920 MXN mensuales) administrado por el gobierno para que nada frene tus metas.",
                    icon: <ShieldCheck className="h-6 w-6 text-red-600" />
                  },
                  {
                    title: "Formación Universitaria",
                    desc: "Preparación propedéutica especializada en áreas directas: Económico-Administrativo, Físico-Matemático, Humanidades y Ciencias de la Salud para orientar tu ingreso al nivel de educación superior.",
                    icon: <Users className="h-6 w-6 text-red-600" />
                  },
                  {
                    title: "Ambiente Sano e Inclusivo",
                    desc: "Ubicado en un entorno seguro de Coatepec, propiciando el sano desarrollo intelectual y de convivencia de todos los alumnos.",
                    icon: <Award className="h-6 w-6 text-red-600" />
                  }
                ].map((val, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-[2rem] border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
                    <div className="mb-3.5">{val.icon}</div>
                    <h4 className="text-base font-bold text-black mb-1.5">{val.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Curriculum Section (Imported Component) */}
      <CurriculumSection />

      {/* 4. Life and Community Dynamic Filtered Gallery */}
      <section id="galeria" className="py-24 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">Recorrido por el Campus</span>
              <h2 className="text-3xl font-display font-black text-black uppercase italic tracking-tight">Nuestro Plantel e Instalaciones</h2>
              <p className="text-sm text-slate-500 mt-2 font-sans">
                Explora de cerca la entrada principal, el mural representativo de la comunidad, las aulas acondicionadas y los talleres del Telebachillerato.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 ${
                    galleryFilter === cat
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-slate-500 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery grid with beautiful imagery cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((img) => (
                <motion.div
                  key={img.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="group bg-white rounded-[2rem] border border-gray-200 overflow-hidden shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={img.url}
                      alt={img.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-red-50/90 border border-red-200 text-[9px] uppercase font-mono font-bold tracking-widest text-red-600 px-2 py-0.5 rounded-md">
                      {img.category}
                    </div>
                  </div>

                  <div className="p-5 bg-white">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">{img.title}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-sans">{img.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 6. Admission Section (Imported Component) */}
      <AdmissionSection schoolLogo={schoolLogo !== DEFAULT_LOGO ? schoolLogo : undefined} />

      {/* 9. Contact Inquiry / Maps Section */}
      <section id="contacto" className="py-24 bg-slate-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Quick lead query form */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-red-600 tracking-widest block mb-1">
                  Atención al Alumno
                </span>
                <h3 className="text-xl font-display font-black text-black uppercase italic tracking-tight">¿Tienes dudas adicionales?</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                  Envía de manera directa tus preguntas sobre cupos, traslados o convenios, y nuestro personal directivo del plantel Mahuixtlán te llamará o escribirá un WhatsApp.
                </p>

                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] uppercase font-bold text-slate-400">Platícanos tu nombre</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Ej. Sra. Naydeli Romero"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-600 font-sans"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-msg" className="text-[10px] uppercase font-bold text-slate-400">¿Qué te gustaría preguntar?</label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      placeholder="Ej. Me interesa saber si hay cupos para taller de informática y si me cubre completamente la beca..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-650 font-sans resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Enviar Mensaje Directo
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </form>

                <AnimatePresence>
                  {contactSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold"
                    >
                      ✓ ¡Pregunta enviada en Mahuixtlán! Nos comunicaremos contigo de inmediato al correo o teléfono provisto.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Info lines of school */}
              <div className="pt-6 border-t border-gray-150 mt-6 flex flex-col sm:flex-row gap-4 justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Phone className="h-3.5 w-3.5 text-red-600" />
                  +52 228 477 6436
                </span>
                <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Mail className="h-3.5 w-3.5 text-red-600" />
                  30eth0627x@mediasuperior.msev.gob.mx
                </span>
              </div>
            </div>

            {/* Simulated Interactive Map/Geographic Location Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Ubicación del Plantel Mahuixtlán
                </span>
                
                {/* Interactive Google Map iframe */}
                <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-auto lg:h-72 rounded-2xl bg-slate-50 border border-gray-200 overflow-hidden shadow-inner">
                  <iframe 
                    title="Mapa Telebachillerato Mahuixtlán"
                    src={`https://maps.google.com/maps?q=Telebachillerato%20Mahuixtlan%20Coatepec%20Veracruz&t=&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
                    className="absolute inset-0 w-full h-full border-0 grayscale-[10%] contrast-[105%]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  ></iframe>
                  
                  {/* Zoom controls overlays */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1 z-20 shadow-md">
                    <button 
                      onClick={handleZoomIn} 
                      className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white border border-gray-200 text-sm text-slate-800 font-bold cursor-pointer font-mono flex items-center justify-center shadow-sm select-none transition-colors"
                      title="Aumentar Zoom"
                    >
                      +
                    </button>
                    <button 
                      onClick={handleZoomOut} 
                      className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white border border-gray-200 text-sm text-slate-800 font-bold cursor-pointer font-mono flex items-center justify-center shadow-sm select-none transition-colors"
                      title="Reducir Zoom"
                    >
                      -
                    </button>
                  </div>
                </div>

                <div className="space-y-2 p-4 bg-amber-50/40 rounded-xl border border-amber-200/50">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider font-sans">Dirección Oficial del Plantel</h4>
                  <p className="text-xs text-slate-800 leading-relaxed font-sans font-bold">
                    📍 C. Salvador Esquer Apodaca 26, 91608 Mahuixtlán, Ver.
                  </p>
                </div>

              </div>

              {/* Outside direct location redirect button */}
              <div className="pt-4 border-t border-gray-150 mt-6 flex items-center justify-between text-xs text-red-600 font-bold">
                <span className="text-slate-400 font-normal">Ubicación exacta en Veracruz</span>
                <a 
                  href="https://maps.app.goo.gl/ydHxPwXsVaBXsAGi9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold flex items-center gap-1 hover:text-red-700 transition-colors"
                >
                  Abrir en Google Maps 
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} schoolLogo={schoolLogo !== DEFAULT_LOGO ? schoolLogo : undefined} />



      {/* Modal interactivo de personalización de recursos */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-6 sm:p-8 text-slate-900"
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <span className="text-[10px] font-black uppercase text-red-600 tracking-wider">
                    Panel de Administración Visual
                  </span>
                  <h3 className="text-xl font-display font-black text-black uppercase italic">
                    Personalizar Fotos e Identidad
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-sans">
                    Sube tus propios archivos o pega las URLs de internet. Tus imágenes se guardarán permanentemente.
                  </p>
                </div>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full cursor-pointer transition-colors"
                  title="Cerrar Panel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Contenido del ModalScroll */}
              <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-1">
                
                {/* 1. Logotipo General */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 bg-white border border-gray-200 p-2 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm relative group">
                    <img 
                      src={schoolLogo} 
                      alt="Logo de la escuela" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-bold">
                      Vista previa
                    </div>
                  </div>

                  <div className="flex-1 space-y-3.5 w-full">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-black uppercase">Logotipo Oficial del Plantel</h4>
                      <button 
                        onClick={resetLogo}
                        className="text-[10px] text-red-600 hover:text-red-700 font-mono font-bold uppercase transition-colors"
                      >
                        Restaurar Predeterminado
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Botón de subida de archivo */}
                      <label className="flex flex-col items-center justify-center px-4 py-3 bg-white border border-gray-200 hover:border-gray-305 rounded-xl cursor-pointer text-center text-xs text-slate-700 hover:text-black transition-all shadow-sm">
                        <Upload className="h-4 w-4 text-red-500 mb-1" />
                        <span className="font-semibold block">Seleccionar archivo</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG (máx. 2MB)</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoUpload} 
                          className="hidden" 
                        />
                      </label>

                      {/* URL enlace directo */}
                      <div className="flex flex-col justify-center space-y-1.5">
                        <span className="text-[9px] uppercase font-bold text-slate-400">O ingresa enlace directo (URL web)</span>
                        <input 
                          type="text" 
                          placeholder="https://ejemplo.com/logo.png"
                          value={schoolLogo.startsWith("data:") ? "" : schoolLogo}
                          onChange={(e) => handleLogoUrlChange(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-600 font-sans shadow-sm"
                        />
                        {schoolLogo.startsWith("data:") && (
                          <span className="text-[9px] text-emerald-600 font-mono font-semibold block">✓ Archivo cargado localmente</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Fotos de la Galería de Instalaciones */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Fotos del Plantel y Edificaciones (Galería de Recorrido)
                  </h4>

                  <div className="grid grid-cols-1 gap-5">
                    {galleryImages.map((img: any, idx: number) => (
                      <div key={img.title} className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-5 items-center">
                        
                        {/* Thumbnail */}
                        <div className="w-32 h-20 bg-slate-100 rounded-xl overflow-hidden relative shrink-0 border border-gray-200 shadow-sm">
                          <img 
                            src={img.url} 
                            alt={img.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-1 right-1 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                            Foto {idx + 1}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="flex-1 w-full space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="text-sm font-bold text-slate-900 leading-tight">{img.title}</h5>
                              <p className="text-[10px] text-slate-500 mt-0.5 font-sans leading-snug">{img.description}</p>
                            </div>
                            <button 
                              onClick={() => resetGalleryImage(img.title)}
                              className="text-[9px] text-red-600 hover:text-red-700 font-mono font-bold uppercase transition-colors shrink-0"
                            >
                              Restaurar
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {/* File Upload */}
                            <label className="flex items-center gap-2 justify-center px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 rounded-xl cursor-pointer text-xs text-slate-700 hover:text-black transition-all shadow-sm">
                              <Upload className="h-4 w-4 text-red-500" />
                              <span className="font-semibold text-[11px]">Subir Archivo de Foto</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleGalleryImageUpload(e, img.title)} 
                                className="hidden" 
                              />
                            </label>

                            {/* Direct URL Inputs */}
                            <div className="flex flex-col justify-center">
                              <input 
                                type="text" 
                                placeholder="Pegar URL de la imagen aquí..."
                                value={img.url.startsWith("data:") ? "" : img.url}
                                onChange={(e) => handleGalleryImageUrlChange(img.title, e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px] text-slate-900 focus:outline-none focus:border-red-600 font-sans shadow-sm"
                              />
                              {img.url.startsWith("data:") && (
                                <span className="text-[8px] text-emerald-600 font-mono font-semibold block mt-0.5">✓ Foto cargada localmente</span>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Footer del Modal */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Secciones editables: Logo + 3 Fotos del campus.
                </span>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Listo, Guardar Cambios</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
