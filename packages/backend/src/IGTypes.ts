export const taxonomicRanks = [
	'kingdom',
	'phylum',
	'class',
	'order',
	'family',
	'genus',
	'species',
] as const;

export type Taxon = {
	[key in typeof taxonomicRanks[number]]: string;
};
