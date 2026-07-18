import { NextResponse } from "next/server";
import { z } from "zod";
import { engineeringKnowledgeBase } from "@/data/knowledge-base";
import type { Locale } from "@/lib/recommendation/types";

export const runtime = "nodejs";

const chatSchema = z.object({
  locale: z.enum(["en", "es"]).default("en"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(1800)
      })
    )
    .min(1)
    .max(12)
});

const waterTerms = [
  "water",
  "water quality",
  "quality",
  "health",
  "healthy",
  "illness",
  "sickness",
  "diarrhea",
  "disease",
  "drinking",
  "potable",
  "clean water",
  "safe water",
  "contaminated",
  "contamination",
  "sanitation",
  "hygiene",
  "wastewater",
  "sewage",
  "toilet",
  "latrine",
  "filter",
  "filtration",
  "purification",
  "disinfection",
  "chlorine",
  "chlorination",
  "boil",
  "boiling",
  "bacteria",
  "virus",
  "pathogen",
  "parasite",
  "arsenic",
  "fluoride",
  "lead",
  "nitrate",
  "salt",
  "salinity",
  "rainwater",
  "well",
  "river",
  "lake",
  "groundwater",
  "spring",
  "aquifer",
  "drought",
  "flood",
  "storage",
  "store",
  "stored",
  "storing",
  "long period",
  "long-term",
  "shelf life",
  "emergency water",
  "container",
  "containers",
  "tank",
  "cistern",
  "barrel",
  "bottle",
  "bottled",
  "turbid",
  "turbidity",
  "cloudy",
  "odor",
  "smell",
  "taste",
  "sediment",
  "sand filter",
  "biosand",
  "ceramic filter",
  "sodis",
  "uv",
  "ultraviolet",
  "black light",
  "light ray",
  "light rays",
  "sunlight",
  "solar disinfection",
  "radiation",
  "agua",
  "calidad",
  "salud",
  "enfermedad",
  "diarrea",
  "potable",
  "beber",
  "contaminada",
  "contaminacion",
  "saneamiento",
  "higiene",
  "aguas residuales",
  "alcantarillado",
  "letrina",
  "filtro",
  "filtracion",
  "purificacion",
  "desinfeccion",
  "cloro",
  "hervir",
  "bacteria",
  "virus",
  "patogeno",
  "arsenico",
  "fluoruro",
  "plomo",
  "nitrato",
  "salinidad",
  "lluvia",
  "pozo",
  "rio",
  "lago",
  "subterranea",
  "manantial",
  "sequia",
  "inundacion",
  "almacenamiento",
  "almacenar",
  "almacenada",
  "guardar",
  "guardada",
  "largo plazo",
  "recipiente",
  "recipientes",
  "tanque",
  "cisterna",
  "barril",
  "botella",
  "turbia",
  "olor",
  "sabor",
  "sedimento"
];

interface DomainConcept {
  id: string;
  aliases: string[];
  answer: Record<Locale, string>;
}

