import { Strategy } from 'passport-jwt'

import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Logger, LOGGER_PROVIDER } from '@island.is/logging'
import { ACCESS_TOKEN_COOKIE_NAME } from '@island.is/judicial-system/consts'

import { environment } from '../../../environments'
import { Credentials, AuthUser } from './auth.types'

const cookieExtractor = (req: { cookies: { [x: string]: string } }) => {
  if (req && req.cookies) {
    return req.cookies[ACCESS_TOKEN_COOKIE_NAME]
  }
  return undefined
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: environment.auth.jwtSecret,
      passReqToCallback: true,
    })
  }

  validate(
    req: Request,
    { csrfToken, user }: Credentials,
  ): AuthUser | undefined {
    if (
      csrfToken &&
      `Bearer ${csrfToken}` !== req.headers.get('authorization')
    ) {
      this.logger.error('invalid csrf token')
      return undefined
    }

    return user
  }
}
