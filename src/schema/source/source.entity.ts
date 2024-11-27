import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sources' })
export class Source {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  source: string;

  @Column()
  rate: number;
}