const domainConcepts: DomainConcept[] = [
  {
    id: "water-quality-health",
    aliases: [
      "water quality",
      "quality",
      "health",
      "healthy",
      "illness",
      "sickness",
      "disease",
      "diarrhea",
      "children",
      "immune",
      "pregnancy",
      "calidad",
      "salud",
      "enfermedad",
      "diarrea",
      "ninos",
      "embarazo"
    ],
    answer: {
      en: "Water quality matters for health because water can carry things that affect the body directly. Microbes like bacteria, viruses, and parasites can cause diarrhea, vomiting, fever, dehydration, and outbreaks, especially in children, older adults, pregnant people, and people with weaker immune systems. Chemicals can create different risks: lead can affect brain development, nitrates can be dangerous for infants, arsenic can increase long-term cancer and skin risks, and excess salt or industrial contaminants can make water unsafe even if it looks clear. Poor water quality also affects hygiene, cooking, wound cleaning, and sanitation. The difficult part is that unsafe water can look normal, so practical safety usually means protecting the source, filtering cloudy water, disinfecting when pathogen risk is likely, storing water safely, and testing when chemical contamination is possible.",
      es: "La calidad del agua importa para la salud porque el agua puede transportar cosas que afectan directamente al cuerpo. Microbios como bacterias, virus y parasitos pueden causar diarrea, vomitos, fiebre, deshidratacion y brotes, especialmente en ninos, personas mayores, personas embarazadas y personas con sistemas inmunes mas debiles. Los quimicos pueden crear otros riesgos: el plomo puede afectar el desarrollo cerebral, los nitratos pueden ser peligrosos para bebes, el arsenico puede aumentar riesgos de cancer y piel a largo plazo, y el exceso de sal o contaminantes industriales puede hacer que el agua sea insegura aunque se vea clara. La mala calidad del agua tambien afecta la higiene, la cocina, la limpieza de heridas y el saneamiento. Lo dificil es que el agua insegura puede verse normal, por eso la seguridad practica suele incluir proteger la fuente, filtrar agua turbia, desinfectar cuando hay riesgo de patogenos, almacenar de forma segura y hacer pruebas cuando se sospechan quimicos."
    }
  },
  {
    id: "uv-disinfection",
    aliases: ["uv", "ultraviolet", "black light", "light ray", "light rays", "sunlight", "solar disinfection", "sodis", "radiation", "rays", "luz uv", "ultravioleta", "luz solar", "rayos"],
    answer: {
      en: "Yes, certain light can help make water safer, but it depends on the type of light and the contaminant. UV-C light can inactivate many bacteria, viruses, and protozoa by damaging their genetic material, so it is used in some water disinfection systems. Sunlight can also disinfect small amounts of clear water through SODIS when used correctly. But light is not a general-purpose filter: it does not remove sediment, salt, heavy metals, arsenic, pesticides, fuel, or most dissolved chemicals. Black lights are usually UVA and are much weaker for disinfection than proper UV-C treatment, so they should not be treated as a reliable water purifier. UV also works poorly when water is cloudy because particles can shield microbes. In practice, clear water first, then use a validated UV or solar disinfection method, and test or use another treatment if chemical contamination is suspected.",
      es: "Si, cierta luz puede ayudar a hacer el agua mas segura, pero depende del tipo de luz y del contaminante. La luz UV-C puede inactivar muchas bacterias, virus y protozoos al danar su material genetico, por eso se usa en algunos sistemas de desinfeccion de agua. La luz solar tambien puede desinfectar pequenas cantidades de agua clara mediante SODIS cuando se usa correctamente. Pero la luz no es un filtro general: no elimina sedimento, sal, metales pesados, arsenico, pesticidas, combustible ni la mayoria de quimicos disueltos. Las luces negras normalmente son UVA y son mucho menos efectivas para desinfectar que un tratamiento UV-C validado, asi que no deben tratarse como purificador confiable. La UV tambien funciona mal si el agua esta turbia porque las particulas pueden proteger microbios. En la practica: aclare o filtre el agua primero, luego use un metodo UV o solar validado, y haga pruebas o use otro tratamiento si sospecha contaminacion quimica."
    }
  },
  {
    id: "chemical-limits",
    aliases: ["chemical", "chemicals", "pesticide", "fuel", "oil", "arsenic", "lead", "fluoride", "nitrate", "heavy metal", "industrial", "quimico", "pesticida", "combustible", "arsenico", "plomo", "fluoruro", "nitrato", "metal"],
    answer: {
      en: "Chemical contamination is different from microbial contamination. Boiling, sunlight, chlorine, and many household filters may reduce pathogens but usually do not reliably remove dissolved chemicals, salt, heavy metals, pesticides, or fuel. If chemicals are suspected, the safest next step is testing or local public-health guidance. Treatment often depends on the exact contaminant: activated carbon may help with some organic chemicals and taste/odor, reverse osmosis may help with salts and some dissolved contaminants, and specialized media may be needed for arsenic, fluoride, or lead.",
      es: "La contaminacion quimica es distinta de la contaminacion microbiana. Hervir, usar luz solar, cloro y muchos filtros domesticos pueden reducir patogenos, pero normalmente no eliminan de forma confiable quimicos disueltos, sal, metales pesados, pesticidas o combustible. Si sospecha quimicos, lo mas seguro es hacer pruebas o buscar guia local de salud publica. El tratamiento depende del contaminante exacto: carbon activado puede ayudar con algunos quimicos organicos y sabor/olor, osmosis inversa puede ayudar con sales y algunos contaminantes disueltos, y pueden necesitarse medios especializados para arsenico, fluoruro o plomo."
    }
  },
  {
    id: "microbial-treatment",
    aliases: ["bacteria", "virus", "protozoa", "pathogen", "parasite", "microbe", "disease", "diarrhea", "germs", "bacteria", "virus", "protozoo", "patogeno", "parasito", "microbio", "enfermedad"],
    answer: {
      en: "For microbes like bacteria, viruses, and parasites, the goal is usually removal plus disinfection. Filtration can reduce particles and some organisms, while boiling, chlorine, UV-C, or validated solar disinfection can inactivate many pathogens when used correctly. Cloudy water should usually be filtered first because particles can protect microbes from disinfectants and light.",
      es: "Para microbios como bacterias, virus y parasitos, el objetivo suele ser remover particulas y luego desinfectar. La filtracion puede reducir particulas y algunos organismos, mientras que hervir, clorar, usar UV-C o desinfeccion solar validada puede inactivar muchos patogenos si se usa correctamente. El agua turbia normalmente debe filtrarse primero porque las particulas pueden proteger microbios de desinfectantes y luz."
    }
  },
  {
    id: "storage-safety",
    aliases: ["storage", "store", "stored", "storing", "container", "tank", "cistern", "long-term", "shelf life", "emergency water", "almacenamiento", "almacenar", "guardar", "recipiente", "tanque", "cisterna", "largo plazo"],
    answer: {
      en: "Safe storage is about preventing recontamination. Start with safe water, use a clean food-grade container with a tight lid, keep it away from sun, animals, fuel, pesticides, and floodwater, and avoid dipping hands or cups into it. Narrow-mouth containers or containers with taps are safer. If stored water changes smell, color, or appearance, or may have contacted chemicals, do not assume it is safe without treatment or testing.",
      es: "El almacenamiento seguro consiste en evitar la recontaminacion. Empiece con agua segura, use un recipiente apto para alimentos, limpio y con tapa ajustada, mantengalo lejos del sol, animales, combustible, pesticidas y aguas de inundacion, y evite meter manos o vasos. Los recipientes de boca estrecha o con grifo son mas seguros. Si el agua almacenada cambia de olor, color o apariencia, o pudo tocar quimicos, no asuma que es segura sin tratamiento o pruebas."
    }
  },
  {
    id: "filtration-purpose",
    aliases: ["filter", "filtration", "ceramic", "biosand", "sand filter", "membrane", "filtro", "filtracion", "ceramico", "arena", "membrana"],
    answer: {
      en: "Filtering water is mainly about removing particles and, depending on the filter, reducing some microbes or specific chemicals. A filter is not automatically enough by itself. Biosand and ceramic filters can help with turbidity and many pathogens; activated carbon can help with some taste, odor, and organic chemicals; membranes such as reverse osmosis can address salts and some dissolved contaminants. The right filter depends on what is actually in the water.",
      es: "Filtrar agua sirve principalmente para quitar particulas y, segun el filtro, reducir algunos microbios o quimicos especificos. Un filtro no siempre basta por si solo. Filtros biosand y ceramicos pueden ayudar con turbidez y muchos patogenos; carbon activado puede ayudar con sabor, olor y algunos quimicos organicos; membranas como osmosis inversa pueden tratar sales y algunos contaminantes disueltos. El filtro correcto depende de lo que realmente tenga el agua."
    }
  }
];

