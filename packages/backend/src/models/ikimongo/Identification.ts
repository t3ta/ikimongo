/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { id } from '@/models/util/id.js';
import * as IGTypes from '@/IGTypes.js';
import { MiUser } from '@/models/User.js';
import { IGObservation } from '@/models/ikimongo/Observation.js';
import { MiNote } from '@/models/Note.js';

@Entity('drive_file')
@Index(['observationId', 'userId', 'id'])
export class IGIdentification {
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

	@ManyToOne(type => IGObservation, {
		onDelete: 'CASCADE',
	})
	@Column({
		...id(),
		nullable: true,
		comment: 'The Observation ID corresponding to the Identification.',
	})
	public observation: IGObservation | null;

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

	@Column('varchar', {
		length: 256,
		comment: 'The scientific names of the Observation.',
	})
	public scientificNames: [string];

	@Index()
	@Column('varchar', {
		length: 128,
		comment: 'The common names of the Observation',
	})
	public commonNames: {[key: string]: string};

	@Index()
	@Column({
		type: 'enum',
		enum: IGTypes.taxonomicRanks,
		default: IGTypes.taxonomicRanks[6], // 'species'
	})
	public taxonomicRank: string;

	@Index()
	@Column('json')
	public taxon: IGTypes.Taxon;

	@Column('varchar', {
		length: 1024,
		comment: 'The description of the Identification.',
	})
	public description: string;
}

