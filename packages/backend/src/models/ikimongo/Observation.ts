/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { type } from 'os';
import {
  PrimaryColumn,
  Entity,
  Index,
  JoinColumn,
  Column,
  ManyToOne,
  OneToOne,
  Point,
} from 'typeorm';
import { id } from '@/models/util/id.js';
import { MiUser } from '@/models/user/User.js';
import { MiNote } from '../note/Note.js';
import { MiDriveFile } from '../drive/DriveFile.js';

@Entity('observation')
@Index(['userId', 'noteId', 'id'])
export class IGObservation {
  @PrimaryColumn(id())
  public id: string;

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
    comment: 'The updated date of the Observation.',
    nullable: true,
  })
  public updatedAt: Date | null;

  @Index()
  @Column({
    ...id(),
    comment: 'dwc:recordedBy http://rs.tdwg.org/dwc/terms/recordedBy',
  })
  public userId: MiUser['id'];

  @ManyToOne(() => MiUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user: MiUser | null;

  @Index()
  @Column('varchar', {
    length: 128,
    nullable: true,
    comment: 'The host of owner. It will be null if the user in local.',
  })
  public userHost: string | null;

  @Index()
  @Column({
    ...id(),
    array: true,
    default: '{}',
  })
  public fileIds: MiDriveFile['id'][];

  @Index()
  @Column('varchar', {
    length: 256,
    array: true,
    default: '{}',
  })
  public attachedFileTypes: string[];

  @Index()
  @Column('timestamp with time zone', {
    nullable: true,
    comment: 'dwc:eventDate http://rs.tdwg.org/dwc/terms/eventDate',
  })
  public date: Date | null;

  @Column('point', {
    nullable: true,
    comment: 'The location of the Observation.',
    transformer: {
      to: (v: Point | null) => {
        if (v == null) return null;
        return v.coordinates[0] + ', ' + v.coordinates[1];
      },
      from: (v: any | null) => {
        if (v == null) return null;
        return {
          type: 'Point',
          coordinates: [v.x, v.y],
        };
      },
    },
  })
  public location: Point | null;

  constructor(data: Partial<IGObservation>) {
    if (data == null) return;

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v;
    }
  }
}
