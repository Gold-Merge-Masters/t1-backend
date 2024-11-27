import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShema1732742287641 implements MigrationInterface {
  name = 'CreateShema1732742287641'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.query(`CREATE TABLE "sources" ("id" SERIAL NOT NULL, "source" character varying NOT NULL, "rate" integer NOT NULL, CONSTRAINT "UQ_ca3596e9da0d87f234655d5b21a" UNIQUE ("source"), CONSTRAINT "PK_85523beafe5a2a6b90b02096443" PRIMARY KEY ("id"))`);
      await transactionalEntityManager.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "client_fio_full" character varying NOT NULL, "client_first_name" jsonb NOT NULL, "client_middle_name" jsonb NOT NULL, "client_last_name" jsonb NOT NULL, "client_bday" jsonb NOT NULL, "client_bplace" jsonb NOT NULL, "client_cityzen" jsonb NOT NULL, "client_resident_cd" jsonb NOT NULL, "client_gender" jsonb NOT NULL, "client_marital_cd" jsonb NOT NULL, "client_graduate" jsonb NOT NULL, "client_child_cnt" jsonb NOT NULL, "client_mil_cd" jsonb NOT NULL, "client_zagran_cd" jsonb NOT NULL, "client_inn" jsonb NOT NULL, "client_snils" jsonb NOT NULL, "client_vip_cd" jsonb NOT NULL, "contact_email" jsonb NOT NULL, "contact_phone" jsonb NOT NULL, "addr_region" jsonb NOT NULL, "addr_country" jsonb NOT NULL, "addr_zip" jsonb NOT NULL, "addr_street" jsonb NOT NULL, "addr_house" jsonb NOT NULL, "addr_flat" jsonb NOT NULL, "addr_city" jsonb NOT NULL, "fin_rating" jsonb NOT NULL, "fin_loan_limit" jsonb NOT NULL, "fin_loan_value" jsonb NOT NULL, "fin_loan_debt" jsonb NOT NULL, "fin_loan_percent" jsonb NOT NULL, "stream_favorite_show" jsonb NOT NULL, "stream_duration" jsonb NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
      await transactionalEntityManager.query(`CREATE INDEX "IDX_5d4a5085ac9c63f50977bdca1f" ON "clients" ("client_fio_full") `);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_5d4a5085ac9c63f50977bdca1f"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "sources"`);
  }

}