function hasWaterContext(text: string) {
  const normalized = text.toLowerCase();
  return waterTerms.some((term) => normalized.includes(term)) || domainConcepts.some((concept) => concept.aliases.some((alias) => normalized.includes(alias)));
}

function isClearlyOutOfScope(text: string) {
  const normalized = text.toLowerCase();
  const outOfScopeSignals = [
    "engine",
    "car",
    "truck repair",
    "transmission",
    "brake",
    "homework",
    "essay about shakespeare",
    "stock market",
    "crypto",
    "recipe",
    "video game",
    "password",
    "malware",
    "weapon",
    "dating",
    "tax",
    "lawsuit"
  ];
  const strongWaterSignals = [
    "drinking water",
    "safe water",
    "water treatment",
    "water filter",
    "water storage",
    "water contamination",
    "water source",
    "sanitation",
    "hygiene",
    "wastewater"
  ];

  return outOfScopeSignals.some((signal) => normalized.includes(signal)) && !strongWaterSignals.some((signal) => normalized.includes(signal));
}

function canUsePreviousWaterContext(text: string) {
  return /\b(it|that|this|they|them|those|source|filter|container|tank|method|solution|treatment|system|waterborne|contaminant|response|answer|detail|details|example|examples|why|how|what|about|if|more|longer|shorter|simpler|explain|elaborate|expand|rice|soup|pasta|food|meal|arroz|sopa|comida|paso|detalle|detalles|ejemplo|ejemplos|explica|mas|menos)\b/i.test(text);
}

function refusal(locale: Locale) {
  return locale === "es"
    ? "Lo siento, HydroAccess AI solo puede ayudar con temas relacionados con agua, saneamiento, higiene, contaminacion, tratamiento, almacenamiento y acceso a agua segura."
    : "Sorry, HydroAccess AI can only help with topics related to water, sanitation, hygiene, contamination, treatment, storage, and access to safe water.";
}

function aiUnavailable(locale: Locale) {
  return locale === "es"
    ? "HydroAccess AI no tiene conectado un servicio de IA en este momento. Agregue OPENAI_API_KEY en .env.local y reinicie el servidor para activar respuestas generativas."
    : "HydroAccess AI does not have an AI service connected right now. Add OPENAI_API_KEY to .env.local and restart the server to enable generative responses.";
}

