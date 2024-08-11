import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  createdBy?: string;
  @CreateDateColumn({ nullable: true })
  createdDate?: Date;
  @Column({ nullable: true })
  lastModifiedBy?: string;
  @UpdateDateColumn({ nullable: true })
  lastModifiedDate?: Date;
}
