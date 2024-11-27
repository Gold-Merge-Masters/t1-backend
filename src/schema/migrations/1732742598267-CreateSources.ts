import { In, MigrationInterface, QueryRunner } from "typeorm";
import { Source } from "../source/source.entity";

export class CreateSources1732742598267 implements MigrationInterface {

  private sources = [
    { source: "Bank", rate: 20 },
    { source: "Bank2", rate: 15 },
    { source: "Fitness", rate: 1 },
    { source: "ISP", rate: 5 },
    { source: "source_cd", rate: 1 },
    { source: "Stream", rate: 3 },
    { source: "Telco", rate: 10 },
    { source: "Travel", rate: 2 }
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const sourceRep = queryRunner.connection.getRepository(Source);

    const dbSources = this.sources.map(source => sourceRep.create({
      source: source.source,
      rate: source.rate
    }));

    await sourceRep.save(dbSources);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sourceRep = queryRunner.connection.getRepository(Source);

    const sources = await sourceRep.find({
      where: {
        source: In(this.sources)
      }
    });
    await sourceRep.remove(sources);
  }
}
