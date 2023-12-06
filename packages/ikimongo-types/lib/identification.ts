export interface IIGIdentification {
  observationId?: string;
  scientificName?: string;
  vernacularName?: string;
  taxonRank?: string;
  taxonId?: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  language?: string;
  description?: string;
}

export interface IIGIdentificationRequest {
  scientificName: string | null;
  vernacularName: string | null;
  taxonRank: string | null;
  taxonId: string | null;
  kingdom: string | null;
  phylum: string | null;
  class: string | null;
  order: string | null;
  family: string | null;
  genus: string | null;
  language: string | null;
  description: string | null;
}
