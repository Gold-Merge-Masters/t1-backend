import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { CONFIG_DB } from 'src/config/config.export';
import { CreateShema1732742287641 } from './migrations/1732742287641-CreateShema';
import { CreateSources1732742598267 } from './migrations/1732742598267-CreateSources';

dotenv.config();

export const dataSourceUserOption: DataSourceOptions = {
  type: 'postgres',
  host: CONFIG_DB.DB_HOST,
  port: CONFIG_DB.DB_PORT,
  username: CONFIG_DB.DB_USER,
  password: CONFIG_DB.DB_PASSWORD,
  database: CONFIG_DB.DB_NAME,
  migrationsTableName: 'migrations',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
  migrations: [
    CreateShema1732742287641,
    CreateSources1732742598267
  ],
};
export const dataSource = new DataSource(dataSourceUserOption);