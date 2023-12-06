/*
 * SPDX-FileCopyrightText: t3ta
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class IkimongoIdentification1701246218157 {
	name = "IkimongoIdentification1701246218157";

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "hasOccurrence" TO "hasObservation"`,
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."createdAt" IS 'The created date of the Observation.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."updatedAt" IS 'The updated date of the Observation.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."location" IS 'The location of the Observation.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "createdAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."createdAt" IS 'The created date of the Observation.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "updatedAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "updatedAt" TIMESTAMP WITH TIME ZONE`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."updatedAt" IS 'The created date of the Observation.'`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dc18aa281aa6c243364476abd3" ON "identification" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c25cad8c4769aa596b958f723e" ON "identification" ("updatedAt") `,
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`DROP INDEX "public"."IDX_c25cad8c4769aa596b958f723e"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_dc18aa281aa6c243364476abd3"`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."updatedAt" IS 'The created date of the Observation.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "updatedAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."createdAt" IS 'The created date of the Observation.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "createdAt"`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."location" IS 'The location of the Occurrence.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."updatedAt" IS 'The updated date of the Occurrence.'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "observation"."createdAt" IS 'The created date of the Occurrence.'`,
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "hasObservation" TO "hasOccurrence"`,
		);
	}
}
