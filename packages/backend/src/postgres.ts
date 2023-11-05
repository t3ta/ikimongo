/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// https://github.com/typeorm/typeorm/issues/2400
import pg from "pg";
pg.types.setTypeParser(20, Number);

import { DataSource, Logger } from "typeorm";
import * as highlight from "cli-highlight";
import { entities as charts } from "@/core/chart/entities.js";

import { MiAbuseUserReport } from "@/models/AbuseUserReport.js";
import { MiAccessToken } from "@/models/auth/AccessToken.js";
import { MiAd } from "@/models/Ad.js";
import { MiAnnouncement } from "@/models/announcement/Announcement.js";
import { MiAnnouncementRead } from "@/models/announcement/AnnouncementRead.js";
import { MiAntenna } from "@/models/Antenna.js";
import { MiApp } from "@/models/App.js";
import { MiAuthSession } from "@/models/auth/AuthSession.js";
import { MiBlocking } from "@/models/mute-block/Blocking.js";
import { MiChannelFollowing } from "@/models/channel/ChannelFollowing.js";
import { MiChannelFavorite } from "@/models/channel/ChannelFavorite.js";
import { MiClip } from "@/models/clip/Clip.js";
import { MiClipNote } from "@/models/clip/ClipNote.js";
import { MiClipFavorite } from "@/models/clip/ClipFavorite.js";
import { MiDriveFile } from "@/models/drive/DriveFile.js";
import { MiDriveFolder } from "@/models/drive/DriveFolder.js";
import { MiEmoji } from "@/models/Emoji.js";
import { MiFollowing } from "@/models/following/Following.js";
import { MiFollowRequest } from "@/models/following/FollowRequest.js";
import { MiGalleryLike } from "@/models/gallery/GalleryLike.js";
import { MiGalleryPost } from "@/models/gallery/GalleryPost.js";
import { MiHashtag } from "@/models/Hashtag.js";
import { MiInstance } from "@/models/Instance.js";
import { MiMeta } from "@/models/Meta.js";
import { MiModerationLog } from "@/models/ModerationLog.js";
import { MiMutedNote } from "@/models/mute-block/MutedNote.js";
import { MiMuting } from "@/models/mute-block/Muting.js";
import { MiRenoteMuting } from "@/models/mute-block/RenoteMuting.js";
import { MiNote } from "@/models/note/Note.js";
import { MiNoteFavorite } from "@/models/note/NoteFavorite.js";
import { MiNoteReaction } from "@/models/note/NoteReaction.js";
import { MiNoteThreadMuting } from "@/models/note/NoteThreadMuting.js";
import { MiNoteUnread } from "@/models/note/NoteUnread.js";
import { MiPage } from "@/models/page/Page.js";
import { MiPageLike } from "@/models/page/PageLike.js";
import { MiPasswordResetRequest } from "@/models/auth/PasswordResetRequest.js";
import { MiPoll } from "@/models/poll/Poll.js";
import { MiPollVote } from "@/models/poll/PollVote.js";
import { MiPromoNote } from "@/models/promo/PromoNote.js";
import { MiPromoRead } from "@/models/promo/PromoRead.js";
import { MiRegistrationTicket } from "@/models/RegistrationTicket.js";
import { MiRegistryItem } from "@/models/RegistryItem.js";
import { MiRelay } from "@/models/Relay.js";
import { MiSignin } from "@/models/auth/Signin.js";
import { MiSwSubscription } from "@/models/SwSubscription.js";
import { MiUsedUsername } from "@/models/auth/UsedUsername.js";
import { MiUser } from "@/models/user/User.js";
import { MiUserIp } from "@/models/user/UserIp.js";
import { MiUserKeypair } from "@/models/user/UserKeypair.js";
import { MiUserList } from "@/models/user/UserList.js";
import { MiUserListFavorite } from "@/models/user/UserListFavorite.js";
import { MiUserListJoining } from "@/models/user/UserListJoining.js";
import { MiUserNotePining } from "@/models/user/UserNotePining.js";
import { MiUserPending } from "@/models/user/UserPending.js";
import { MiUserProfile } from "@/models/user/UserProfile.js";
import { MiUserPublickey } from "@/models/user/UserPublickey.js";
import { MiUserSecurityKey } from "@/models/user/UserSecurityKey.js";
import { MiWebhook } from "@/models/Webhook.js";
import { MiChannel } from "@/models/channel/Channel.js";
import { MiRetentionAggregation } from "@/models/RetentionAggregation.js";
import { MiRole } from "@/models/role/Role.js";
import { MiRoleAssignment } from "@/models/role/RoleAssignment.js";
import { MiFlash } from "@/models/flash/Flash.js";
import { MiFlashLike } from "@/models/flash/FlashLike.js";
import { MiUserMemo } from "@/models/user/UserMemo.js";