function aiFailed(locale: Locale) {
  return locale === "es"
    ? "HydroAccess AI intento usar el servicio de IA, pero la solicitud fallo. Revise que la clave de OpenAI sea valida, que tenga facturacion activa y que el modelo configurado este disponible."
    : "HydroAccess AI tried to use the AI service, but the request failed. Check that the OpenAI key is valid, billing is active, and the configured model is available.";
}

function wantsMoreDetail(text: string) {
  return /\b(more detail|more detailed|longer|go deeper|explain more|elaborate|expand|more examples|step by step|why exactly|mas detalle|mas detallada|mas largo|explica mas|mas ejemplos|paso a paso)\b/i.test(text);
}

function latestContext(messages: Array<{ role: "user" | "assistant"; content: string }>) {
  const latest = messages[messages.length - 1]?.content ?? "";
  const previous = messages
    .slice(0, -1)
    .slice(-4)
    .map((message) => message.content)
    .join("\n");
  const needsConversationContext = wantsMoreDetail(latest) || canUsePreviousWaterContext(latest);
  return needsConversationContext ? `${previous}\n${latest}` : latest;
}

function conceptAnswer(text: string, locale: Locale) {
  const normalized = text.toLowerCase();
  const ranked = domainConcepts
    .map((concept) => ({
      concept,
      score: concept.aliases.reduce((total, alias) => total + (normalized.includes(alias) ? Math.max(1, alias.split(/\s+/).length) : 0), 0)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const primary = ranked[0]?.concept;
  if (!primary) return null;

  const secondary = ranked
    .slice(1, 3)
    .map((item) => item.concept)
    .filter((concept) => concept.id !== primary.id);

  if (!secondary.length) return primary.answer[locale];

  const related =
    locale === "es"
      ? `\n\nTambien relacionado: ${secondary.map((concept) => concept.answer[locale]).join(" ")}`
      : `\n\nRelated context: ${secondary.map((concept) => concept.answer[locale]).join(" ")}`;

  return `${primary.answer[locale]}${related}`;
}

// Kept as a reviewed offline backup, but production chat now requires OpenAI.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fallbackAnswer(messages: Array<{ role: "user" | "assistant"; content: string }>, locale: Locale) {
  const latest = messages[messages.length - 1]?.content ?? "";
  const text = latestContext(messages).toLowerCase();

  if (
    /(nuclear|reactor|power plant|electricity|energy|solar|wind|diesel|grid|thermal|heat|desalination|reverse osmosis|distillation|radiation|energia nuclear|energia|electricidad|desalinizacion|osmosis|destilacion|radiacion)/.test(text) &&
    /(water|agua|drink|drinking|potable|filter|filtr|treat|treatment|purif|desalin|sanitize|sanitation|safe|segura|tratamiento|saneamiento)/.test(text)
  ) {
    return locale === "es"
      ? "Si la pregunta es si la energia nuclear puede filtrar agua directamente: no exactamente. La energia nuclear no es un filtro por si misma. Lo que si puede hacer es proporcionar electricidad o calor para operar sistemas de tratamiento de agua, por ejemplo bombas, osmosis inversa para desalinizacion, destilacion, tratamiento termico o equipos de desinfeccion. Tambien existen usos industriales muy controlados de radiacion para desinfeccion, pero no son practicos ni seguros como solucion domestica o comunitaria simple. Para hogares o comunidades, la decision real suele ser: que contaminantes hay, cuanta energia hay disponible, cuanto cuesta mantener el sistema y si hay personal capacitado. Si el problema es microbiano, filtracion mas desinfeccion suele ser mas practica. Si el problema es salinidad, se necesitan tecnologias como osmosis inversa o destilacion, que requieren energia, mantenimiento y pruebas de calidad."
      : "If you mean whether nuclear power can filter water directly: not exactly. Nuclear power is not a filter by itself. What it can do is provide electricity or heat to run water-treatment systems, such as pumps, reverse osmosis for desalination, distillation, thermal treatment, or disinfection equipment. There are also tightly controlled industrial uses of radiation for disinfection, but those are not practical or safe as a household or simple community solution. For homes or communities, the real question is: what contaminants are present, how much energy is available, what maintenance costs are realistic, and whether trained operators are available. If the issue is microbial contamination, filtration plus disinfection is usually more practical. If the issue is salinity, technologies like reverse osmosis or distillation may be needed, and those require energy, maintenance, and water-quality testing.";
  }

  if (wantsMoreDetail(latest)) {
    if (/(cook|cooking|meal|food|rice|soup|pasta|cocinar|comida|arroz|sopa)/.test(text)) {
      return locale === "es"
        ? "Claro. En mas detalle: filtrar agua antes de cocinar puede importar porque cocinar no siempre resuelve todos los problemas del agua. Si el agua tiene sedimento, lodo o particulas, esas cosas pueden quedar en la comida aunque el agua se caliente. Si el agua esta turbia, los microbios pueden esconderse en particulas, y filtrar primero ayuda a que la desinfeccion o el hervor funcionen mejor. Si hay mal olor o sabor, filtrar puede mejorar la aceptabilidad, aunque no siempre elimina la causa. Y si se sospechan quimicos, salinidad, metales, pesticidas o contaminacion industrial, hervir o cocinar no los elimina de forma confiable; de hecho, al evaporarse parte del agua, algunos contaminantes pueden concentrarse mas. Por eso, para cocinar conviene empezar con agua lo mas clara y segura posible: filtrar si esta turbia, desinfectar si hay riesgo microbiano, y hacer pruebas o buscar guia local si se sospechan quimicos."
        : "Sure. In more detail: filtering water before cooking can matter because cooking does not solve every water-safety problem. If water has sediment, mud, or particles, those can remain in the food even after heating. If water is cloudy, microbes can be protected inside particles, so filtering first can make boiling or disinfection work better. If the water has bad taste or odor, filtering may improve acceptability, although it may not remove the root cause. And if chemical contamination, salinity, metals, pesticides, or industrial pollution are suspected, cooking or boiling does not reliably remove them; as water evaporates, some contaminants can become more concentrated. So for cooking, the safest approach is to start with water that is as clear and safe as possible: filter cloudy water, disinfect when microbial risk is likely, and seek testing or local guidance when chemicals are possible.";
    }

    if (/(stor|stored|storing|shelf|long[- ]?term|container|tank|almacen|guardar|recipiente|tanque)/.test(text)) {
      return locale === "es"
        ? "Claro. En mas detalle: almacenar agua de forma segura depende de tres cosas: que el agua empiece segura, que el recipiente no la contamine y que nadie la recontamine al sacarla. Use recipientes aptos para alimentos, lavados, con tapa ajustada y preferiblemente con grifo o boca estrecha. Mantengalos lejos del sol directo, animales, basura, pesticidas, combustibles y aguas de inundacion. Si abre el recipiente con frecuencia, el riesgo sube porque manos, vasos o polvo pueden introducir microbios. Si el agua cambia de olor, color o apariencia, o si pudo tocar quimicos, no la trate como segura sin pruebas o guia local. Para beber, si hay duda microbiana, filtre si esta turbia y desinfecte siguiendo una etiqueta aprobada o salud publica local."
        : "Sure. In more detail: safe water storage depends on three things: the water starts safe, the container does not contaminate it, and people do not recontaminate it when taking water out. Use food-grade containers that are cleaned, tightly covered, and preferably narrow-mouth or fitted with a tap. Keep them away from direct sun, animals, trash, pesticides, fuel, and floodwater. If the container is opened often, risk increases because hands, cups, or dust can introduce microbes. If the water changes smell, color, or appearance, or if chemicals may have touched it, do not treat it as safe without testing or local guidance. For drinking, if microbial risk is possible, filter cloudy water and disinfect using an approved label or public-health guidance.";
    }
  }

  if (/(rice|arroz)/.test(text) && /(water|agua|filter|filtr|cook|cooking|cocinar)/.test(text)) {
    return locale === "es"
      ? "Para arroz, tiene aun mas sentido pensar en la calidad del agua porque el arroz absorbe gran parte del agua de coccion. Si el agua tiene sedimento, mal sabor u olor, eso puede terminar en la comida. Si el riesgo es microbiano, cocinar ayuda, pero filtrar agua turbia antes de cocinar puede reducir particulas y hacer el tratamiento mas efectivo. Si sospecha quimicos, salinidad, metales o pesticidas, cocinar arroz con esa agua no los elimina de forma confiable. En ese caso, use una fuente segura o agua tratada y busque pruebas si es posible."
      : "For rice, water quality matters even more because rice absorbs much of the cooking water. If the water has sediment, bad taste, or odor, that can end up in the food. If the risk is microbial, cooking helps, but filtering cloudy water before cooking can reduce particles and make treatment more effective. If chemicals, salinity, metals, or pesticides are suspected, cooking rice with that water will not reliably remove them. In that case, use a safer source or treated water and seek testing if possible.";
  }

  if (/(cook|cooking|meal|food|rice|soup|pasta|cocinar|comida|arroz|sopa).*(filter|filtr|safe|water|agua)|(?:filter|filtr).*(cook|cooking|meal|food|rice|soup|pasta|cocinar|comida)/.test(text)) {
    return locale === "es"
      ? "Una persona podria filtrar el agua antes de cocinar porque el calor no elimina todo tipo de problema. Cocinar puede reducir muchos microbios si el agua hierve lo suficiente, pero no elimina sedimento, mal sabor, sal, metales pesados, pesticidas ni muchos quimicos. Si el agua esta turbia, filtrar primero tambien ayuda porque las particulas pueden proteger microbios y dejar suciedad en la comida. Lo mas seguro es usar agua clara y segura para cocinar: filtre si hay particulas o turbidez, desinfecte si hay riesgo de patogenos, y busque pruebas si sospecha quimicos, salinidad, metales o contaminacion industrial."
      : "Someone might filter water before cooking because heat does not fix every water problem. Cooking can reduce many microbes if the water gets hot enough for long enough, but it does not remove sediment, bad taste, salt, heavy metals, pesticides, or many chemicals. If water is cloudy, filtering first also helps because particles can protect microbes and leave dirt or grit in food. The safest approach is to cook with water that is already as clear and safe as possible: filter if there are particles or turbidity, disinfect if pathogen risk is likely, and seek testing if chemicals, salinity, metals, or industrial contamination are suspected.";
  }

  const matchedConceptAnswer = conceptAnswer(text, locale);

  if (matchedConceptAnswer) {
    return matchedConceptAnswer;
  }

  if (/(stor|stored|storing|shelf|long[- ]?term|long period|container|tank|cistern|barrel|bottle|emergency|almacen|guardar|recipiente|tanque|cisterna|barril|botella|largo plazo)/.test(text)) {
    return locale === "es"
      ? "Si, el agua puede almacenarse por periodos largos si empieza siendo segura y se protege de la recontaminacion. Use recipientes aptos para alimentos, limpios, con tapa ajustada y, si es posible, de boca estrecha o con grifo. Guarde el agua lejos del sol directo, combustibles, pesticidas y basura. No toque el interior del recipiente ni saque agua con vasos o manos sucias. Si el recipiente se abre con frecuencia, trate esa agua como de uso diario y mantenga buena higiene. Para almacenamiento de emergencia, revise el agua periodicamente; si huele raro, cambia de color, tiene particulas o estuvo expuesta a inundaciones o quimicos, no la beba sin tratamiento y, cuando haya sospecha de quimicos, busque pruebas o guia local. Para mayor seguridad, filtre si hay turbidez y desinfecte antes de beber siguiendo una etiqueta aprobada o recomendaciones de salud publica."
      : "Yes, water can be stored for long periods if it starts safe and is protected from recontamination. Use clean, food-grade containers with tight lids, ideally narrow-mouth containers or containers with a tap. Store them away from direct sunlight, fuel, pesticides, trash, and animals. Do not touch the inside of the container or dip cups or hands into stored water. If a container is opened often, treat it like daily-use water and keep hygiene tight. For emergency storage, inspect the water periodically; if it smells unusual, changes color, has particles, or was exposed to flooding or chemicals, do not drink it without treatment. If chemicals are suspected, testing or local public-health guidance matters. For extra safety, filter cloudy water and disinfect before drinking using an approved product label or public-health guidance.";
  }

  if (/(well|pozo).*(smell|odor|odour|scent|taste|bad|rotten|sulfur|sulphur|olor|sabor|huele|mal)|(?:smell|odor|odour|taste|bad|rotten|sulfur|sulphur|olor|sabor|huele).*(?:water|agua|well|pozo)/.test(text)) {
    return locale === "es"
      ? "Si el agua de pozo huele o sabe mal, tratela como una senal de advertencia. Puede deberse a bacterias, materia organica, sulfuro de hidrogeno, problemas del pozo, tuberias, almacenamiento sucio o contaminacion cercana. No se puede confirmar la causa solo por el olor. Revise si la tapa del pozo esta sellada, si hay letrinas, animales, basura, inundaciones o escorrentia cerca, y si el recipiente de almacenamiento esta limpio. Para beber, use otra fuente segura mientras investiga, o filtre y desinfecte si el problema parece microbiano. Si el olor es quimico, combustible, solvente, metalico fuerte, o aparecio despues de inundaciones o actividad industrial/agricola, no dependa solo de hervir o clorar; busque pruebas de agua o guia local."
      : "If well water smells or tastes bad, treat it as a warning sign. It could come from bacteria, organic matter, hydrogen sulfide, well defects, plumbing, dirty storage, or nearby contamination. Smell alone cannot confirm the cause. Check whether the well cap is sealed, whether latrines, animals, trash, flooding, or runoff are nearby, and whether the storage container is clean. For drinking, use another known-safe source while investigating, or filter and disinfect if the concern seems microbial. If the smell is chemical, fuel-like, solvent-like, strongly metallic, or appeared after flooding or industrial/agricultural activity, do not rely only on boiling or chlorine; get water testing or local guidance.";
  }

  if (/(contamin|pollut|dirty|unsafe|turbid|cloudy|turbia|sucia|smell|odor|odour|taste|olor|sabor|huele)/.test(text)) {
    return locale === "es"
      ? "El agua puede contaminarse cuando microbios, sedimentos o quimicos entran en la fuente o en el almacenamiento. Las causas comunes incluyen heces humanas o animales cerca de pozos o rios, inundaciones, tuberias rotas, recipientes sucios, escorrentia agricola, basura, minerales naturales como arsenico o fluoruro, y recontaminacion despues de tratar el agua. Si el agua se ve turbia, huele mal o hay riesgo de enfermedad, es mejor filtrarla y desinfectarla, y hacer pruebas cuando se sospechan quimicos."
      : "Water can become contaminated when microbes, sediment, or chemicals enter the source or storage container. Common causes include human or animal waste near wells or rivers, flooding, broken pipes, dirty containers, agricultural runoff, trash, naturally occurring minerals like arsenic or fluoride, and recontamination after treatment. If water is cloudy, smells unusual, or disease risk is high, it should be filtered and disinfected, and tested when chemicals are suspected.";
  }

  if (/(boil|herv|chlor|cloro|disinfect|desinfect)/.test(text)) {
    return locale === "es"
      ? "Hervir o desinfectar puede reducir muchos patogenos, pero no elimina sal, metales pesados ni muchos quimicos. Para agua turbia, primero use un prefiltro o filtro adecuado y despues desinfecte. Para cloro, siga siempre la etiqueta del producto local o la guia de salud publica; no mezcle cloro con otros quimicos."
      : "Boiling or disinfecting can reduce many pathogens, but it does not remove salt, heavy metals, or many chemicals. For cloudy water, pre-filter or use an appropriate filter first, then disinfect. For chlorine, always follow the local product label or public health guidance; never mix chlorine with other chemicals.";
  }

  if (/(filter|filtr|biosand|ceramic|arena|ceram)/.test(text)) {
    return locale === "es"
      ? "Los filtros ayudan de distintas maneras. Un filtro biosand puede reducir turbidez y muchos patogenos si esta bien construido y mantenido. Un filtro ceramico puede ser compacto y facil de usar, pero necesita repuestos. Ninguno de estos elimina sal o quimicos disueltos de forma confiable, por lo que se necesitan pruebas si se sospechan contaminantes quimicos."
      : "Filters help in different ways. A biosand filter can reduce turbidity and many pathogens when correctly built and maintained. A ceramic filter can be compact and easy to use, but needs replacement parts. Neither reliably removes salt or dissolved chemicals, so testing is important when chemical contamination is suspected.";
  }

  if (/(rain|lluvia|harvest|captacion|roof|techo)/.test(text)) {
    return locale === "es"
      ? "La captacion de lluvia puede ser una buena fuente estacional si el techo es seguro, las canaletas estan limpias, se usa desviador de primera descarga y el tanque esta cubierto contra mosquitos y animales. El agua de lluvia captada aun debe filtrarse o desinfectarse antes de beber."
      : "Rainwater harvesting can be a good seasonal source when the roof is safe, gutters are clean, a first-flush diverter is used, and the tank is covered against mosquitoes and animals. Harvested rainwater should still be filtered or disinfected before drinking.";
  }

  if (/(sanitation|saneamiento|toilet|latrine|letrina|sewage|wastewater|residual)/.test(text)) {
    return locale === "es"
      ? "El saneamiento protege el agua al separar heces y aguas residuales de pozos, rios, hogares y manos. Las soluciones dependen del suelo, nivel freatico, espacio, presupuesto y mantenimiento. Como regla general, mantenga letrinas y residuos lejos de fuentes de agua y evite que inundaciones arrastren contaminacion hacia pozos o tanques."
      : "Sanitation protects water by separating feces and wastewater from wells, rivers, homes, and hands. Solutions depend on soil, groundwater level, space, budget, and maintenance. As a general rule, keep latrines and waste away from water sources and prevent flooding from carrying contamination into wells or tanks.";
  }

  return locale === "es"
    ? "La respuesta corta es que el agua segura depende de la fuente, los contaminantes posibles, el tratamiento y el almacenamiento. Los riesgos principales suelen ser microbios, sedimentos, quimicos disueltos, salinidad o recontaminacion despues de tratarla. Una buena forma de razonar es: de donde viene el agua, que podria haber entrado en ella, si se ve turbia o huele raro, que tratamiento puede resolver ese riesgo y como se mantendra limpia despues. Si me da un poco mas de contexto, puedo responder de forma mas especifica."
    : "The short answer is that safe water depends on the source, the likely contaminants, the treatment method, and storage. The main risks are usually microbes, sediment, dissolved chemicals, salinity, or recontamination after treatment. A good way to reason about it is: where did the water come from, what could have entered it, does it look cloudy or smell unusual, what treatment addresses that risk, and how will it stay clean afterward? If you give me a little more context, I can answer more specifically.";
}

function knowledgeContext(locale: Locale) {
  return engineeringKnowledgeBase
    .map((solution) => ({
      id: solution.id,
      category: solution.category,
      name: solution.name[locale],
      summary: solution.summary[locale],
      addresses: solution.addresses,
      materials: solution.materials[locale],
      limitations: solution.limitations[locale],
      warnings: solution.warnings[locale],
      references: solution.references
    }))
    .slice(0, 8);
}

function hydroAccessPrompt(locale: Locale, conversation: string) {
  const responseLanguage = locale === "es" ? "Spanish" : "English";
  return [
    "You are HydroAccess AI, a water access, clean drinking water, sanitation, and hygiene assistant.",
    "Scope: answer only about water access, drinking water safety, contamination, household/community water treatment, filtration, disinfection, water storage, rainwater harvesting, wells, sanitation, hygiene, wastewater, and related public-health or practical engineering context.",
    "Reason about indirect relationships. A question is in scope when it asks whether a technology, energy source, material, environmental condition, or infrastructure system can affect water safety, water access, sanitation, treatment, storage, or contamination.",
    "If a question is partly in scope, answer the water-related part and briefly state what is outside HydroAccess AI scope.",
    `If the user's latest request is outside that scope, reply exactly in ${responseLanguage} with a brief refusal saying HydroAccess AI can only help with water, sanitation, hygiene, contamination, treatment, storage, and safe-water access topics.`,
    "For general education, explain clearly and practically.",
    "For concrete engineering recommendations, construction steps, materials, maintenance, or safety warnings, use only the provided structured knowledge base. Do not invent new engineering systems.",
    "Do not provide exact chemical dosing unless telling the user to follow an approved product label or local public-health guidance.",
    "Mention lab testing or local authorities when chemical contamination, salinity, heavy metals, industrial pollution, or severe illness risk is involved.",
    `Respond in ${responseLanguage}. Keep the response helpful, concise, and easy to understand.`,
    `Structured knowledge base JSON:\n${JSON.stringify(knowledgeContext(locale), null, 2)}`,
    `Conversation:\n${conversation}`
  ].join("\n\n");
}

function extractOpenAIText(response: unknown) {
  if (!response || typeof response !== "object") return "";
  const data = response as {
    output_text?: string;
    output?: Array<{
      content?: Array<{
        type?: string;
        text?: string;
      }>;
    }>;
  };

  if (data.output_text) return data.output_text;

  return (
    data.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text ?? "")
      .filter(Boolean)
      .join("\n") ?? ""
  );
}

async function askOpenAI(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const modelCandidates = Array.from(new Set([process.env.OPENAI_MODEL, "gpt-4.1-mini", "gpt-4o-mini"].filter(Boolean)));
  let lastError = "";

  for (const model of modelCandidates) {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: prompt,
        max_output_tokens: 700
      })
    });

    if (response.ok) {
      const data = (await response.json()) as unknown;
      return extractOpenAIText(data);
    }

    lastError = `${response.status} ${await response.text().catch(() => "")}`;
  }

  throw new Error(`OpenAI request failed: ${lastError}`);
}

