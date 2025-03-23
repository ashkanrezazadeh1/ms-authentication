import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/auth/entity/base.entity';

@Entity()
export class Identity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_login: Date;
}
