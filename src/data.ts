/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SemesterData, TrainingPath, FAQItem } from "./types";
import galleryImg1 from "./assets/images/regenerated_image_1780643534192.jpg";
import galleryImg2 from "./assets/images/regenerated_image_1780643535939.jpg";
import galleryImg3 from "./assets/images/regenerated_image_1780643537677.jpg";
import galleryImg4 from "./assets/images/regenerated_image_1780643538274.jpg";

export const SEMESTERS_DATA: SemesterData[] = [
  {
    number: 1,
    roman: "I",
    subjects: [
      { name: "Matemáticas I", category: "Básica", hours: 5, description: "Fundamentos de álgebra, operaciones reales y representación de variables." },
      { name: "Química I", category: "Básica", hours: 4, description: "Estudio básico de la estructura atómica, enlaces y elementos químicos." },
      { name: "Metodología de la Investigación", category: "Básica", hours: 3, description: "Comprensión de técnicas y herramientas de indagación del saber." },
      { name: "Taller de Lectura y Redacción I", category: "Básica", hours: 4, description: "Habilidades gramaticales, ortografía y redacción de párrafos argumentativos." },
      { name: "Inglés I", category: "Básica", hours: 3, description: "Vocabulario básico, presente simple y expresiones de comunicación diaria." }
    ]
  },
  {
    number: 2,
    roman: "II",
    subjects: [
      { name: "Matemáticas II", category: "Básica", hours: 5, description: "Nociones fundamentales de trigonometría y desarrollo geométrico analítico." },
      { name: "Química II", category: "Básica", hours: 4, description: "Estudio de las reacciones, mezclas químicas e interacción con el entorno." },
      { name: "Taller de Lectura y Redacción II", category: "Básica", hours: 4, description: "Lectura crítica, comprensión literaria y redacción de reportes escritos." },
      { name: "Inglés II", category: "Básica", hours: 3, description: "Estudio de tiempos verbales pasados y nociones descriptivas." }
    ]
  },
  {
    number: 3,
    roman: "III",
    subjects: [
      { name: "Formación para el Trabajo I", category: "Para el Trabajo", hours: 7, description: "Especialización inicial práctica obligatoria en la rama laboral seleccionada (Contabilidad, Informática o Soldadura)." },
      { name: "Matemáticas III", category: "Básica", hours: 5, description: "Nociones básicas de geometría analítica y representación gráfica de datos." },
      { name: "Física I", category: "Básica", hours: 4, description: "Mecánica del movimiento, vectores de fuerza y leyes de la inercia física." },
      { name: "Historia de México I", category: "Básica", hours: 3, description: "Repaso comprensivo de la época precolombina y consolidación independiente de México." },
      { name: "Inglés III", category: "Básica", hours: 3, description: "Diálogos más complejos y expresiones verbales del futuro." }
    ]
  },
  {
    number: 4,
    roman: "IV",
    subjects: [
      { name: "Formación para el Trabajo II", category: "Para el Trabajo", hours: 7, description: "Consolidación de las destrezas operativas de la especialidad técnica." },
      { name: "Matemáticas IV", category: "Básica", hours: 5, description: "Funciones y representaciones de problemas lógicos aplicados." },
      { name: "Física II", category: "Básica", hours: 4, description: "Leyes básicas de la termodinámica, acústica y electromagnetismo elemental." },
      { name: "Historia de México II", category: "Básica", hours: 3, description: "Estudio del desarrollo institucional y contemporáneo del país." },
      { name: "Inglés IV", category: "Básica", hours: 3, description: "Voz pasiva y destrezas para la comprensión de textos escritos técnicos." }
    ]
  },
  {
    number: 5,
    roman: "V",
    subjects: [
      { name: "Área Propedéutica I", category: "Propedéutica", hours: 8, description: "Cursos de especialización según la rama (Físico Matemático, Económico-Administrativo, Salud o Humanidades) orientada al nivel superior." },
      { name: "Formación para el Trabajo III", category: "Para el Trabajo", hours: 7, description: "Proyectos y prácticas especializadas en el taller o laboratorio del plantel." },
      { name: "Geografía", category: "Básica", hours: 3, description: "Sistemas terrestres, atmósfera, recursos del relieve y geodemografía regional." },
      { name: "Estructura Socioeconómica de México", category: "Básica", hours: 3, description: "Estudio histórico del desarrollo productivo y los sectores de la economía nacional." }
    ]
  },
  {
    number: 6,
    roman: "VI",
    subjects: [
      { name: "Área Propedéutica II", category: "Propedéutica", hours: 8, description: "Profundización científica modular avanzada orientada a la transición universitaria exitosa." },
      { name: "Formación para el Trabajo IV", category: "Para el Trabajo", hours: 7, description: "Demostración final de aptitudes profesionales y cierre de proyectos de titulación técnica." },
      { name: "Ecología y Medio Ambiente", category: "Básica", hours: 3, description: "Ecosistemas locales del estado de Veracruz y conservación ambiental sustentable." },
      { name: "Filosofía", category: "Básica", hours: 4, description: "Origen del razonamiento lógico, corrientes éticas clásicas e historia de las ideas." }
    ]
  }
];

