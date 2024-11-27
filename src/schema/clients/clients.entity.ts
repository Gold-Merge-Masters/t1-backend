import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { GoldRecordMeta } from './client.interface';

@Entity({ name: 'clients' })
export class Client {

  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'client_fio_full' })
  clientFioFull: string

  @Column({ type: 'jsonb', name: 'client_first_name' })
  clientFirstName: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_middle_name' })
  clientMiddleName: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_last_name' })
  clientLastName: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_bday' })
  clientBday: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_bplace' })
  clientBplace: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_cityzen' })
  clientCityzen: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_resident_cd' })
  clientResidentCd: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_gender' })
  clientGender: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_marital_cd' })
  clientMaritalCd: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_graduate' })
  clientGraduate: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_child_cnt' })
  clientChildCnt: GoldRecordMeta<number>;

  @Column({ type: 'jsonb', name: 'client_mil_cd' })
  clientMilCd: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_zagran_cd' })
  clientZagranCd: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_inn' })
  clientInn: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_snils' })
  clientSnils: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'client_vip_cd' })
  clientVipCd: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'contact_email' })
  contactEmail: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'contact_phone' })
  contactPhone: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'addr_region' })
  addrRegion: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'addr_country' })
  addrCountry: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'addr_zip' })
  addrZip: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'addr_street' })
  addrStreet: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'addr_house' })
  addrHouse: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'addr_flat' })
  addrFlat: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'addr_city' })
  addrCity: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'fin_rating' })
  finRating: GoldRecordMeta<number>[];

  @Column({ type: 'jsonb', name: 'fin_loan_limit' })
  finLoanLimit: GoldRecordMeta<number>[];

  @Column({ type: 'jsonb', name: 'fin_loan_value' })
  finLoanValue: GoldRecordMeta<number>[];

  @Column({ type: 'jsonb', name: 'fin_loan_debt' })
  finLoanDebt: GoldRecordMeta<number>[];

  @Column({ type: 'jsonb', name: 'fin_loan_percent' })
  finLoanPercent: GoldRecordMeta<number>[];

  @Column({ type: 'jsonb', name: 'stream_favorite_show' })
  streamFavoriteShow: GoldRecordMeta<string>[]

  @Column({ type: 'jsonb', name: 'stream_duration' })
  streamDuration: GoldRecordMeta<number>[];
}