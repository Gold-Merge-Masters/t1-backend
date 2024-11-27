import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { ClientDBModule } from 'src/schema/clients/clients.module';
import { SourceDBModule } from 'src/schema/source/source.module';

@Module({
  imports: [SourceDBModule, ClientDBModule],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule { }
