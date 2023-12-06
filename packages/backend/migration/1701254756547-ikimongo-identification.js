/*
 * SPDX-FileCopyrightText: t3ta
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class IkimongoIdentification1701254756547 {
	name = "IkimongoIdentification1701254756547";

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "identification" ADD "taxonId" character varying(2000)`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."taxonId" IS 'dwc:taxonID http://rs.tdwg.org/dwc/terms/taxonID'`,
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`,
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "identification"."taxonId" IS 'dwc:taxonID http://rs.tdwg.org/dwc/terms/taxonID'`,
		);
		await queryRunner.query(
			`ALTER TABLE "identification" DROP COLUMN "taxonId"`,
		);
	}
}
