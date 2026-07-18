import { z } from "zod";

export const assessmentSchema = z.object({
  country: z.string().min(1).max(80),
  region: z.string().min(1).max(120),
  climate: z.enum(["arid", "tropical", "temperate", "cold", "variable"]),
  settlement: z.enum(["urban", "rural"]),
  primaryWaterSource: z.enum(["rain", "well", "river", "lake", "piped", "truck", "spring"]),
  sourceReliability: z.enum(["daily", "weekly", "seasonal", "unreliable"]),
  waterAppearance: z.enum(["clear", "cloudy", "colored", "smelly"]),
  suspectedContamination: z.array(z.enum(["sediment", "pathogens", "salinity", "chemicals", "turbidity", "unknown"])).min(1),
  familySize: z.number().int().min(1).max(100),
  monthlyBudgetUsd: z.number().min(0).max(10000),
  hasElectricity: z.boolean(),
  hasInternet: z.boolean(),
  availableMaterials: z.array(z.string().min(1).max(80)).max(30),
  availableTools: z.array(z.string().min(1).max(80)).max(30),
  mainConcern: z.enum(["cost", "safety", "speed", "maintenance", "capacity"]),
  primaryUse: z.enum(["drinking", "cooking", "washing", "irrigation"]),
  priority: z.enum(["lowest-cost", "highest-safety", "fastest", "lowest-maintenance"])
});
