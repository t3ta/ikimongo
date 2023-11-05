/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {
	PrimaryColumn,
	Entity,
	Index,
	JoinColumn,
	Column,
	ManyToOne,
	OneToOne,
} from "typeorm";
import { id } from "@/models/util/id.js";
import * as IGTypes from "@/IGTypes.js";
import { MiUser } from "@/models/user/User.js";
import { IGObservation } from "@/models/ikimongo/Observation.js";
import { MiNote } from "@/models/note/Note.js";

@Entity("identification")
@Index(["observationId", "userId", "id"])
export class IGIdentification {
	@PrimaryColumn(id())
	public id: string;

	@OneToOne((type) => MiNote, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	public note: MiNote | null;

	@Index()
	@Column("timestamp with time zone", {
		comment: "The created date of the Observation.",
	})
	public createdAt: Date;

	@Index()
	@Column("timestamp with time zone", {
		comment: "The created date of the Observation.",
		nullable: true,
	})
	public updatedAt: Date | null;

	@Index()
	@Column({
		...id(),
		comment: "The ID of author.",
	})
	public userId: MiUser["id"];

	@ManyToOne((type) => MiUser, {
		onDelete: "SET NULL",
	})
	@JoinColumn()
	public user: MiUser | null;

	@Index()
	@Column({
		...id(),
		comment: "The Observation ID.",
	})
	public observationId: IGObservation["id"];

	@ManyToOne((type) => IGObservation, {
		onDelete: "CASCADE",
	})
	@Column({
		...id(),
		comment: "The Observation ID corresponding to the Identification.",
	})
	public observation: IGObservation;

	@Index()
	@Column("varchar", {
		length: 128,
		nullable: true,
		comment: "The host of owner. It will be null if the user in local.",
	})
	public userHost: string | null;

	@Column("varchar", {
		length: 128,
		comment: "The scientific names of the Observation.",
	})
	public scientificName: string;

	@Index()
	@Column("varchar", {
		length: 128,
		comment: "The common names of the Observation",
	})
	public japaneseName: string;

	@Index()
	@Column({
		type: "enum",
		enum: IGTypes.taxonomicRanks,
		default: IGTypes.taxonomicRanks[6], // 'species'
	})
	public taxonomicRank: string;

	@Column("jsonb", {
		default: {},
	})
	public taxon: IGTypes.Taxon;

	@Column("varchar", {
		length: 1024,
		comment: "The description of the Identification.",
	})
	public description: string;

	constructor(data: Partial<IGIdentification>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}

export type IIGIdentification = {
	japaneseName?: string;
	scientificName?: string;
	taxonomicRank?: string;
	taxon?: IGTypes.Taxon;
};
