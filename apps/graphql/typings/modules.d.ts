/**
 * MJML files loaded a ready to go.
 */
declare module '*.mjml' {
  import type { Attachment } from 'nodemailer/lib/mailer';
  const template: {
    html: string;
    attachments: Attachment[];
  };

  export default template;
}

/**
 * MJML files loaded as HTML only (great for previews).
 */
declare module '!mjml-with-images-loader?onlyHtml*.mjml' {
  const template: string;

  export default template;
}

declare module '*.txt' {
  const text: string;
  export default text;
}

declare module '*.sh' {
  const script: string;
  export default script;
}
