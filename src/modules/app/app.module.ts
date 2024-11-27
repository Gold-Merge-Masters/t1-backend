import { Module } from '@nestjs/common';
import { DemoModule } from '../demo/demo.module';
import { SchemaModule } from 'src/schema/schema.module';

@Module({
  imports: [
    SchemaModule,
    DemoModule
  ],
})
export class AppModule {}
