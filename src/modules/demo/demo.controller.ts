import { Body, Controller, Get, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DemoService } from './demo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload.dto';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('demo')
export class DemoController {
  @Inject()
  private readonly demoService: DemoService

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  public async uploadCsv(
    @Body() dto: UploadFileDto, 
    @UploadedFile() file: Express.Multer.File
  ): Promise<boolean> {
    return this.demoService.uploadCsv(file);
  }

  @Get('clients')
  public async getClients() {
    return this.demoService.getClients();
  }
}
