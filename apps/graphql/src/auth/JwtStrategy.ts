import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Config from '../config/Config';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: Config) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_PUBLIC_KEY'),
    });
  }

  /**
   * At this point, Passport has verified that the user token is valid.
   * @param payload
   * @return {Promise<Loaded<User, never> | null>}
   */
  validate(payload: unknown) {
    if (!(typeof payload === 'object' && payload !== null && 'sub' in payload)) {
      return null;
    }

    return (payload as { sub?: string }).sub ?? null;
  }
}
