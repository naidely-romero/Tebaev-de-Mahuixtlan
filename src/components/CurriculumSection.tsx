/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TRAINING_PATHS, PROPEDEUTIC_AREAS } from "../data";
import { 
  BookOpen, Sprout, Monitor, Briefcase, 
  Award, HelpCircle, Hammer, 
  Calculator, Atom, Brain, HeartPulse, GraduationCap 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CurriculumSection() {
  const [activePathId, setActivePathId] = useState<string>("contabilidad");

  // Map icon name to Lucide Component
  const getPathIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="h-6 w-6 text-emerald-500" />;
      case "Computer":
        return <Monitor className="h-6 w-6 text-cyan-500" />;
      case "Briefcase":
        return <Briefcase className="h-6 w-6 text-red-600" />;
      case "Hammer":
        return <Hammer className="h-6 w-6 text-neutral-800" />;
      default:
        return <BookOpen className="h-6 w-6 text-red-600" />;
    }
  };

  const currentPath = TRAINING_PATHS.find((p) => p.id === activePathId) || TRAINING_PATHS[0];

  return (
    <section id="plan-estudios" className="py-24 bg-slate-100 text-slate-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Programa Académico de Excelencia
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-black uppercase italic tracking-tight">
            Plan de Estudios Semestral
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500">
            Diseñado para formar ciudadanos analíticos e impulsados hacia la educación superior con conocimientos técnicos valiosos desde el primer día.
          </p>
        </div>

        {/* Specialized Job Training (Formación para el Trabajo) Section */}
        <div id="capacitaciones" className="bg-white rounded-[2.5rem] border border-gray-200 p-6 sm:p-10 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-40 h-40 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center sm:text-left max-w-2xl mb-8">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded inline-block mb-2">
              Formación Práctica
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-black uppercase italic">
              Formación para el Trabajo
            </h3>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              A partir del 3er semestre (segundo año de preparatoria), elige un área de formación para el trabajo con certificación oficial para facilitar tu vinculación al empleo o desarrollo productivo regional.
            </p>
          </div>

          {/* Navigation/Selector */}
          <div className="flex flex-wrap gap-2.5 mb-8 pb-4 border-b border-gray-150">
            {TRAINING_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => setActivePathId(path.id)}
                className={`px-4 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                  activePathId === path.id
                    ? "bg-red-600 text-white border-red-600 shadow-md"
                    : "bg-slate-50 text-slate-500 hover:text-black border-gray-200 hover:border-gray-300"
                }`}
              >
                {getPathIcon(path.icon)}
                {path.name}
              </button>
            ))}
          </div>

          {/* Path Content Details with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePathId}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left detail Column: Description */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xl font-display font-extrabold text-black mb-2 flex items-center gap-2">
                    <Award className="h-5.5 w-5.5 text-red-600" />
                    Perfil Profesional en {currentPath.name}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                    {currentPath.description}
                  </p>
                </div>

                {/* Sub-block: Skills */}
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Habilidades Prácticas Desarrolladas</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPath.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-gray-200 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0"></span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right detail Column: Certificación de Competencias card */}
              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-[2rem] border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4 font-mono">
                    Vinculación y Certificación
                  </span>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white border border-gray-150 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 font-bold text-sm">
                          ✓
                        </div>
                        <h5 className="text-sm font-bold text-black font-sans">Materias Adaptables</h5>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Las asignaturas específicas se adaptan periódicamente según las necesidades del subsistema estatal y las demandas laborales para asegurar contenidos constantemente actualizados.
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-gray-150 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 font-bold text-sm">
                          ★
                        </div>
                        <h5 className="text-sm font-bold text-black font-sans">Práctica y Competencias</h5>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Enfoque práctico orientado al desarrollo de proyectos de herrería, informática básica o procesos contables aplicados a nuestro contexto local.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-3.5 bg-red-50/50 border border-red-100 rounded-xl text-xs text-red-700 leading-relaxed font-sans flex items-start gap-2.5">
                  <HelpCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
                  <p>
                    Ofrece habilidades listas para implementar de inmediato en Mahuixtlán o emprender de forma sustentable en la región veracruzana.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Áreas Propedéuticas (Último Año) Section */}
        <div id="propedeuticas" className="mt-16 bg-white rounded-[2.5rem] border border-gray-200 p-6 sm:p-10 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-650/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center sm:text-left max-w-2xl mb-10">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Último Año Académico (5º y 6º Semestre)
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-black uppercase italic tracking-tight">
              Áreas Propedéuticas de Especialización
            </h3>
            <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
              Al llegar al último año, nuestros alumnos se incorporan al área de elección que representará su perfil universitario. En cada opción se cursa la formación especializada correspondiente con el objetivo de ofrecerles la orientación y herramientas de estudio del nivel superior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPEDEUTIC_AREAS.map((area) => {
              const getAreaStyle = (areaId: string) => {
                switch (areaId) {
                  case "humanidades":
                    return {
                      icon: <Brain className="h-5 w-5 text-purple-600" />,
                      bg: "bg-purple-50/70 border-purple-100",
                    };
                  case "salud":
                    return {
                      icon: <HeartPulse className="h-5 w-5 text-rose-600" />,
                      bg: "bg-rose-50/70 border-rose-100",
                    };
                  case "economico_administrativo":
                    return {
                      icon: <Calculator className="h-5 w-5 text-emerald-600" />,
                      bg: "bg-emerald-50/70 border-emerald-100",
                    };
                  case "fisico_matematico":
                    return {
                      icon: <Atom className="h-5 w-5 text-sky-600" />,
                      bg: "bg-sky-50/70 border-sky-100",
                    };
                  default:
                    return {
                      icon: <GraduationCap className="h-5 w-5 text-slate-600" />,
                      bg: "bg-slate-50 border-slate-100",
                    };
                }
              };

              const style = getAreaStyle(area.id);

              return (
                <div 
                  key={area.id}
                  className="bg-slate-50 rounded-2xl border border-gray-200 p-5 flex flex-col justify-between hover:scale-[1.01] hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-sm group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${style.bg}`}>
                        {style.icon}
                      </div>
                      <h4 className="font-display font-black text-black uppercase italic text-sm tracking-tight leading-4">
                        {area.name}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed min-h-[64px]">
                      {area.description}
                    </p>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