export const TRAINING_PATHS: TrainingPath[] = [
  {
    id: "contabilidad",
    name: "Contabilidad",
    description: "Adquiere destrezas esenciales para el registro financiero, control de ingresos/egresos, auditorías básicas y gestión de obligaciones fiscales aplicables a comercios y pymes de Mahuixtlán.",
    skills: ["Elaboración de estados financieros básicos", "Cálculo de impuestos locales", "Procesos de contabilidad básica", "Control administrativo de presupuestos"],
    icon: "Briefcase"
  },
  {
    id: "informatica",
    name: "Informática",
    description: "Domina aplicaciones de software para oficina, mantenimiento básico de computadoras y diseño de páginas web. Te prepara para proveer soporte técnico integral en la región.",
    skills: ["Diagnóstico físico y de software en equipos", "Configuración de redes de área local (LAN)", "Estructuras de hojas de cálculo dinámicas", "Administración básica de bases de datos"],
    icon: "Computer"
  },
  {
    id: "soldadura",
    name: "Soldadura",
    description: "Desarrolla habilidades industriales prácticas en técnicas de ensamble por arco eléctrico y oxicorte. Aprende la construcción de estructuras sólidas de herrería con rigurosa seguridad.",
    skills: ["Uso seguro de equipos de soldar", "Lectura de planos e instructivos técnicos", "Aplicación de cordones de soldadura calificados", "Fabricación de herrería y estructuras metálicas"],
    icon: "Hammer"
  }
];

export interface PropedeuticArea {
  id: string;
  name: string;
  description: string;
}

export const PROPEDEUTIC_AREAS: PropedeuticArea[] = [
  {
    id: "humanidades",
    name: "Humanidades",
    description: "Preparación especializada para alumnos interesados en incorporarse a licenciaturas de Derecho, Pedagogía, Sociología u otras ramas afines de las ciencias sociales en las universidades públicas."
  },
  {
    id: "salud",
    name: "Ciencias de la Salud",
    description: "Preparación orientada a aspirantes de carreras universitarias médicas u odontológicas, tales como Medicina, Enfermería, Psicología, Nutrición y áreas de salud pública de la entidad."
  },
  {
    id: "economico_administrativo",
    name: "Económico-Administrativo",
    description: "Preparación para el ingreso a licenciaturas universitarias del área administrativa, como Contaduría Pública, Administración de Empresas, Economía, Negocios o Turismo."
  },
  {
    id: "fisico_matematico",
    name: "Físico Matemático",
    description: "Preparación analítica para incorporarse a carreras profesionales de ingeniería, arquitectura, cómputo u otras ciencias exactas aplicadas."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: "General",
    question: "¿Qué es el Telebachillerato de Veracruz (TEBAEV) \"Mahuixtlán\"?",
    answer: "Es un bachillerato público estatal oficial de la SEV con clave escolar 30ETH0627X. Brinda educación en una comunidad cercana e integrada en Mahuixtlán, Coatepec. Ofrece un entorno de gran calidez humana, enfocado en preparar a los alumnos para la vida superior y profesional."
  },
  {
    category: "Costos",
    question: "¿Cuáles son los costos y qué sucede si un estudiante tiene dificultades económicas?",
    answer: "Al ser una instalación del sector público, la cuota voluntaria de cooperación colectada en el patronato se destina de manera directa a cubrir los insumos necesarios del plantel. Al ser una escuela pública inclusiva por convención comunitaria en Mahuixtlán, nadie es rechazado por motivos económicos; todos son bienvenidos y apoyados de igual manera."
  },
  {
    category: "General",
    question: "¿Cuándo se eligen las formaciones para el trabajo y las áreas para el último año?",
    answer: "Las formaciones para el trabajo (Contabilidad, Soldadura o Informática) se inician formalmente en el tercer semestre (segundo año de preparatoria), dándote herramientas laborales concretas. Asimismo, a partir del último año (3er año, semestres V y VI), te incorporas plenamente a tu área propedéutica de elección (Humanidades, Ciencias de la Salud, Económico-Administrativo o Físico Matemático)."
  }
];

