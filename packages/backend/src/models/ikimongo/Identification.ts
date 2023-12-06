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
} from 'typeorm';
import { id } from '@/models/util/id.js';
import * as IGTypes from '@/IGTypes.js';
import { MiUser } from '@/models/user/User.js';
import { IGObservation } from '@/models/ikimongo/Observation.js';
import { MiNote } from '@/models/note/Note.js';

@Entity('identification')
@Index(['observationId', 'userId', 'id'])
export class IGIdentification {
  @PrimaryColumn(id())
  public readonly id: string;

  @Index()
  @Column({ ...id(), nullable: true })
  public noteId: MiNote['id'] | null;

  @OneToOne(() => MiNote, {
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
    comment: 'The created date of the Observation.',
    nullable: true,
  })
  public updatedAt: Date | null;

  @Index()
  @Column({
    ...id(),
    comment: 'dwc:identifiedBy http://rs.tdwg.org/dwc/terms/identifiedBy',
  })
  public userId: MiUser['id'];

  @ManyToOne(() => MiUser, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  public user: MiUser | null;

  @Index()
  @Column({
    ...id(),
    comment: 'dwc:occurenceID http://rs.tdwg.org/dwc/terms/identificationID',
  })
  public observationId: IGObservation['id'];

  @ManyToOne(() => IGObservation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public observation: IGObservation;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'The host of owner. It will be null if the user in local.',
  })
  public userHost: string | null;

  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:scientificName http://rs.tdwg.org/dwc/terms/scientificName',
  })
  public scientificName: string;

  @Column('varchar', {
    length: 2000,
    nullable: true,
    comment: 'dwc:taxonID http://rs.tdwg.org/dwc/terms/taxonID',
  })
  public taxonId: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:vernacularName http://rs.tdwg.org/dwc/terms/vernacularName',
  })
  public vernacularName: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:taxonRank http://rs.tdwg.org/dwc/terms/taxonRank',
  })
  public taxonRank: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:kingdom http://rs.tdwg.org/dwc/terms/kingdom',
  })
  public kingdom: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:phylum http://rs.tdwg.org/dwc/terms/phylum',
  })
  public phylum: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:class http://rs.tdwg.org/dwc/terms/class',
  })
  public class: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:order http://rs.tdwg.org/dwc/terms/order',
  })
  public order: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:family http://rs.tdwg.org/dwc/terms/family',
  })
  public family: string;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'dwc:genus http://rs.tdwg.org/dwc/terms/genus',
  })
  public genus: string;

  @Index()
  @Column('char', {
    length: 128,
    nullable: true,
    comment: 'dwc:language http://rs.tdwg.org/dwc/terms/countryCode',
  })
  public language: string;

  @Column('varchar', {
    length: 1024,
    nullable: true,
    comment: 'The description of the Identification.',
  })
  public description: string;

  constructor(data: Partial<IGIdentification>) {
    if (data == null) return;

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v;
    }
  }
}
