/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { School, Menu, X, ArrowRight, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import defaultLogo from "../assets/images/regenerated_image_1780643533010.jpg";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  schoolLogo?: string;
}

export default function Header({ onNavigate, activeSection, schoolLogo = defaultLogo }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "identidad", label: "Identidad" },
    { id: "plan-estudios", label: "Plan de Estudios" },
    { id: "galeria", label: "Instalaciones" },
    { id: "requisitos", label: "Admisiones" },
    { id: "contacto", label: "Contacto" }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className="fixed top-3 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8"
    >
      <div className={`max-w-7xl mx-auto px-6 sm:px-8 py-3.5 rounded-2xl transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border border-neutral-800 shadow-xl"
          : "bg-black/85 backdrop-blur-sm border border-neutral-900 shadow-lg"
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo & School Name */}
          <div 
            onClick={() => handleItemClick("inicio")} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-white p-1 rounded-xl transition-transform duration-350 group-hover:scale-105 border border-neutral-800 w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden shadow-md">
              <img 
                src={schoolLogo} 
                alt="Logo Tebaev" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] tracking-widest uppercase opacity-70 text-neutral-300">Telebachillerato de Veracruz</span>
              </div>
              <h1 className="text-sm sm:text-base font-display font-black tracking-tight leading-none italic uppercase text-white">
                Mahuixtlán
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "text-red-500 border-b-2 border-red-600 pb-0.5"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleItemClick("requisitos")}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xs font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer"
            >
              Inscríbete
              <GraduationCap className="h-3.5 w-3.5" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-300 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600 bg-neutral-900/50"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-neutral-950 border-b border-neutral-800/80"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-brand-red/10 text-brand-red border-l-4 border-brand-red pl-3 font-semibold"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => handleItemClick("requisitos")}
                  className="w-full bg-brand-red hover:bg-brand-red-dark text-white text-center py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-red/20"
                >
                  Iniciar Pre-Inscripción Electrónica
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
