import { Body, Controller, Post } from '@nestjs/common';
import { SendContactDataService } from './send-contact-data.service';
import { ContactDataFormDto } from './dto/contactDataForm.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('contact')
@Controller('send-contact-data')
@Throttle({ default: { limit: 5, ttl: 60000 } })
export class SendContactDataController {
  constructor(
    private readonly sendContactDataService: SendContactDataService,
  ) {}

  @Post('send')
  @ApiOperation({
    summary: 'enviar datos de contacto a Twilio',
    description:
      'Consumido por el componente contac-area del frontend; utiliza el servicio http-services.',
  })
  @ApiResponse({ status: 201, description: 'Datos enviados Correctamente' })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados.' })
  @ApiBody({ type: ContactDataFormDto })
  sendContactForm(@Body() ContactData: ContactDataFormDto) {
    const response = this.sendContactDataService.sendToSendGrid(ContactData);
    return response;
  }
}
