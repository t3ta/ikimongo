const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class IkimongoNoteid1699179237508 {
    name = 'IkimongoNoteid1699179237508'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_4a930ce013ab15df356e2f86b1"`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`);
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_7d06f253e52808a06cde80d013b"`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "noteId" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_7d06f253e52808a06cde80d013" ON "observation" ("noteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_31c1fbc8247058487757e7fd39" ON "observation" ("userId", "noteId", "id") `);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_7d06f253e52808a06cde80d013b" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_7d06f253e52808a06cde80d013b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31c1fbc8247058487757e7fd39"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d06f253e52808a06cde80d013"`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "noteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_7d06f253e52808a06cde80d013b" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`);
        await queryRunner.query(`CREATE INDEX "IDX_4a930ce013ab15df356e2f86b1" ON "observation" ("id", "userId") `);
    }
}
