import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { CONFIG_DB } from 'src/config/config.export';
import { CreateSources1732019544815 } from './schema.seed';

dotenv.config();

export const dataSourceUserOption: DataSourceOptions = {
  type: 'postgres',
  host: CONFIG_DB.DB_HOST,
  port: CONFIG_DB.DB_PORT,
  username: CONFIG_DB.DB_USER,
  password: CONFIG_DB.DB_PASSWORD,
  database: CONFIG_DB.DB_NAME,
  migrationsTableName: 'migrations',
  migrations: [CreateSources1732019544815],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
};
export const dataSource = new DataSource(dataSourceUserOption);