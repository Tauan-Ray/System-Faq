import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommonApiResponses } from './common-api-responses.decorator';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary:
      'Mostra uma lista com registros relacionados, como: Nome, pergunta, categoria e resposta',
  })
  @CommonApiResponses()
  getFaq(): Promise<any[]> {
    return this.appService.getFaq();
  }
}
