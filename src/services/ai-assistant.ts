import { ProductDraft } from "@/domain/cnf";

export type AiSuggestionRequest = {
  productSummary: string;
  ingredientNotes?: string;
};

export type AiSuggestionResult = {
  suggestedCategory?: string;
  suggestedUsageType?: ProductDraft["usageType"];
  ingredientHints: string[];
  complianceNotes: string[];
};

export async function getAiSuggestions(
  request: AiSuggestionRequest
): Promise<AiSuggestionResult> {
  void request;

  return {
    ingredientHints: [],
    complianceNotes: []
  };
}