export const TESTIMONIALS = [
  {
    name: "Gabriela Morales Domínguez",
    role: "Egresada (Generación 2022) - Estudiante de Medicina",
    comment: "Estudiar en el Tebaev Mahuixtlán me dio bases magníficas en Ciencias de la Salud. Gracias a las materias propedéuticas del último año, aprobé el examen de ingreso. Que seamos un grupo con excelente atención personalizada en cada aula ayudó a que los maestros resolvieran todas mis dudas.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Don Rogelio Solís",
    role: "Padre de familia en Mahuixtlán, Coatepec",
    comment: "Nuestro bachillerato de Mahuixtlán es muy familiar con más de 50 estudiantes. Esto hace que el seguimiento de los jóvenes sea muy cuidado. Con la capacitación laboral de Soldadura y las becas federales públicas, mis hijos obtuvieron habilidades y apoyos reales para progresar.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Ing. Mateo Hernández",
    role: "Egresado (Generación 2018) - Desarrollador de Software",
    comment: "La línea informática que cursé me formó para mi carrera. En el último año de Físico Matemático analizamos el área físico-matemática con excelente detalle, lo cual me facilitó la carrera de ingeniería en la universidad. ¡Altamente orgulloso de mi escuela!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const CAMPUS_STATS = [
  { label: "Comunidad Estudiantil", value: "+50", description: "Estudiantes activos que se apoyan mutuamente en un ambiente inclusivo con atención personalizada" },
  { label: "Trayectoria del Plantel", value: "25 Años", description: "Educando con orgullo veracruzano y excelencia académica comunitaria" },
  { label: "Planta de Docentes", value: "8", description: "Docentes preparados en distintas áreas para ofrecer la mejor enseñanza en cada aula" },
  { label: "Supervisión Escolar", value: "Xalapa C", description: "Región de adscripción oficial que avala y certifica los estudios del Telebachillerato" }
];

export const GALLERY_IMAGES = [
  {
    title: "Fachada y Entrada del Plantel",
    category: "Instalaciones",
    url: galleryImg1,
    description: "La calurosa entrada principal al Telebachillerato de Mahuixtlán, que recibe diariamente a nuestra comunidad de estudiantes con calidez."
  },
  {
    title: "El Mural Emblemático de la Entrada",
    category: "Identidad",
    url: galleryImg2,
    description: "Obra artística y representativa en la entrada del plantel que expresa el esfuerzo de los alumnos, la identidad regional y la superación técnica."
  },
  {
    title: "Aulas de Clase e Instrucción Directa",
    category: "Instalaciones",
    url: galleryImg3,
    description: "Salones acondicionados con bancos escolares tradicionales y pizarrones para una atención altamente personalizada en cada grupo."
  },
  {
    title: "Cancha de usos múltiples",
    category: "Instalaciones",
    url: galleryImg4,
    description: "Espacio deportivo y cívico del plantel donde se realizan juegos amistosos de voleibol, básquetbol, asambleas y proyectos de integración."
  }
];
