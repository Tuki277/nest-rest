import { snowflake } from 'src/common/common';
import { EAppRoles } from 'src/common/enum';
import { Entity, Column, DeepPartial, BaseEntity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 255 })
  username: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column({ nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName: string;

  @Column('int', { nullable: true })
  age: number;

  @Column({
    default: false,
    name: 'is_active',
  })
  isActive: boolean;

  @Column({
    nullable: true,
    type: 'text',
    enum: EAppRoles,
    array: true,
  })
  roles?: string[];

  constructor(partial: DeepPartial<User>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...partial });
  }
}
