/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { type } from 'os';
import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { id } from '@/models/util/id.js';
import { MiUser } from '@/models/User.js';
import { MiNote } from '../Note.js';
import { MiDriveFile } from '../DriveFile.js';
import { IGIdentification } from './Identification.js';

@Entity('observation')
@Index(['noteId', 'userId', 'id'])
export class IGObservation {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the Observation.',
	})
	public createdAt: Date;

	@OneToOne(type => MiNote, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public noteId: MiNote;

	@ManyToOne(type => MiUser, {
		onDelete: 'SET NULL',
	})
	@JoinColumn()
	public user: MiUser | null;

	@Index()
	@Column('varchar', {
		length: 128, nullable: true,
		comment: 'The host of owner. It will be null if the user in local.',
	})
	public userHost: string | null;

	@ManyToOne(type => IGIdentification, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public identifications: [IGIdentification];

	@Index()
	@Column({
		...id(),
		array: true, default: '{}',
	})
	public fileIds: MiDriveFile['id'][];

	@Index()
	@Column('varchar', {
		length: 256, array: true, default: '{}',
	})
	public attachedFileTypes: string[];
}

