import { Connection } from 'typeorm/connection/Connection';

import { Role } from '../../api/models/Role';
import { Factory, Seed } from '../../lib/seed/types';

export class GenerateRoles implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await em.query('delete from role');
        const roles = [{
            id: 1,
            name: Role.Roles.Admin,
            description: 'Administrator',
        }, {
            id: 2,
            name: Role.Roles.Manager,
            description: 'Manager',
        }, {
            id: 3,
            name: Role.Roles.User,
            description: 'User',
        }];

        const tasks = [];

        roles.forEach((r) => {
            const role = new Role();
            role.id = r.id;
            role.name = r.name;
            role.description = r.description;
            tasks.push(em.save(role));
        });

        return await Promise.all(tasks);
    }
}
