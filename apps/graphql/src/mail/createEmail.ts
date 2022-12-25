import { render } from 'ejs';
import type { Attachment } from 'nodemailer/lib/mailer';
import type { z } from 'zod';
import type { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

export default function createEmail<T extends object>(
  mjml: {
    html: string;
    attachments: Attachment[];
  } | null,
  text: string | null,
  schema: z.ZodType<T>,
  defaultOptions?: Partial<ISendMailOptions>,
) {
  return async (options: ISendMailOptions & { to: string }, vars: T) => {
    const trusted = {
      ...schema.parse(vars),
      _app: {
        url: process.env.APP_URI,
        label: process.env.APP_URI?.replace(/https?:\/\//, ''),
      },
    };

    return {
      html: mjml?.html ? await render(mjml.html, trusted, { async: true }) : undefined,
      text: text ? await render(text, trusted, { async: true }) : undefined,
      attachments: mjml?.attachments,
      ...defaultOptions,
      ...options,
    };
  };
}