export async function POST(request: Request) {
  const parsed = chatSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ reply: refusal("en") }, { status: 400 });
  }

  const { locale, messages } = parsed.data;
  const latest = messages[messages.length - 1];
  const priorMessages = messages.slice(0, -1);
  const latestHasWaterContext = hasWaterContext(latest.content);
  const priorHasWaterContext = priorMessages.some((message) => hasWaterContext(message.content));
  const isWaterFollowUp = priorHasWaterContext && canUsePreviousWaterContext(latest.content);
  const hasLocalWaterContext = latestHasWaterContext || isWaterFollowUp;
  const hasModelApiKey = Boolean(process.env.OPENAI_API_KEY);

  if (latest.role !== "user" || isClearlyOutOfScope(latest.content) || (!hasModelApiKey && !hasLocalWaterContext)) {
    return NextResponse.json({ reply: refusal(locale) });
  }

  if (!hasModelApiKey) {
    return NextResponse.json({ reply: aiUnavailable(locale) });
  }

  const conversation = messages
    .slice(-8)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");
  const prompt = hydroAccessPrompt(locale, conversation);

  try {
    const openAIReply = await askOpenAI(prompt);
    if (openAIReply) {
      return NextResponse.json({ reply: openAIReply });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: aiFailed(locale) });
  }

  return NextResponse.json({ reply: aiFailed(locale) });
}
