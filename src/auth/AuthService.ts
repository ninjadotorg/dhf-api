import * as crypto from 'crypto';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';
import { TokenInfoInterface } from './TokenInfoInterface';

@Service()
export class AuthService {
    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public parseTokenFromRequest(req: express.Request): string | undefined {
        const authorization = req.header('authorization');

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'DHF') {
            this.log.info('Token provided by the client');
            return authorization.split(' ')[1];
        }

        this.log.info('No Token provided by the client');
        return undefined;
    }

    public getTokenInfo(token: string): Promise<TokenInfoInterface> {
        return new Promise((resolve, reject) => {
            try {
                const decodedToken = jwt.verify(token, env.jwt.secret) as any;
                return resolve(decodedToken.data as TokenInfoInterface);
            } catch (err) {
                return reject(err);
            }
        });
    }

    public generateToken(tokenInfo: TokenInfoInterface, maxAge: number = 3600): string {
        const token = jwt.sign({
            data: tokenInfo,
        }, env.jwt.secret, {
            expiresIn: maxAge,
            algorithm: 'HS256',
        });

        return token;
    }

    public verifyPassword(password: string, hash: string): boolean {
        return crypto.createHash('md5').update(password).digest('hex') === hash;
    }

    public generatePassword(password: string): string {
        return crypto.createHash('md5').update(password).digest('hex');
    }
}
