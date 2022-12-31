import { z } from 'zod';
// The condition to accept a password, according to graphql signup mutation
export const passwordSchema = z.string().min(6);
