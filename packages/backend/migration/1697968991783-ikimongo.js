/*
 * SPDX-FileCopyrightText: t3ta
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class Ikimongo1697968991783 {
    name = 'Ikimongo1697968991783'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "observation" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "userHost" character varying(128), "fileIds" character varying(32) array NOT NULL DEFAULT '{}', "attachedFileTypes" character varying(256) array NOT NULL DEFAULT '{}', "date" TIMESTAMP WITH TIME ZONE, "locationName" character varying(256), "location" point, "noteId" character varying(32), CONSTRAINT "REL_7d06f253e52808a06cde80d013" UNIQUE ("noteId"), CONSTRAINT "PK_77a736edc631a400b788ce302cb" PRIMARY KEY ("id")); COMMENT ON COLUMN "observation"."createdAt" IS 'The created date of the Observation.'; COMMENT ON COLUMN "observation"."updatedAt" IS 'The updated date of the Observation.'; COMMENT ON COLUMN "observation"."userId" IS 'The owner Id.'; COMMENT ON COLUMN "observation"."userHost" IS 'The host of owner. It will be null if the user in local.'; COMMENT ON COLUMN "observation"."date" IS 'The updated date of the Observation.'; COMMENT ON COLUMN "observation"."locationName" IS 'The location name of the Observation.'; COMMENT ON COLUMN "observation"."location" IS 'The location of the Observation.'`);
        await queryRunner.query(`CREATE INDEX "IDX_c04b9445b07037c7978290bfc3" ON "observation" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_87800cff18f9806778af8e8143" ON "observation" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_95e7f729cee52110c1f9a9e719" ON "observation" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4b36dae3ba2ae87988471c295" ON "observation" ("userHost") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb57293ba37f1d22d9f29f5079" ON "observation" ("fileIds") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0c1e034f2e12d0734f0ab1e21" ON "observation" ("attachedFileTypes") `);
        await queryRunner.query(`CREATE INDEX "IDX_265ad6062b1caf0915237e4103" ON "observation" ("date") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a930ce013ab15df356e2f86b1" ON "observation" ("userId", "id") `);
        await queryRunner.query(`CREATE TYPE "public"."identification_taxonomicrank_enum" AS ENUM('kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species')`);
        await queryRunner.query(`CREATE TABLE "identification" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "observationId" character varying(32) NOT NULL, "observation" character varying(32) NOT NULL, "userId" character varying(32) NOT NULL, "userHost" character varying(128), "scientificName" character varying(128) NOT NULL, "japaneseName" character varying(128) NOT NULL, "taxonomicRank" "public"."identification_taxonomicrank_enum" NOT NULL DEFAULT 'species', "taxon" jsonb NOT NULL DEFAULT '{}', "description" character varying(1024) NOT NULL, "noteId" character varying(32), CONSTRAINT "REL_9aa5313c5437b8c0dd7d2e9cd9" UNIQUE ("noteId"), CONSTRAINT "PK_fd49f15a74f96c6d17645c8810a" PRIMARY KEY ("id")); COMMENT ON COLUMN "identification"."createdAt" IS 'The created date of the Observation.'; COMMENT ON COLUMN "identification"."observationId" IS 'The Observation ID.'; COMMENT ON COLUMN "identification"."observation" IS 'The Observation ID corresponding to the Identification.'; COMMENT ON COLUMN "identification"."userId" IS 'The ID of author.'; COMMENT ON COLUMN "identification"."userHost" IS 'The host of owner. It will be null if the user in local.'; COMMENT ON COLUMN "identification"."scientificName" IS 'The scientific names of the Observation.'; COMMENT ON COLUMN "identification"."japaneseName" IS 'The common names of the Observation'; COMMENT ON COLUMN "identification"."description" IS 'The description of the Identification.'`);
        await queryRunner.query(`CREATE INDEX "IDX_dc18aa281aa6c243364476abd3" ON "identification" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8a953a33fece9ad3ca060a1c1" ON "identification" ("observationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_50b9a79ec9f5a5eee353cac074" ON "identification" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b896b9d331299827fcfd3cb4c" ON "identification" ("userHost") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a63d65116610826520fe6a92d" ON "identification" ("japaneseName") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b0f625a50a1d5395fb16a3ee3" ON "identification" ("taxonomicRank") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c26eb5dbd711a702ca5676702" ON "identification" ("observationId", "userId", "id") `);
        await queryRunner.query(`ALTER TABLE "note" ADD "hasObservation" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "note" ADD "hasIdentification" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`);
        await queryRunner.query(`ALTER TABLE "flash" ALTER COLUMN "visibility" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_7d06f253e52808a06cde80d013b" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_95e7f729cee52110c1f9a9e719d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identification" ADD CONSTRAINT "FK_9aa5313c5437b8c0dd7d2e9cd96" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identification" ADD CONSTRAINT "FK_f8a953a33fece9ad3ca060a1c1a" FOREIGN KEY ("observationId") REFERENCES "observation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identification" ADD CONSTRAINT "FK_50b9a79ec9f5a5eee353cac0740" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "identification" DROP CONSTRAINT "FK_50b9a79ec9f5a5eee353cac0740"`);
        await queryRunner.query(`ALTER TABLE "identification" DROP CONSTRAINT "FK_f8a953a33fece9ad3ca060a1c1a"`);
        await queryRunner.query(`ALTER TABLE "identification" DROP CONSTRAINT "FK_9aa5313c5437b8c0dd7d2e9cd96"`);
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_95e7f729cee52110c1f9a9e719d"`);
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_7d06f253e52808a06cde80d013b"`);
        await queryRunner.query(`ALTER TABLE "flash" ALTER COLUMN "visibility" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "hasIdentification"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "hasObservation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c26eb5dbd711a702ca5676702"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b0f625a50a1d5395fb16a3ee3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a63d65116610826520fe6a92d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b896b9d331299827fcfd3cb4c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_50b9a79ec9f5a5eee353cac074"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8a953a33fece9ad3ca060a1c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc18aa281aa6c243364476abd3"`);
        await queryRunner.query(`DROP TABLE "identification"`);
        await queryRunner.query(`DROP TYPE "public"."identification_taxonomicrank_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a930ce013ab15df356e2f86b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_265ad6062b1caf0915237e4103"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0c1e034f2e12d0734f0ab1e21"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb57293ba37f1d22d9f29f5079"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4b36dae3ba2ae87988471c295"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_95e7f729cee52110c1f9a9e719"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87800cff18f9806778af8e8143"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c04b9445b07037c7978290bfc3"`);
        await queryRunner.query(`DROP TABLE "observation"`);
    }
}
