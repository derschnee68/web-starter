import type { ZodString } from 'zod';
import { z } from 'zod';
import { isBrowser, isServer } from './utils/platform';

const raw = {
  ...(isServer() ? process.env : {}),
  NEXT_PUBLIC_URI: process.env.NEXT_PUBLIC_URI,
  NEXT_PUBLIC_GRAPHQL_URI: process.env.NEXT_PUBLIC_GRAPHQL_URI,
};

type PublicVariables = Extract<keyof typeof raw, `NEXT_PUBLIC_${string}`>;
type PublicSchema = Record<PublicVariables, ZodString>;

const publicSchema = z.lazy(() => {
  const keys: PublicVariables[] = Object.keys(raw).filter<PublicVariables>((k: string): k is PublicVariables =>
    k.startsWith('NEXT_PUBLIC_'),
  );

  return z.object(
    keys.reduce((schema, key) => {
      if (!(key in schema)) {
        schema[key] = z.string().nonempty();
      }

      return schema;
    }, {} as PublicSchema),
  );
});

const privateSchema = z.intersection(
  publicSchema,
  z.object({
    NEXT_PUBLIC_URI: z.string().url(),
    NEXT_PUBLIC_GRAPHQL_URI: z.string().url(),
  }),
);

const schema = isBrowser() ? publicSchema : privateSchema;
const env = schema.parse(raw) as z.infer<typeof privateSchema>;

export default env;
