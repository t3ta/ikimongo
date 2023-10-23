/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MiAbuseUserReport } from '@/models/AbuseUserReport.js';
import { MiAccessToken } from '@/models/auth/AccessToken.js';
import { MiAd } from '@/models/Ad.js';
import { MiAnnouncement } from '@/models/announcement/Announcement.js';
import { MiAnnouncementRead } from '@/models/announcement/AnnouncementRead.js';
import { MiAntenna } from '@/models/Antenna.js';
import { MiApp } from '@/models/App.js';
import { MiAuthSession } from '@/models/auth/AuthSession.js';
import { MiBlocking } from '@/models/mute-block/Blocking.js';
import { MiChannelFollowing } from '@/models/channel/ChannelFollowing.js';
import { MiChannelFavorite } from '@/models/channel/ChannelFavorite.js';
import { MiClip } from '@/models/clip/Clip.js';
import { MiClipNote } from '@/models/clip/ClipNote.js';
import { MiClipFavorite } from '@/models/clip/ClipFavorite.js';
import { MiDriveFile } from '@/models/drive/DriveFile.js';
import { MiDriveFolder } from '@/models/drive/DriveFolder.js';
import { MiEmoji } from '@/models/Emoji.js';
import { MiFollowing } from '@/models/following/Following.js';
import { MiFollowRequest } from '@/models/following/FollowRequest.js';
import { MiGalleryLike } from '@/models/gallery/GalleryLike.js';
import { MiGalleryPost } from '@/models/gallery/GalleryPost.js';
import { MiHashtag } from '@/models/Hashtag.js';
import { MiInstance } from '@/models/Instance.js';
import { MiMeta } from '@/models/Meta.js';
import { MiModerationLog } from '@/models/ModerationLog.js';
import { MiMutedNote } from '@/models/mute-block/MutedNote.js';
import { MiMuting } from '@/models/mute-block/Muting.js';
import { MiRenoteMuting } from '@/models/mute-block/RenoteMuting.js';
import { MiNote } from '@/models/note/Note.js';
import { MiNoteFavorite } from '@/models/note/NoteFavorite.js';
import { MiNoteReaction } from '@/models/note/NoteReaction.js';
import { MiNoteThreadMuting } from '@/models/note/NoteThreadMuting.js';
import { MiNoteUnread } from '@/models/note/NoteUnread.js';
import { MiPage } from '@/models/page/Page.js';
import { MiPageLike } from '@/models/page/PageLike.js';
import { MiPasswordResetRequest } from '@/models/auth/PasswordResetRequest.js';
import { MiPoll } from '@/models/poll/Poll.js';
import { MiPollVote } from '@/models/poll/PollVote.js';
import { MiPromoNote } from '@/models/promo/PromoNote.js';
import { MiPromoRead } from '@/models/promo/PromoRead.js';
import { MiRegistrationTicket } from '@/models/RegistrationTicket.js';
import { MiRegistryItem } from '@/models/RegistryItem.js';
import { MiRelay } from '@/models/Relay.js';
import { MiSignin } from '@/models/auth/Signin.js';
import { MiSwSubscription } from '@/models/SwSubscription.js';
import { MiUsedUsername } from '@/models/auth/UsedUsername.js';
import { MiUser } from '@/models/user/User.js';
import { MiUserIp } from '@/models/user/UserIp.js';
import { MiUserKeypair } from '@/models/user/UserKeypair.js';
import { MiUserList } from '@/models/user/UserList.js';
import { MiUserListJoining } from '@/models/user/UserListJoining.js';
import { MiUserNotePining } from '@/models/user/UserNotePining.js';
import { MiUserPending } from '@/models/user/UserPending.js';
import { MiUserProfile } from '@/models/user/UserProfile.js';
import { MiUserPublickey } from '@/models/user/UserPublickey.js';
import { MiUserSecurityKey } from '@/models/user/UserSecurityKey.js';
import { MiUserMemo } from '@/models/user/UserMemo.js';
import { MiWebhook } from '@/models/Webhook.js';
import { MiChannel } from '@/models/channel/Channel.js';
import { MiRetentionAggregation } from '@/models/RetentionAggregation.js';
import { MiRole } from '@/models/role/Role.js';
import { MiRoleAssignment } from '@/models/role/RoleAssignment.js';
import { MiFlash } from '@/models/flash/Flash.js';
import { MiFlashLike } from '@/models/flash/FlashLike.js';
import { MiUserListFavorite } from '@/models/user/UserListFavorite.js';
import { IGIdentification } from '@/models/ikimongo/Identification.js';
import { IGObservation } from '@/models/ikimongo/Observation.js';
import type { Repository } from 'typeorm';