import { Config } from "@/config.js";
import MisskeyLogger from "@/logger.js";
import { bindThis } from "@/decorators.js";
import { IGIdentification } from "./models/ikimongo/Identification.js";
import { IGObservation } from "./models/ikimongo/Observation.js";

export const dbLogger = new MisskeyLogger("db");

const sqlLogger = dbLogger.createSubLogger("sql", "gray", false);

class MyCustomLogger implements Logger {
	@bindThis
	private highlight(sql: string) {
		return highlight.highlight(sql, {
			language: "sql",
			ignoreIllegals: true,
		});
	}

	@bindThis
	public logQuery(query: string, parameters?: any[]) {
		sqlLogger.info(this.highlight(query).substring(0, 100));
	}

	@bindThis
	public logQueryError(error: string, query: string, parameters?: any[]) {
		sqlLogger.error(this.highlight(query));
	}

	@bindThis
	public logQuerySlow(time: number, query: string, parameters?: any[]) {
		sqlLogger.warn(this.highlight(query));
	}

	@bindThis
	public logSchemaBuild(message: string) {
		sqlLogger.info(message);
	}

	@bindThis
	public log(message: string) {
		sqlLogger.info(message);
	}

	@bindThis
	public logMigration(message: string) {
		sqlLogger.info(message);
	}
}

export const entities = [
	MiAnnouncement,
	MiAnnouncementRead,
	MiMeta,
	MiInstance,
	MiApp,
	MiAuthSession,
	MiAccessToken,
	MiUser,
	MiUserProfile,
	MiUserKeypair,
	MiUserPublickey,
	MiUserList,
	MiUserListFavorite,
	MiUserListJoining,
	MiUserNotePining,
	MiUserSecurityKey,
	MiUsedUsername,
	MiFollowing,
	MiFollowRequest,
	MiMuting,
	MiRenoteMuting,
	MiBlocking,
	MiNote,
	MiNoteFavorite,
	MiNoteReaction,
	MiNoteThreadMuting,
	MiNoteUnread,
	MiPage,
	MiPageLike,
	MiGalleryPost,
	MiGalleryLike,
	MiDriveFile,
	MiDriveFolder,
	MiPoll,
	MiPollVote,
	MiEmoji,
	MiHashtag,
	MiSwSubscription,
	MiAbuseUserReport,
	MiRegistrationTicket,
	MiSignin,
	MiModerationLog,
	MiClip,
	MiClipNote,
	MiClipFavorite,
	MiAntenna,
	MiPromoNote,
	MiPromoRead,
	MiRelay,
	MiMutedNote,
	MiChannel,
	MiChannelFollowing,
	MiChannelFavorite,
	MiRegistryItem,
	MiAd,
	MiPasswordResetRequest,
	MiUserPending,
	MiWebhook,
	MiUserIp,
	MiRetentionAggregation,
	MiRole,
	MiRoleAssignment,
	MiFlash,
	MiFlashLike,
	MiUserMemo,
	IGObservation,
	IGIdentification,
	...charts,
];

const log = process.env.NODE_ENV !== "production";

export function createPostgresDataSource(config: Config) {
	return new DataSource({
		type: "postgres",
		host: config.db.host,
		port: config.db.port,
		username: config.db.user,
		password: config.db.pass,
		database: config.db.db,
		extra: {
			statement_timeout: 1000 * 10,
			...config.db.extra,
		},
		replication: config.dbReplications
			? {
					master: {
						host: config.db.host,
						port: config.db.port,
						username: config.db.user,
						password: config.db.pass,
						database: config.db.db,
					},
					slaves: config.dbSlaves!.map((rep) => ({
						host: rep.host,
						port: rep.port,
						username: rep.user,
						password: rep.pass,
						database: rep.db,
					})),
			  }
			: undefined,
		synchronize: process.env.NODE_ENV === "test",
		dropSchema: process.env.NODE_ENV === "test",
		cache:
			!config.db.disableCache && process.env.NODE_ENV !== "test"
				? {
						// dbをcloseしても何故かredisのコネクションが内部的に残り続けるようで、テストの際に支障が出るため無効にする(キャッシュも含めてテストしたいため本当は有効にしたいが...)
						type: "ioredis",
						options: {
							host: config.redis.host,
							port: config.redis.port,
							family: config.redis.family ?? 0,
							password: config.redis.pass,
							keyPrefix: `${config.redis.prefix}:query:`,
							db: config.redis.db ?? 0,
						},
				  }
				: false,
		logging: log,
		logger: log ? new MyCustomLogger() : undefined,
		maxQueryExecutionTime: 300,
		entities: entities,
		migrations: ["../../migration/*.js"],
	});
}
