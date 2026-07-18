import type { EngineeringSolution } from "@/lib/recommendation/types";

export const engineeringKnowledgeBase: EngineeringSolution[] = [
  {
    id: "biosand-filter-household",
    category: "filtration",
    name: {
      en: "Household biosand filter",
      es: "Filtro biosand domestico"
    },
    summary: {
      en: "A gravity-fed sand and gravel filter that reduces turbidity and many pathogens when built, ripened, and maintained correctly.",
      es: "Un filtro de arena y grava por gravedad que reduce turbidez y muchos patogenos cuando se construye, madura y mantiene correctamente."
    },
    suitableSources: ["well", "river", "lake", "spring"],
    climates: ["tropical", "temperate", "arid", "variable"],
    settlement: ["rural", "urban"],
    addresses: ["sediment", "pathogens", "turbidity", "unknown"],
    minBudgetUsd: 18,
    maxFamilySize: 8,
    requiresElectricity: false,
    materials: {
      en: ["Concrete or food-grade plastic container", "Washed fine sand", "Washed gravel", "Diffuser plate", "PVC outlet pipe", "Safe storage container"],
      es: ["Recipiente de concreto o plastico apto para alimentos", "Arena fina lavada", "Grava lavada", "Placa difusora", "Tubo PVC de salida", "Recipiente seguro de almacenamiento"]
    },
    tools: {
      en: ["Bucket", "Sieve", "Level", "PVC cutter", "Clean cloth"],
      es: ["Cubeta", "Tamiz", "Nivel", "Cortador de PVC", "Tela limpia"]
    },
    instructions: {
      en: [
        "Wash sand and gravel until rinse water is mostly clear.",
        "Layer gravel and fine sand in the container according to the validated design dimensions.",
        "Install the outlet pipe so the standing water layer remains above the sand surface.",
        "Add water gently through the diffuser plate and allow the biological layer to mature before relying on the filter.",
        "Store filtered water in a covered, narrow-mouth container."
      ],
      es: [
        "Lave la arena y la grava hasta que el agua de enjuague salga casi clara.",
        "Coloque capas de grava y arena fina en el recipiente segun dimensiones validadas.",
        "Instale el tubo de salida para mantener una capa de agua sobre la arena.",
        "Agregue agua suavemente con la placa difusora y permita que madure la capa biologica antes de depender del filtro.",
        "Almacene el agua filtrada en un recipiente cubierto de boca estrecha."
      ]
    },
    maintenance: {
      en: "Use daily, keep the top wet, clean the diffuser, and swirl-and-dump the top sand layer only when flow becomes too slow.",
      es: "Uselo a diario, mantenga humeda la parte superior, limpie el difusor y remueva la capa superior de arena solo cuando el flujo sea demasiado lento."
    },
    advantages: {
      en: ["No electricity required", "Good for cloudy water", "Locally buildable", "Low operating cost"],
      es: ["No requiere electricidad", "Bueno para agua turbia", "Puede construirse localmente", "Bajo costo operativo"]
    },
    limitations: {
      en: ["Does not remove salt or dissolved chemicals", "Needs correct sand size", "Requires a maturation period"],
      es: ["No elimina sal ni quimicos disueltos", "Requiere tamano correcto de arena", "Necesita periodo de maduracion"]
    },
    warnings: {
      en: ["Disinfect after filtration when pathogen risk is high.", "Do not use for industrial or pesticide contamination without lab testing."],
      es: ["Desinfecte despues de filtrar cuando el riesgo de patogenos sea alto.", "No lo use para contaminacion industrial o pesticidas sin pruebas de laboratorio."]
    },
    difficulty: "medium",
    references: ["CAWST Biosand Filter Manual", "WHO household water treatment guidance"]
  },
  {
    id: "sodis-clear-bottles",
    category: "filtration",
    name: {
      en: "Solar disinfection with clear PET bottles",
      es: "Desinfeccion solar con botellas PET transparentes"
    },
    summary: {
      en: "A very low-cost emergency method that uses sunlight and clear bottles to disinfect small batches of low-turbidity water.",
      es: "Metodo de emergencia de muy bajo costo que usa luz solar y botellas transparentes para desinfectar pequenos volumenes de agua poco turbia."
    },
    suitableSources: ["piped", "rain", "spring", "well"],
    climates: ["arid", "tropical", "temperate", "variable"],
    settlement: ["rural", "urban"],
    addresses: ["pathogens", "unknown"],
    minBudgetUsd: 0,
    maxFamilySize: 5,
    requiresElectricity: false,
    materials: {
      en: ["Clear PET bottles under 2 liters", "Reflective metal sheet or roof surface", "Cloth pre-filter if water is cloudy"],
      es: ["Botellas PET transparentes menores de 2 litros", "Lamina metalica reflectante o techo", "Tela para prefiltro si el agua esta turbia"]
    },
    tools: {
      en: ["Soap for washing bottles", "Timer or daylight tracking"],
      es: ["Jabon para lavar botellas", "Reloj o seguimiento de luz del dia"]
    },
    instructions: {
      en: [
        "Use clear, unscratched PET bottles and wash them well.",
        "Pre-filter cloudy water through clean cloth until it is visibly clear.",
        "Fill bottles, shake to oxygenate, then top them up.",
        "Place bottles in full sun for at least six hours, or two days in cloudy weather.",
        "Drink directly from the bottle or pour into a clean covered container."
      ],
      es: [
        "Use botellas PET transparentes y sin rayas, bien lavadas.",
        "Prefiltre agua turbia con tela limpia hasta que se vea clara.",
        "Llene las botellas, agitelas para oxigenar y completelas.",
        "Coloquelas al sol directo al menos seis horas, o dos dias si esta nublado.",
        "Beba directamente de la botella o vierta en un recipiente limpio y cubierto."
      ]
    },
    maintenance: {
      en: "Replace scratched or cloudy bottles and keep caps clean.",
      es: "Reemplace botellas rayadas u opacas y mantenga limpias las tapas."
    },
    advantages: {
      en: ["Almost no cost", "Fast to start", "No construction required"],
      es: ["Costo casi nulo", "Rapido de iniciar", "No requiere construccion"]
    },
    limitations: {
      en: ["Small daily volume", "Needs strong sunlight", "Not suitable for turbid or chemically contaminated water"],
      es: ["Volumen diario pequeno", "Requiere sol fuerte", "No sirve para agua turbia o con quimicos"]
    },
    warnings: {
      en: ["Do not use glass bottles or colored bottles.", "This is not desalination and does not remove heavy metals."],
      es: ["No use botellas de vidrio ni botellas de color.", "No desala ni elimina metales pesados."]
    },
    difficulty: "low",
    references: ["WHO SODIS technical notes", "Eawag SODIS guidance"]
  },
  {
    id: "rainwater-harvesting-first-flush",
    category: "collection",
    name: {
      en: "Roof rainwater harvesting with first-flush diverter",
      es: "Captacion de lluvia de techo con desviador de primera descarga"
    },
    summary: {
      en: "A roof catchment, gutter, first-flush diverter, and covered tank system for seasonal household water supply.",
      es: "Sistema de techo, canaleta, desviador de primera descarga y tanque cubierto para abastecimiento domestico estacional."
    },
    suitableSources: ["rain"],
    climates: ["tropical", "temperate", "variable"],
    settlement: ["rural", "urban"],
    addresses: ["sediment", "turbidity", "unknown"],
    minBudgetUsd: 35,
    maxFamilySize: 10,
    requiresElectricity: false,
    materials: {
      en: ["Gutters", "Downpipe", "First-flush diverter", "Covered storage tank", "Mosquito screen", "Tap or spigot"],
      es: ["Canaletas", "Bajante", "Desviador de primera descarga", "Tanque cubierto", "Malla contra mosquitos", "Grifo"]
    },
    tools: {
      en: ["Saw", "Drill", "Ladder", "Sealant", "Measuring tape"],
      es: ["Sierra", "Taladro", "Escalera", "Sellador", "Cinta metrica"]
    },
    instructions: {
      en: [
        "Clean the roof and keep animals away from the catchment area.",
        "Install gutters with slope toward the downpipe.",
        "Add a first-flush diverter sized for the roof area.",
        "Route water through a screen into a covered tank with a raised tap.",
        "Disinfect or filter harvested water before drinking."
      ],
      es: [
        "Limpie el techo y mantenga animales lejos del area de captacion.",
        "Instale canaletas con pendiente hacia la bajante.",
        "Agregue un desviador de primera descarga dimensionado para el techo.",
        "Pase el agua por una malla hacia un tanque cubierto con grifo elevado.",
        "Desinfecte o filtre el agua captada antes de beberla."
      ]
    },
    maintenance: {
      en: "Clean gutters monthly during rainy season, empty the first-flush chamber after storms, and inspect screens for tears.",
      es: "Limpie canaletas cada mes en temporada de lluvia, vacie la primera descarga despues de tormentas e inspeccione las mallas."
    },
    advantages: {
      en: ["Reduces dependence on distant sources", "Good storage option", "Scales with tank size"],
      es: ["Reduce dependencia de fuentes lejanas", "Buena opcion de almacenamiento", "Escala con el tamano del tanque"]
    },
    limitations: {
      en: ["Seasonal availability", "Upfront tank cost", "Needs roof surface in good condition"],
      es: ["Disponibilidad estacional", "Costo inicial del tanque", "Requiere techo en buen estado"]
    },
    warnings: {
      en: ["Do not collect from asbestos, lead-painted, or heavily contaminated roofs.", "Always protect tanks from mosquitoes and animals."],
      es: ["No capte desde techos con asbesto, pintura con plomo o mucha contaminacion.", "Proteja siempre los tanques contra mosquitos y animales."]
    },
    difficulty: "medium",
    references: ["UNICEF rainwater harvesting field guidance", "WHO water safety planning"]
  },
  {
    id: "chlorination-safe-storage",
    category: "storage",
    name: {
      en: "Chlorination plus safe storage",
      es: "Cloracion y almacenamiento seguro"
    },
    summary: {
      en: "Controlled chlorination followed by storage in a clean covered container to prevent recontamination.",
      es: "Cloracion controlada seguida de almacenamiento en un recipiente limpio y cubierto para evitar recontaminacion."
    },
    suitableSources: ["piped", "well", "spring", "truck", "river", "lake"],
    climates: ["arid", "tropical", "temperate", "cold", "variable"],
    settlement: ["rural", "urban"],
    addresses: ["pathogens", "unknown"],
    minBudgetUsd: 3,
    maxFamilySize: 12,
    requiresElectricity: false,
    materials: {
      en: ["Approved household chlorine product", "Narrow-mouth storage container with lid", "Measuring cap or dropper"],
      es: ["Producto de cloro domestico aprobado", "Recipiente de boca estrecha con tapa", "Tapa medidora o gotero"]
    },
    tools: {
      en: ["Clean stirring utensil", "Timer"],
      es: ["Utensilio limpio para mezclar", "Reloj"]
    },
    instructions: {
      en: [
        "Use the dosage printed on an approved chlorine product for the exact water volume.",
        "Filter very cloudy water before chlorination.",
        "Mix thoroughly and wait the required contact time before drinking.",
        "Store treated water in a clean covered container with a tap or narrow mouth."
      ],
      es: [
        "Use la dosis indicada en un producto aprobado para el volumen exacto de agua.",
        "Filtre agua muy turbia antes de clorar.",
        "Mezcle bien y espere el tiempo de contacto requerido antes de beber.",
        "Guarde el agua tratada en un recipiente limpio y cubierto con grifo o boca estrecha."
      ]
    },
    maintenance: {
      en: "Wash the storage container weekly and keep the lid closed between uses.",
      es: "Lave el recipiente semanalmente y mantenga la tapa cerrada entre usos."
    },
    advantages: {
      en: ["Low cost", "Strong pathogen control", "Fast deployment", "Protects stored water"],
      es: ["Bajo costo", "Buen control de patogenos", "Implementacion rapida", "Protege el agua almacenada"]
    },
    limitations: {
      en: ["Taste and odor concerns", "Less effective in very cloudy water", "Requires correct dosage"],
      es: ["Puede afectar sabor y olor", "Menos efectivo en agua muy turbia", "Requiere dosis correcta"]
    },
    warnings: {
      en: ["Never mix chlorine with acids or ammonia.", "Follow product labels; overdosing can be unsafe."],
      es: ["Nunca mezcle cloro con acidos o amoniaco.", "Siga la etiqueta; dosis excesivas pueden ser inseguras."]
    },
    difficulty: "low",
    references: ["CDC Safe Water System", "WHO household water treatment guidance"]
  },
  {
    id: "ceramic-candle-filter",
    category: "filtration",
    name: {
      en: "Ceramic candle filter with safe storage",
      es: "Filtro ceramico de vela con almacenamiento seguro"
    },
    summary: {
      en: "A replaceable ceramic element in a covered vessel that filters sediment and many microbes for household drinking water.",
      es: "Elemento ceramico reemplazable en un recipiente cubierto que filtra sedimento y muchos microbios para agua potable domestica."
    },
    suitableSources: ["piped", "well", "spring", "river", "lake"],
    climates: ["arid", "tropical", "temperate", "cold", "variable"],
    settlement: ["rural", "urban"],
    addresses: ["sediment", "pathogens", "turbidity", "unknown"],
    minBudgetUsd: 12,
    maxFamilySize: 6,
    requiresElectricity: false,
    materials: {
      en: ["Certified ceramic candle element", "Upper and lower containers", "Gasket", "Spigot", "Lid"],
      es: ["Elemento ceramico certificado", "Recipientes superior e inferior", "Empaque", "Grifo", "Tapa"]
    },
    tools: {
      en: ["Drill if assembling locally", "Clean brush"],
      es: ["Taladro si se ensambla localmente", "Cepillo limpio"]
    },
    instructions: {
      en: [
        "Install the candle with a tight gasket to prevent bypass.",
        "Pour source water into the upper chamber only.",
        "Keep the lower chamber covered and draw water from the spigot.",
        "Scrub the ceramic element gently when flow drops, following the manufacturer limit."
      ],
      es: [
        "Instale la vela con empaque firme para evitar fugas sin filtrar.",
        "Vierta agua fuente solo en la camara superior.",
        "Mantenga cubierta la camara inferior y saque agua del grifo.",
        "Cepille suavemente el elemento ceramico cuando baje el flujo, respetando el limite del fabricante."
      ]
    },
    maintenance: {
      en: "Clean the ceramic element with safe water when flow slows and replace it at the rated lifetime.",
      es: "Limpie el elemento con agua segura cuando disminuya el flujo y reemplacelo al final de su vida util."
    },
    advantages: {
      en: ["Simple operation", "Compact for homes", "No power needed"],
      es: ["Operacion simple", "Compacto para hogares", "No necesita energia"]
    },
    limitations: {
      en: ["Replacement parts needed", "Can break if dropped", "Not for dissolved chemicals or salt"],
      es: ["Necesita repuestos", "Puede romperse al caer", "No elimina quimicos disueltos ni sal"]
    },
    warnings: {
      en: ["Buy from reputable suppliers where possible.", "Prevent untreated water from touching the clean chamber."],
      es: ["Compre a proveedores confiables cuando sea posible.", "Evite que agua sin tratar toque la camara limpia."]
    },
    difficulty: "low",
    references: ["WHO evaluating household water treatment options", "Potters for Peace ceramic filter guidance"]
  }
];