export {
	MiAbuseUserReport,
	MiAccessToken,
	MiAd,
	MiAnnouncement,
	MiAnnouncementRead,
	MiAntenna,
	MiApp,
	MiAuthSession,
	MiBlocking,
	MiChannelFollowing,
	MiChannelFavorite,
	MiClip,
	MiClipNote,
	MiClipFavorite,
	MiDriveFile,
	MiDriveFolder,
	MiEmoji,
	MiFollowing,
	MiFollowRequest,
	MiGalleryLike,
	MiGalleryPost,
	MiHashtag,
	MiInstance,
	MiMeta,
	MiModerationLog,
	MiMutedNote,
	MiMuting,
	MiRenoteMuting,
	MiNote,
	MiNoteFavorite,
	MiNoteReaction,
	MiNoteThreadMuting,
	MiNoteUnread,
	MiPage,
	MiPageLike,
	MiPasswordResetRequest,
	MiPoll,
	MiPollVote,
	MiPromoNote,
	MiPromoRead,
	MiRegistrationTicket,
	MiRegistryItem,
	MiRelay,
	MiSignin,
	MiSwSubscription,
	MiUsedUsername,
	MiUser,
	MiUserIp,
	MiUserKeypair,
	MiUserList,
	MiUserListFavorite,
	MiUserListJoining,
	MiUserNotePining,
	MiUserPending,
	MiUserProfile,
	MiUserPublickey,
	MiUserSecurityKey,
	MiWebhook,
	MiChannel,
	MiRetentionAggregation,
	MiRole,
	MiRoleAssignment,
	MiFlash,
	MiFlashLike,
	MiUserMemo,
	IGIdentification,
	IGObservation,
};

export type AbuseUserReportsRepository = Repository<MiAbuseUserReport>;
export type AccessTokensRepository = Repository<MiAccessToken>;
export type AdsRepository = Repository<MiAd>;
export type AnnouncementsRepository = Repository<MiAnnouncement>;
export type AnnouncementReadsRepository = Repository<MiAnnouncementRead>;
export type AntennasRepository = Repository<MiAntenna>;
export type AppsRepository = Repository<MiApp>;
export type AuthSessionsRepository = Repository<MiAuthSession>;
export type BlockingsRepository = Repository<MiBlocking>;
export type ChannelFollowingsRepository = Repository<MiChannelFollowing>;
export type ChannelFavoritesRepository = Repository<MiChannelFavorite>;
export type ClipsRepository = Repository<MiClip>;
export type ClipNotesRepository = Repository<MiClipNote>;
export type ClipFavoritesRepository = Repository<MiClipFavorite>;
export type DriveFilesRepository = Repository<MiDriveFile>;
export type DriveFoldersRepository = Repository<MiDriveFolder>;
export type EmojisRepository = Repository<MiEmoji>;
export type FollowingsRepository = Repository<MiFollowing>;
export type FollowRequestsRepository = Repository<MiFollowRequest>;
export type GalleryLikesRepository = Repository<MiGalleryLike>;
export type GalleryPostsRepository = Repository<MiGalleryPost>;
export type HashtagsRepository = Repository<MiHashtag>;
export type InstancesRepository = Repository<MiInstance>;
export type MetasRepository = Repository<MiMeta>;
export type ModerationLogsRepository = Repository<MiModerationLog>;
export type MutedNotesRepository = Repository<MiMutedNote>;
export type MutingsRepository = Repository<MiMuting>;
export type RenoteMutingsRepository = Repository<MiRenoteMuting>;
export type NotesRepository = Repository<MiNote>;
export type NoteFavoritesRepository = Repository<MiNoteFavorite>;
export type NoteReactionsRepository = Repository<MiNoteReaction>;
export type NoteThreadMutingsRepository = Repository<MiNoteThreadMuting>;
export type NoteUnreadsRepository = Repository<MiNoteUnread>;
export type PagesRepository = Repository<MiPage>;
export type PageLikesRepository = Repository<MiPageLike>;
export type PasswordResetRequestsRepository = Repository<MiPasswordResetRequest>;
export type PollsRepository = Repository<MiPoll>;
export type PollVotesRepository = Repository<MiPollVote>;
export type PromoNotesRepository = Repository<MiPromoNote>;
export type PromoReadsRepository = Repository<MiPromoRead>;
export type RegistrationTicketsRepository = Repository<MiRegistrationTicket>;
export type RegistryItemsRepository = Repository<MiRegistryItem>;
export type RelaysRepository = Repository<MiRelay>;
export type SigninsRepository = Repository<MiSignin>;
export type SwSubscriptionsRepository = Repository<MiSwSubscription>;
export type UsedUsernamesRepository = Repository<MiUsedUsername>;
export type UsersRepository = Repository<MiUser>;
export type UserIpsRepository = Repository<MiUserIp>;
export type UserKeypairsRepository = Repository<MiUserKeypair>;
export type UserListsRepository = Repository<MiUserList>;
export type UserListFavoritesRepository = Repository<MiUserListFavorite>;
export type UserListJoiningsRepository = Repository<MiUserListJoining>;
export type UserNotePiningsRepository = Repository<MiUserNotePining>;
export type UserPendingsRepository = Repository<MiUserPending>;
export type UserProfilesRepository = Repository<MiUserProfile>;
export type UserPublickeysRepository = Repository<MiUserPublickey>;
export type UserSecurityKeysRepository = Repository<MiUserSecurityKey>;
export type WebhooksRepository = Repository<MiWebhook>;
export type ChannelsRepository = Repository<MiChannel>;
export type RetentionAggregationsRepository = Repository<MiRetentionAggregation>;
export type RolesRepository = Repository<MiRole>;
export type RoleAssignmentsRepository = Repository<MiRoleAssignment>;
export type FlashsRepository = Repository<MiFlash>;
export type FlashLikesRepository = Repository<MiFlashLike>;
export type UserMemoRepository = Repository<MiUserMemo>;
export type IGIdentificationsRepository = Repository<IGIdentification>;
export type IGObservationsRepository = Repository<IGObservation>;
