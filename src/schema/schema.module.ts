import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceUserOption } from './datasource';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { ClientDBModule } from './clients/clients.module';
import { SourceDBModule } from './source/source.module';

@Module({
  imports: [
    SourceDBModule,
    ClientDBModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceUserOption,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class SchemaModule {}
