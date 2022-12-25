import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description:
    'JWT registered claims as described in the [RFC7519](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)',
})
export default class JwtPayload {
  @Field(() => String, { description: 'The JWT issuer' })
  iss!: string;

  @Field(() => String, { description: 'The JWT subject' })
  sub!: string;

  @Field(() => String, { description: 'The JWT audience' })
  aud!: string;

  @Field(() => Int, { description: 'When the JWT expires.' })
  exp!: number;

  @Field(() => Int, { description: 'When the JWT is considered as valid.', nullable: true })
  nbf!: number | null;

  @Field(() => Int, { description: 'When the JWT was issued.' })
  iat!: number;

  @Field(() => String, { description: 'The JWT ID' })
  jti!: string;
}
