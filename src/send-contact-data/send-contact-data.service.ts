import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { ContactDataFormDto } from './dto/contactDataForm.dto';
import { buildClientEmail } from './templates/client-email.template';

@Injectable()
export class SendContactDataService {
  private readonly logger = new Logger(SendContactDataService.name);
  private readonly apiInstance: any;

  constructor(private configService: ConfigService) {
    const apiKeyValue = this.configService.get<string>('BREVO_API_KEY');
    if (!apiKeyValue) {
      throw new Error('BREVO_API_KEY no está configurada');
    }
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = apiKeyValue;
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.logger.log('Brevo API Key configurada correctamente');
  }

  private async executeSend(data: any): Promise<any> {
    return this.apiInstance.sendTransacEmail(data);
  }

  async sendToSendGrid(contactData: ContactDataFormDto) {
    const contactInfo = [
      contactData.email ? `Email: ${contactData.email}` : null,
      contactData.phone ? `Teléfono: ${contactData.phone}` : null,
    ].filter(Boolean).join(' | ');

    const msgToMe = {
      sender: { name: 'HouseCrafting', email: 'housecrafting44@gmail.com' },
      to: [{ email: 'housecrafting44@gmail.com' }],
      subject: `Nuevo contacto: ${contactData.name}`,
      htmlContent: `
        <p><strong>Nombre:</strong> ${contactData.name}</p>
        <p><strong>Contacto:</strong> ${contactInfo}</p>
        <p><strong>Servicios:</strong> ${contactData.services.join(', ')}</p>
        ${contactData.description ? `<p><strong>Descripción:</strong> ${contactData.description}</p>` : ''}
      `,
    };

    try {
      await this.executeSend(msgToMe);
      this.logger.log('Email interno enviado correctamente');
    } catch (error: any) {
      const detail = error.response?.body || error;
      this.logger.error('Error al enviar email interno:', JSON.stringify(detail));
    }

    if (contactData.email) {
      const msgToClient = {
        sender: { name: 'HouseCrafting', email: 'housecrafting44@gmail.com' },
        to: [{ email: contactData.email }],
        subject: `Gracias por contactar, ${contactData.name}`,
        htmlContent: buildClientEmail(contactData),
      };

      try {
        await this.executeSend(msgToClient);
        this.logger.log('Email al cliente enviado correctamente');
      } catch (error: any) {
        const detail = error.response?.body || error;
        this.logger.error('Error al enviar email al cliente:', JSON.stringify(detail));
      }
    }

    return { message: 'Solicitud procesada correctamente' };
  }
}