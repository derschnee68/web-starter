import { z } from 'zod';
import createEmail from '../../createEmail';
import template from './activateAccount.mjml';
import txt from './activateAccount.txt';

const activateAccount = createEmail(
  template,
  txt,
  z.object({
    token: z.string(),
  }),
  {
    subject: 'Activate your account',
  },
);

export default activateAccount;
