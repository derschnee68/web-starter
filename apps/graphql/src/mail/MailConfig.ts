import type {
  MailerOptions,
  MailerOptionsFactory,
} from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Injectable } from '@nestjs/common';
import Config from '../config/Config';

@Injectable()
export class MailConfig implements MailerOptionsFactory {
  constructor(private readonly config: Config) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    return {
      transport: this.config.get('SMTP_URI'),
      defaults: {
        from: '"isquare train" <train@isquare.ai>',
      },
      template: {
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
