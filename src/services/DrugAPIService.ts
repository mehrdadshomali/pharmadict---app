// DrugAPIService.ts - Stub for API calls
import type { PharmacyTerm } from "../types/models";

class DrugAPIService {
  async fetchFromMultipleSources(limit: number): Promise<PharmacyTerm[]> {
    // API disabled - return empty array
    return [];
  }

  async getDrugDetails(drugName: string): Promise<PharmacyTerm | null> {
    // API disabled - return null
    return null;
  }
}

export const drugAPIService = new DrugAPIService();
