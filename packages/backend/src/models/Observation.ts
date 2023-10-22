/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { type } from 'os';
import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { id } from '@/models/util/id.js';
import { MiUser } from '@/models/User.js';
import { MiNote } from './Note.js';
import { MiDriveFile } from './DriveFile.js';

@Entity('observation')
@Index(['userId', 'id'])
export class IGObservation {
	@PrimaryColumn(id())
	public id: string;

	@OneToOne(type => MiNote, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public note: MiNote | null;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the Observation.',
	})
	public createdAt: Date;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The updated date of the Observation.',
	})
	public updatedAt: Date | null;

	@Index()
	@Column({
		...id(),
		comment: 'The owner Id.',
	})
	public userId: MiUser['id'];

	@ManyToOne(type => MiUser, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public user: MiUser | null;

	@Index()
	@Column('varchar', {
		length: 128, nullable: true,
		comment: 'The host of owner. It will be null if the user in local.',
	})
	public userHost: string | null;

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

	@Index()
	@Column('timestamp with time zone', {
		nullable: true,
		comment: 'The updated date of the Observation.',
	})
	public date: Date | null;

	@Column('varchar', {
		length: 256,
		nullable: true,
		comment: 'The location name of the Observation.',
	})
	public locationName: string | null;

	@Column('point', {
		nullable: true,
		comment: 'The location of the Observation.',
	})
	public location: string | null;

	constructor(data: Partial<IGObservation>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}

