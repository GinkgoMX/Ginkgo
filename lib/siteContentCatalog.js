// Every piece of public-site text that admins can edit from /admin/contenido.
// Each slot's es/en values are the ORIGINAL texts: they are what the site shows
// until an admin saves a change (and again if the admin clears the field).
//
// To make another text editable: add a slot here, then read it in the page or
// component with `const t = await getSiteText(); t("your.key", locale)`.
export const CONTENT_GROUPS = [
  {
    id: "home-hero",
    label: "Inicio — Portada",
    slots: [
      { key: "home.hero.eyebrow", label: "Etiqueta superior", es: "Análisis · Estructura · Comercialización", en: "Analysis · Structure · Commercialization" },
      { key: "home.hero.title", label: "Título principal", es: "Oportunidades de Desarrollo Inmobiliario en México", en: "Real Estate Development Opportunities in Mexico" },
      { key: "home.hero.subtitle", label: "Subtítulo", multiline: true, es: "Identificamos, estructuramos y comercializamos oportunidades inmobiliarias para desarrolladores e inversionistas.", en: "We identify, structure, and market real estate opportunities for developers and investors." },
      { key: "home.hero.formTitle", label: "Ventana «Solicitar información» — título", es: "Solicita información", en: "Request information" },
      { key: "home.hero.formText", label: "Ventana «Solicitar información» — texto", multiline: true, es: "Cuéntanos sobre tu proyecto y un asesor se pondrá en contacto contigo.", en: "Tell us about your project and an advisor will be in touch with you." },
    ],
  },
  {
    id: "portfolio",
    label: "Portafolio (Inicio y Oportunidades)",
    slots: [
      { key: "portfolio.eyebrow", label: "Etiqueta superior", es: "Portafolio", en: "Portfolio" },
      { key: "portfolio.title", label: "Título", es: "Macrolotes y oportunidades de desarrollo", en: "Large land tracts and development opportunities" },
      { key: "portfolio.text.1", label: "Párrafo 1", multiline: true, es: "Presentamos una selección de terrenos con potencial para proyectos inmobiliarios, identificados por su ubicación, características y posibilidades de desarrollo.", en: "We present a selection of land with potential for real estate projects, identified for its location, characteristics and development possibilities." },
      { key: "portfolio.text.2", label: "Párrafo 2", multiline: true, es: "En Ginkgo analizamos cada oportunidad para ofrecer a inversionistas y desarrolladores una perspectiva más clara sobre el valor y el potencial de la tierra.", en: "At Ginkgo we analyze each opportunity to give investors and developers a clearer perspective on the value and potential of the land." },
      { key: "portfolio.button", label: "Botón (Inicio)", es: "Explorar oportunidades", en: "Explore opportunities" },
    ],
  },
  {
    id: "home-tagline",
    label: "Inicio — Frase de marca",
    slots: [
      { key: "home.tagline", label: "Frase principal", es: "No solo es tierra. Es el inicio de grandes proyectos.", en: "It's not just land. It's the beginning of great projects." },
    ],
  },
  {
    id: "home-why",
    label: "Inicio — ¿Por qué Ginkgo?",
    slots: [
      { key: "home.why.eyebrow", label: "Etiqueta superior", es: "Nuestro enfoque", en: "Our approach" },
      { key: "home.why.title", label: "Título", es: "¿Por qué Ginkgo?", en: "Why Ginkgo?" },
      { key: "home.why.1.title", label: "Punto 1 — título", es: "Análisis Estratégico", en: "Strategic Analysis" },
      { key: "home.why.1.text", label: "Punto 1 — texto", multiline: true, es: "Evaluamos el potencial urbano, conectividad, vocación y posibilidades de desarrollo para identificar oportunidades con verdadero valor.", en: "We evaluate urban potential, connectivity, land vocation, and development possibilities to identify opportunities with real value." },
      { key: "home.why.2.title", label: "Punto 2 — título", es: "Comercialización Especializada", en: "Specialized Commercialization" },
      { key: "home.why.2.text", label: "Punto 2 — texto", multiline: true, es: "Conectamos oportunidades con desarrolladores e inversionistas mediante estrategias enfocadas en proyectos de largo plazo.", en: "We connect opportunities with developers and investors through long-term, strategy-driven commercial approaches." },
      { key: "home.why.3.title", label: "Punto 3 — título", es: "Conocimiento del Mercado", en: "Market Knowledge" },
      { key: "home.why.3.text", label: "Punto 3 — texto", multiline: true, es: "Analizamos tendencias urbanas, corredores de crecimiento e infraestructura para detectar oportunidades con alto potencial.", en: "We analyze urban trends, growth corridors, and infrastructure to detect opportunities with high potential." },
      { key: "home.why.4.title", label: "Punto 4 — título", es: "Acompañamiento", en: "Guidance & Support" },
      { key: "home.why.4.text", label: "Punto 4 — texto", multiline: true, es: "Desde el primer acercamiento hasta la negociación, brindamos información técnica y comercial para facilitar la toma de decisiones.", en: "From the first contact to negotiation, we provide technical and commercial insights to support decision-making." },
    ],
  },
  {
    id: "home-process",
    label: "Inicio — Nuestro proceso",
    slots: [
      { key: "home.process.eyebrow", label: "Etiqueta superior", es: "Cómo trabajamos", en: "How we work" },
      { key: "home.process.title", label: "Título", es: "De la propiedad a la oportunidad", en: "From property to opportunity" },
      { key: "home.process.subtitle", label: "Subtítulo", multiline: true, es: "Un proceso estructurado para comprender cada terreno, preparar su presentación y conectar con los perfiles adecuados.", en: "A structured process to understand each property, prepare its presentation and connect it with the right profiles." },
      { key: "home.process.1", label: "Paso 1 — título", es: "Analizamos la propiedad", en: "We analyze the property" },
      { key: "home.process.1.text", label: "Paso 1 — texto", multiline: true, es: "Revisamos las características del terreno, su contexto y la información disponible para identificar sus atributos, oportunidades y aspectos clave de evaluación.", en: "We review the land's characteristics, its context and the available information to identify its attributes, opportunities and key points for evaluation." },
      { key: "home.process.2", label: "Paso 2 — título", es: "Estructuramos la oportunidad", en: "We structure the opportunity" },
      { key: "home.process.2.text", label: "Paso 2 — texto", multiline: true, es: "Organizamos la información y definimos una estrategia de presentación y comercialización acorde con las características de la propiedad.", en: "We organize the information and define a presentation and marketing strategy suited to the property's characteristics." },
      { key: "home.process.3", label: "Paso 3 — título", es: "Conectamos con los perfiles adecuados", en: "We connect with the right profiles" },
      { key: "home.process.3.text", label: "Paso 3 — texto", multiline: true, es: "Acercamos la oportunidad a inversionistas y desarrolladores cuyos objetivos puedan alinearse con las características y el potencial del terreno.", en: "We bring the opportunity to investors and developers whose goals may align with the land's characteristics and potential." },
      { key: "home.process.4", label: "Paso 4 — título", es: "Acompañamos el proceso comercial", en: "We support the commercial process" },
      { key: "home.process.4.text", label: "Paso 4 — texto", multiline: true, es: "Facilitamos el intercambio de información y damos seguimiento a las conversaciones para favorecer un proceso más claro y ordenado entre las partes.", en: "We facilitate the exchange of information and follow up on conversations to support a clearer, more orderly process between the parties." },
    ],
  },
  {
    id: "home-community",
    label: "Inicio — Comunidad",
    slots: [
      { key: "home.community.eyebrow", label: "Etiqueta superior", es: "Comunidad", en: "Community" },
      { key: "home.community.title", label: "Título", es: "Perspectivas del Mercado", en: "Market Perspectives" },
      { key: "home.community.text", label: "Texto", multiline: true, es: "Análisis, tendencias y oportunidades inmobiliarias en las regiones con mayor potencial de crecimiento.", en: "Analysis, trends and real estate opportunities in the regions with the greatest growth potential." },
      { key: "home.community.button", label: "Botón (lleva a Perspectivas)", es: "Ver perspectivas", en: "View insights" },
      { key: "home.community.instagram", label: "Enlace a Instagram — texto", es: "Síguenos en Instagram", en: "Follow us on Instagram" },
    ],
  },
  {
    id: "home-cta",
    label: "Inicio — Llamado final",
    slots: [
      { key: "home.cta.title", label: "Título", es: "Hablemos de tu próximo proyecto", en: "Let's talk about your next project" },
      { key: "home.cta.text", label: "Texto", multiline: true, es: "Cuéntanos qué tipo de desarrollo buscas y te presentaremos oportunidades alineadas con tus objetivos.", en: "Tell us what type of development you're looking for and we'll present opportunities aligned with your goals." },
    ],
  },
  {
    id: "about",
    label: "Página Nosotros",
    slots: [
      { key: "about.eyebrow", label: "Etiqueta superior", es: "Sobre Ginkgo", en: "About Ginkgo" },
      { key: "about.title", label: "Título", es: "Una visión estratégica del valor de la tierra", en: "A strategic view of land value" },
      { key: "about.intro", label: "Introducción", multiline: true, es: "Ginkgo nace de la convicción de que las oportunidades inmobiliarias requieren algo más que una ubicación atractiva: necesitan análisis, contexto y una estrategia que permita comprender su verdadero potencial.", en: "Ginkgo was born from the conviction that real estate opportunities need more than an attractive location: they need analysis, context and a strategy that reveals their true potential." },
      { key: "about.vision.1", label: "Visión — párrafo 1", multiline: true, es: "Nos especializamos en macrolotes y terrenos con posibilidades de desarrollo, trabajando para acercar a propietarios, inversionistas y desarrolladores a través de una comercialización más estructurada y enfocada.", en: "We specialize in large land tracts and land with development possibilities, bringing owners, investors and developers together through more structured, focused marketing." },
      { key: "about.vision.2", label: "Visión — párrafo 2", multiline: true, es: "Entendemos que cada propiedad tiene características, retos y posibilidades propias. Por eso, buscamos conocerla antes de presentarla, organizar la información relevante y reconocer qué perfiles podrían encontrar en ella una oportunidad alineada con sus objetivos.", en: "We understand that every property has its own characteristics, challenges and possibilities. That is why we get to know it before presenting it, organize the relevant information and recognize which profiles could find in it an opportunity aligned with their goals." },
      { key: "about.vision.3", label: "Visión — párrafo 3", multiline: true, es: "Somos una firma en crecimiento, comprometida con construir relaciones de confianza, trabajar con seriedad y desarrollar una visión de largo plazo en el mercado inmobiliario mexicano.", en: "We are a growing firm, committed to building relationships of trust, working with integrity and developing a long-term vision in the Mexican real estate market." },
      { key: "about.question", label: "Frase destacada", multiline: true, es: "En Ginkgo, cada oportunidad comienza con una buena pregunta: ¿qué puede llegar a ser esta tierra?", en: "At Ginkgo, every opportunity starts with a good question: what could this land become?" },
      { key: "about.who.eyebrow", label: "Quiénes somos — etiqueta", es: "Quiénes somos", en: "Who we are" },
      { key: "about.who.title", label: "Quiénes somos — título", es: "Más que comercializar terrenos, estructuramos oportunidades", en: "More than marketing land, we structure opportunities" },
      { key: "about.who.1", label: "Quiénes somos — párrafo 1", multiline: true, es: "En Ginkgo creemos que el valor de una propiedad no se comunica únicamente a través de su superficie o ubicación, sino también mediante una comprensión clara de sus características, contexto y posibilidades.", en: "At Ginkgo we believe a property's value isn't conveyed only through its size or location, but also through a clear understanding of its characteristics, context and possibilities." },
      { key: "about.who.2", label: "Quiénes somos — párrafo 2", multiline: true, es: "Por eso, antes de presentar una oportunidad al mercado, buscamos organizar y analizar la información relevante para reconocer sus atributos, identificar aspectos que requieren atención y definir una estrategia de comercialización acorde con su perfil.", en: "That is why, before taking an opportunity to market, we organize and analyze the relevant information to recognize its attributes, identify aspects that need attention and define a marketing strategy that fits its profile." },
      { key: "about.who.3", label: "Quiénes somos — párrafo 3", multiline: true, es: "Este proceso nos permite ofrecer una presentación más estructurada y transparente, ayudando a los interesados a comprender mejor cada oportunidad y a determinar si responde a los objetivos de su proyecto.", en: "This process lets us offer a more structured and transparent presentation, helping interested parties better understand each opportunity and determine whether it meets their project's goals." },
      { key: "about.who.commitment", label: "Quiénes somos — compromiso (en negritas)", multiline: true, es: "Nuestro compromiso es acercar oportunidades con criterio, información y una visión estratégica de largo plazo.", en: "Our commitment is to bring opportunities forward with sound judgment, information and a long-term strategic vision." },
    ],
  },
  {
    id: "services",
    label: "Página Servicios",
    slots: [
      { key: "services.eyebrow", label: "Etiqueta superior", es: "Nuestros servicios", en: "Our services" },
      { key: "services.title", label: "Título", es: "Convertimos tierra en oportunidades estratégicas", en: "We turn land into strategic opportunities" },
      { key: "services.intro", label: "Introducción", multiline: true, es: "Asesoría especializada en macrolotes y suelo con potencial de desarrollo. Identificamos, evaluamos y comercializamos tierra con el rigor que exige una decisión de inversión.", en: "Specialist advisory on large land tracts and development land. We identify, evaluate and market land with the rigor an investment decision demands." },
      { key: "services.intro.2", label: "Introducción — párrafo 2", multiline: true, es: "Nuestro trabajo comienza antes de que una propiedad salga al mercado. Analizamos sus características, su contexto territorial y la información disponible para definir su posicionamiento y presentarla a inversionistas y desarrolladores con un perfil compatible.", en: "Our work begins before a property reaches the market. We analyze its characteristics, territorial context and the available information to define its positioning and present it to investors and developers with a compatible profile." },
      { key: "services.intro.3", label: "Introducción — párrafo 3", multiline: true, es: "No comercializamos tierra de forma indiscriminada. Cada propiedad se aborda con criterio, transparencia y visión de largo plazo, para que cada conversación parta de información clara.", en: "We do not market land indiscriminately. Every property is approached with sound judgment, transparency and a long-term view, so every conversation starts from clear information." },
      { key: "services.intro.2.title", label: "Introducción — título columna 1", es: "Antes de salir al mercado", en: "Before going to market" },
      { key: "services.intro.3.title", label: "Introducción — título columna 2", es: "Criterio y visión de largo plazo", en: "Judgment and a long-term view" },
      { key: "services.list.title", label: "Título de la lista", es: "Servicios principales", en: "Core services" },
      { key: "services.1.title", label: "Servicio 1 — título", es: "Análisis y evaluación de propiedades", en: "Property analysis and evaluation" },
      { key: "services.1.text", label: "Servicio 1 — texto", multiline: true, es: "Evaluamos las características físicas, territoriales, urbanísticas y comerciales de cada predio con base en la información disponible. Identificamos su potencial de desarrollo y los aspectos que requieren revisión técnica o legal adicional antes de definir una estrategia, reduciendo la incertidumbre desde el inicio.", en: "We evaluate each site's physical, territorial, zoning and commercial characteristics based on the information available. We identify its development potential and the aspects that require further technical or legal review before a strategy is defined, reducing uncertainty from the outset." },
      { key: "services.2.title", label: "Servicio 2 — título", es: "Estructuración de oportunidades", en: "Opportunity structuring" },
      { key: "services.2.text", label: "Servicio 2 — texto", multiline: true, es: "Integramos la información relevante de cada propiedad en una presentación ordenada —características, contexto de mercado y potencial de desarrollo— que permite a inversionistas y desarrolladores evaluar la viabilidad de su proyecto con mayor certeza y en menos tiempo.", en: "We consolidate each property's relevant information into a structured presentation — characteristics, market context and development potential — that lets investors and developers assess project feasibility with greater certainty and in less time." },
      { key: "services.3.title", label: "Servicio 3 — título", es: "Comercialización especializada", en: "Specialized marketing" },
      { key: "services.3.text", label: "Servicio 3 — texto", multiline: true, es: "Diseñamos estrategias de comercialización dirigidas a desarrolladores e inversionistas cuyo perfil corresponde a la vocación de cada predio. Priorizamos la calidad del acercamiento sobre el volumen, para proteger el valor y el posicionamiento de la propiedad.", en: "We design marketing strategies aimed at developers and investors whose profile matches each site's intended use. We prioritize the quality of each approach over volume, protecting the property's value and market positioning." },
      { key: "services.4.title", label: "Servicio 4 — título", es: "Vinculación y acompañamiento", en: "Introductions and transaction support" },
      { key: "services.4.text", label: "Servicio 4 — texto", multiline: true, es: "Facilitamos el contacto entre propietarios, inversionistas y desarrolladores, y acompañamos el intercambio de información y las conversaciones comerciales dentro del alcance de nuestra participación, para que cada etapa avance con orden y claridad.", en: "We facilitate introductions between owners, investors and developers, and support the exchange of information and commercial discussions within the scope of our role, so each stage moves forward with order and clarity." },
    ],
  },
];

export const ALL_SLOTS = CONTENT_GROUPS.flatMap((g) => g.slots);
export const SLOT_BY_KEY = Object.fromEntries(ALL_SLOTS.map((s) => [s.key, s]));
