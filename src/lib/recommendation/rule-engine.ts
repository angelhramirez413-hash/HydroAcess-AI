import { engineeringKnowledgeBase } from "@/data/knowledge-base";
import type {
  AssessmentInput,
  EngineeringSolution,
  Recommendation,
  RecommendationEngine
} from "./types";

const costRanges: Record<string, { min: number; max: number }> = {
  "biosand-filter-household": { min: 25, max: 90 },
  "sodis-clear-bottles": { min: 0, max: 5 },
  "rainwater-harvesting-first-flush": { min: 45, max: 240 },
  "chlorination-safe-storage": { min: 3, max: 18 },
  "ceramic-candle-filter": { min: 15, max: 65 }
};

function overlapScore<T>(a: T[], b: T[], weight: number) {
  return a.filter((item) => b.includes(item)).length * weight;
}

function scoreSolution(solution: EngineeringSolution, input: AssessmentInput) {
  let score = 0;
  const reasons: string[] = [];
  const cautions: string[] = [];

  if (solution.suitableSources.includes(input.primaryWaterSource)) {
    score += 20;
    reasons.push("source-match");
  }

  if (solution.climates.includes(input.climate)) {
    score += 12;
    reasons.push("climate-match");
  }

  if (solution.settlement.includes(input.settlement)) {
    score += 8;
    reasons.push("settlement-match");
  }

  score += overlapScore(solution.addresses, input.suspectedContamination, 10);

  if (input.monthlyBudgetUsd >= solution.minBudgetUsd) {
    score += 14;
    reasons.push("budget-fit");
  } else {
    score -= 18;
    cautions.push("budget-gap");
  }

  if (input.familySize <= solution.maxFamilySize) {
    score += 8;
  } else {
    score -= 8;
    cautions.push("capacity-gap");
  }

  if (solution.requiresElectricity && !input.hasElectricity) {
    score -= 30;
    cautions.push("electricity-required");
  }

  if (input.priority === "lowest-cost" && solution.minBudgetUsd <= 5) score += 10;
  if (input.priority === "highest-safety" && solution.addresses.includes("pathogens")) score += 10;
  if (input.priority === "fastest" && solution.difficulty === "low") score += 8;
  if (input.priority === "lowest-maintenance" && solution.category === "storage") score += 6;

  if (input.waterAppearance === "cloudy" && !solution.addresses.includes("turbidity")) {
    score -= 10;
    cautions.push("prefilter-needed");
  }

  if (input.suspectedContamination.includes("salinity")) {
    score -= 20;
    cautions.push("salinity-warning");
  }

  if (input.suspectedContamination.includes("chemicals")) {
    score -= 12;
    cautions.push("chemical-warning");
  }

  return { score, reasons, cautions };
}

export class RuleBasedRecommendationEngine implements RecommendationEngine {
  async recommend(input: AssessmentInput): Promise<Recommendation> {
    const ranked = engineeringKnowledgeBase
      .map((solution) => ({ solution, ...scoreSolution(solution, input) }))
      .sort((a, b) => b.score - a.score);

    const primary = ranked[0];
    const alternative = ranked.find((candidate) => candidate.solution.id !== primary.solution.id);

    return {
      primary: primary.solution,
      alternative: alternative?.solution,
      score: primary.score,
      reasons: primary.reasons,
      cautions: Array.from(new Set(primary.cautions)),
      estimatedCostUsd: costRanges[primary.solution.id] ?? {
        min: primary.solution.minBudgetUsd,
        max: primary.solution.minBudgetUsd * 3
      }
    };
  }
}

export const recommendationEngine: RecommendationEngine = new RuleBasedRecommendationEngine();
