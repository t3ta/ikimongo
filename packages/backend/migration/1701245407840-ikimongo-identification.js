/*
 * SPDX-FileCopyrightText: t3ta
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class IkimongoIdentification1701245407840 {
	name = "IkimongoIdentification1701245407840";

	async up(queryRunner) {
		await queryRunner.query(
			`DROP INDEX "public"."IDX_4a930ce013ab15df356e2f86b1"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_dc18aa281aa6c243364476abd3"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_6a63d65116610826520fe6a92d"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_3b0f625a50a1d5395fb16a3ee3"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_c25cad8c4769aa596b958f723e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "hasObservation" TO "hasOccurrence"`,
		);
		await queryRunner.query(
			`ALTER TABLE "observation" DROP COLUMN "locationName"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "observation"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "japaneseName"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "taxonomicRank"`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."identification_taxonomicrank_enum"`,
		);
		await queryRunner.query(`ALTER TABLE "identification" DROP COLUMN "taxon"`);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "vernacularName" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."vernacularName" IS 'dwc:vernacularName http://rs.tdwg.org/dwc/terms/vernacularName'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "taxonRank" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."taxonRank" IS 'dwc:taxonRank http://rs.tdwg.org/dwc/terms/taxonRank'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "kingdom" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."kingdom" IS 'dwc:kingdom http://rs.tdwg.org/dwc/terms/kingdom'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "phylum" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."phylum" IS 'dwc:phylum http://rs.tdwg.org/dwc/terms/phylum'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "class" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."class" IS 'dwc:class http://rs.tdwg.org/dwc/terms/class'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "order" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."order" IS 'dwc:order http://rs.tdwg.org/dwc/terms/order'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "family" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."family" IS 'dwc:family http://rs.tdwg.org/dwc/terms/family'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "genus" character varying(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."genus" IS 'dwc:genus http://rs.tdwg.org/dwc/terms/genus'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "language" character(128)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."language" IS 'dwc:language http://rs.tdwg.org/dwc/terms/countryCode'`,
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`,
		);
		await queryRunner.query(
			`ALTER TABLE "observation" DROP CONSTRAINT "FK_95e7f729cee52110c1f9a9e719d"`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."createdAt" IS 'The created date of the Occurrence.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."updatedAt" IS 'The updated date of the Occurrence.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."userId" IS 'dwc:recordedBy http://rs.tdwg.org/dwc/terms/recordedBy'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."date" IS 'dwc:eventDate http://rs.tdwg.org/dwc/terms/eventDate'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."location" IS 'The location of the Occurrence.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP CONSTRAINT "FK_50b9a79ec9f5a5eee353cac0740"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP CONSTRAINT "FK_f8a953a33fece9ad3ca060a1c1a"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_0c26eb5dbd711a702ca5676702"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "createdAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "updatedAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."userId" IS 'dwc:identifiedBy http://rs.tdwg.org/dwc/terms/identifiedBy'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."observationId" IS 'dwc:occurenceID http://rs.tdwg.org/dwc/terms/identificationID'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ALTER COLUMN "scientificName" DROP NOT NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."scientificName" IS 'dwc:scientificName http://rs.tdwg.org/dwc/terms/scientificName'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ALTER COLUMN "description" DROP NOT NULL`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7d06f253e52808a06cde80d013" ON "observation" ("noteId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_31c1fbc8247058487757e7fd39" ON "observation" ("userId", "noteId", "id") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9aa5313c5437b8c0dd7d2e9cd9" ON "identification" ("noteId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6ae7e31329cb983c49acf0c7bb" ON "identification" ("vernacularName") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5c8e6a163d646ef7d7d2e2ab70" ON "identification" ("taxonRank") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d10b8363e1d99d8a4bb9878162" ON "identification" ("kingdom") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0f9a0639c0a0467e3131df9da8" ON "identification" ("phylum") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_aa51ff81cf136c327e377b7ca9" ON "identification" ("class") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_28562e0ea03d88eb1bee3ce172" ON "identification" ("order") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_edecd4ada5c37925b0f4b58a98" ON "identification" ("family") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d11211d8921f0977a6132e9004" ON "identification" ("genus") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0aee775fc0ff4978d88f2c5268" ON "identification" ("language") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0c26eb5dbd711a702ca5676702" ON "identification" ("observationId", "userId", "id") `,
		);
		await queryRunner.query(
			`ALTER TABLE "observation" ADD CONSTRAINT "FK_95e7f729cee52110c1f9a9e719d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD CONSTRAINT "FK_50b9a79ec9f5a5eee353cac0740" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD CONSTRAINT "FK_f8a953a33fece9ad3ca060a1c1a" FOREIGN KEY ("observationId") REFERENCES "observation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "identification" DROP CONSTRAINT "FK_f8a953a33fece9ad3ca060a1c1a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP CONSTRAINT "FK_50b9a79ec9f5a5eee353cac0740"`,
		);
		await queryRunner.query(
			`ALTER TABLE "observation" DROP CONSTRAINT "FK_95e7f729cee52110c1f9a9e719d"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_0c26eb5dbd711a702ca5676702"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_0aee775fc0ff4978d88f2c5268"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_d11211d8921f0977a6132e9004"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_edecd4ada5c37925b0f4b58a98"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_28562e0ea03d88eb1bee3ce172"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_aa51ff81cf136c327e377b7ca9"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_0f9a0639c0a0467e3131df9da8"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_d10b8363e1d99d8a4bb9878162"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_5c8e6a163d646ef7d7d2e2ab70"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_6ae7e31329cb983c49acf0c7bb"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_9aa5313c5437b8c0dd7d2e9cd9"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_31c1fbc8247058487757e7fd39"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_7d06f253e52808a06cde80d013"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ALTER COLUMN "description" SET NOT NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."scientificName" IS 'The scientific names of the Observation.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ALTER COLUMN "scientificName" SET NOT NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."observationId" IS 'The Observation ID.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."userId" IS 'The ID of author.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "updatedAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "updatedAt" TIMESTAMP WITH TIME ZONE`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "createdAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0c26eb5dbd711a702ca5676702" ON "identification" ("id", "observationId", "userId") `,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD CONSTRAINT "FK_f8a953a33fece9ad3ca060a1c1a" FOREIGN KEY ("observationId") REFERENCES "observation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD CONSTRAINT "FK_50b9a79ec9f5a5eee353cac0740" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."location" IS 'The location of the Observation.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."date" IS 'The updated date of the Observation.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."userId" IS 'The owner Id.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."updatedAt" IS 'The updated date of the Observation.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."createdAt" IS 'The created date of the Observation.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "observation" ADD CONSTRAINT "FK_95e7f729cee52110c1f9a9e719d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."language" IS 'dwc:language http://rs.tdwg.org/dwc/terms/countryCode'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "language"`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."genus" IS 'dwc:genus http://rs.tdwg.org/dwc/terms/genus'`,
		);
		await queryRunner.query(`ALTER TABLE "identification" DROP COLUMN "genus"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."family" IS 'dwc:family http://rs.tdwg.org/dwc/terms/family'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "family"`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."order" IS 'dwc:order http://rs.tdwg.org/dwc/terms/order'`,
		);
		await queryRunner.query(`ALTER TABLE "identification" DROP COLUMN "order"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."class" IS 'dwc:class http://rs.tdwg.org/dwc/terms/class'`,
		);
		await queryRunner.query(`ALTER TABLE "identification" DROP COLUMN "class"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."phylum" IS 'dwc:phylum http://rs.tdwg.org/dwc/terms/phylum'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "phylum"`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."kingdom" IS 'dwc:kingdom http://rs.tdwg.org/dwc/terms/kingdom'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "kingdom"`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."taxonRank" IS 'dwc:taxonRank http://rs.tdwg.org/dwc/terms/taxonRank'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "taxonRank"`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."vernacularName" IS 'dwc:vernacularName http://rs.tdwg.org/dwc/terms/vernacularName'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "vernacularName"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "taxon" jsonb NOT NULL DEFAULT '{}'`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."identification_taxonomicrank_enum" AS ENUM('kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species')`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "taxonomicRank" "public"."identification_taxonomicrank_enum" NOT NULL DEFAULT 'species'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "japaneseName" character varying(128) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "observation" character varying(32) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "observation" ADD "locationName" character varying(256)`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "hasOccurrence" TO "hasObservation"`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c25cad8c4769aa596b958f723e" ON "identification" ("updatedAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3b0f625a50a1d5395fb16a3ee3" ON "identification" ("taxonomicRank") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6a63d65116610826520fe6a92d" ON "identification" ("japaneseName") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dc18aa281aa6c243364476abd3" ON "identification" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4a930ce013ab15df356e2f86b1" ON "observation" ("id", "userId") `,
		);
	}
}
