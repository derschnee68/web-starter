import { z } from 'zod';
// The condition to accept a password, according to graphql signup mutation
export const passwordSchema = z
  .string()
  .min(8, { message: 'Your password is not strong enough. Your password must be at least 8 characters.' })
  .regex(new RegExp(/[a-z]/, 'g'), {
    message: 'Your password is not strong enough. It should contain at least one letter.',
  })
  .regex(new RegExp(/[0-9]/, 'g'), {
    message: 'Your password is not strong enough. It should contain at least one number (0-9).',
  });
