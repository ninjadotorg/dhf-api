import { Request } from 'express';
import * as MockExpressRequest from 'mock-express-request';
import * as nock from 'nock';

import { AuthService } from '../../../src/auth/AuthService';
import { env } from '../../../src/env';
import { LogMock } from '../lib/LogMock';

describe('AuthService', () => {

    let authService: AuthService;
    let log: LogMock;
    beforeEach(() => {
        log = new LogMock();
        authService = new AuthService(log);
    });

    describe('parseTokenFromRequest', () => {
        test('Should return the token without DHF', () => {
            const req: Request = new MockExpressRequest({
                headers: {
                    Authorization: 'DHF 1234',
                },
            });
            const token = authService.parseTokenFromRequest(req);
            expect(token).toBe('1234');
        });

        test('Should return undefined if there is no DHF', () => {
            const req: Request = new MockExpressRequest({
                headers: {
                    Authorization: 'Basic 1234',
                },
            });
            const token = authService.parseTokenFromRequest(req);
            expect(token).toBeUndefined();
            expect(log.infoMock).toBeCalledWith('No Token provided by the client', []);
        });

        test('Should return undefined if there is no "Authorization" header', () => {
            const req: Request = new MockExpressRequest();
            const token = authService.parseTokenFromRequest(req);
            expect(token).toBeUndefined();
            expect(log.infoMock).toBeCalledWith('No Token provided by the client', []);
        });
    });

    describe('getTokenInfo', () => {
        test('Should get the tokeninfo', async (done) => {
            const token = authService.generateToken({ user_id: 5 }, 3600);
            const tokenInfo = await authService.getTokenInfo(token);
            expect(tokenInfo.user_id).toBe(5);
            done();
        });

        test('Should fail due to invalid token', async (done) => {
            try {
                await authService.getTokenInfo('1234');
            } catch (error) {
                expect(error.message).toBe('jwt malformed');
            }
            done();
        });
    });

});
