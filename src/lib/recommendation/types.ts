export type Locale = "en" | "es";

export type ContaminationType =
  | "sediment"
  | "pathogens"
  | "salinity"
  | "chemicals"
  | "turbidity"
  | "unknown";

export type WaterUse = "drinking" | "cooking" | "washing" | "irrigation";

export interface AssessmentInput {
  country: string;
  region: string;
  climate: "arid" | "tropical" | "temperate" | "cold" | "variable";
  settlement: "urban" | "rural";
  primaryWaterSource: "rain" | "well" | "river" | "lake" | "piped" | "truck" | "spring";
  sourceReliability: "daily" | "weekly" | "seasonal" | "unreliable";
  waterAppearance: "clear" | "cloudy" | "colored" | "smelly";
  suspectedContamination: ContaminationType[];
  familySize: number;
  monthlyBudgetUsd: number;
  hasElectricity: boolean;
  hasInternet: boolean;
  availableMaterials: string[];
  availableTools: string[];
  mainConcern: "cost" | "safety" | "speed" | "maintenance" | "capacity";
  primaryUse: WaterUse;
  priority: "lowest-cost" | "highest-safety" | "fastest" | "lowest-maintenance";
}

export interface EngineeringSolution {
  id: string;
  category: "collection" | "filtration" | "storage" | "sanitation";
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
  suitableSources: AssessmentInput["primaryWaterSource"][];
  climates: AssessmentInput["climate"][];
  settlement: AssessmentInput["settlement"][];
  addresses: ContaminationType[];
  minBudgetUsd: number;
  maxFamilySize: number;
  requiresElectricity: boolean;
  materials: Record<Locale, string[]>;
  tools: Record<Locale, string[]>;
  instructions: Record<Locale, string[]>;
  maintenance: Record<Locale, string>;
  advantages: Record<Locale, string[]>;
  limitations: Record<Locale, string[]>;
  warnings: Record<Locale, string[]>;
  difficulty: "low" | "medium" | "high";
  references: string[];
}

export interface Recommendation {
  primary: EngineeringSolution;
  alternative?: EngineeringSolution;
  score: number;
  reasons: string[];
  cautions: string[];
  estimatedCostUsd: {
    min: number;
    max: number;
  };
}

export interface RecommendationEngine {
  recommend(input: AssessmentInput, locale: Locale): Promise<Recommendation>;
}
