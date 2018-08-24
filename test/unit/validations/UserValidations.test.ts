import { validate } from 'class-validator';

import { User } from '../../../src/api/models/User';

describe('UserValidations', () => {

    test('User should always have a email', async (done) => {
        const user = new User();
        const errorsOne = await validate(user);
        user.email = 'test@test.com';
        const errorsTwo = await validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('User validation should succeed with all required fields', async (done) => {
        const user = new User();
        user.email = 'test@test.com';
        user.password = '123456';
        user.deleted = 0;
        user.status = 0;
        user.updatedAt = new Date();
        user.createdAt = new Date();
        const errors = await validate(user);
        console.log(errors);
        expect(errors.length).toEqual(0);
        done();
    });

});
