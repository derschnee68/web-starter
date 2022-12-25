import { z } from 'zod';
import createEmail from '../../createEmail';
import template from './resetPassword.mjml';
import txt from './resetPassword.txt';

const resetPassword = createEmail(
  template,
  txt,
  z.object({
    token: z.string(),
  }),
  {
    subject: 'Reset your password',
  },
);

export default resetPassword;
