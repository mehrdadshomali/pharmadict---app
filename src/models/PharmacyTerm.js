import { v4 as uuidv4 } from 'uuid';

export class PharmacyTerm {
  constructor({
    id = uuidv4(),
    latinName,
    turkishName,
    category,
    definition,
    components = [],
    relatedTerms = [],
    etymology = null,
    usage = null,
    sideEffects = null,
    dosage = null,
    contraindications = null,
    interactions = null,
    synonyms = [],
    isBookmarked = false,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.latinName = latinName;
    this.turkishName = turkishName;
    this.category = category;
    this.definition = definition;
    this.components = components;
    this.relatedTerms = relatedTerms;
    this.etymology = etymology;
    this.usage = usage;
    this.sideEffects = sideEffects;
    this.dosage = dosage;
    this.contraindications = contraindications;
    this.interactions = interactions;
    this.synonyms = synonyms;
    this.isBookmarked = isBookmarked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    return new PharmacyTerm({
      ...json,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt)
    });
  }

  toJSON() {
    return {
      id: this.id,
      latinName: this.latinName,
      turkishName: this.turkishName,
      category: this.category,
      definition: this.definition,
      components: this.components,
      relatedTerms: this.relatedTerms,
      etymology: this.etymology,
      usage: this.usage,
      sideEffects: this.sideEffects,
      dosage: this.dosage,
      contraindications: this.contraindications,
      interactions: this.interactions,
      synonyms: this.synonyms,
      isBookmarked: this.isBookmarked,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

export class SearchResult {
  constructor(term, matchType, highlightedText) {
    this.id = uuidv4();
    this.term = term;
    this.matchType = matchType;
    this.highlightedText = highlightedText;
  }
}

export const MatchType = {
  EXACT: 'exact',
  PARTIAL: 'partial',
  SYNONYM: 'synonym',
  COMPONENT: 'component',
  RELATED_TERM: 'relatedTerm'
};

export const SortOption = {
  ALPHABETICAL: 'Alfabetik',
  CATEGORY: 'Kategoriye Göre',
  RECENT: 'Son Eklenenler',
  BOOKMARKED: 'Favoriler'
};

