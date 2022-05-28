import { Request } from 'express';

export class PassportExtractors {
  static cookieExtractor(req: Request) {
    return req.cookies && req.cookies.refreshJwt ? req.cookies.refreshJwt : null;
  }
}
