import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Role } from '../models/Role';
import { RoleRepository } from '../repositories/RoleRepository';
import { events } from '../subscribers/events';

@Service()
export class RoleService {

    constructor(
        @OrmRepository() private roleRepository: RoleRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<Role[]> {
        this.log.info('Find roles');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.roleRepository.find(args);
    }

    public findById(id: number): Promise<Role | undefined> {
        this.log.info('Find role by id');
        return this.roleRepository.findOne({ id, deleted: 0 });
    }

    public findByName(name: string): Promise<Role> {
        this.log.info('Find role by name', name);
        return this.roleRepository.findOne({
            where: {
                name,
            },
        });
    }

    public findOne(args: any): Promise<Role | undefined> {
        this.log.info('Find role');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.roleRepository.findOne(args);
    }

    public async create(role: Role): Promise<Role> {
        this.log.info('Create a new role => ', role.toString());
        const newRole = await this.roleRepository.save(role);
        this.eventDispatcher.dispatch(events.role.created, newRole);
        return newRole;
    }

    public update(id: number, role: Role): Promise<Role> {
        this.log.info('Update a role');
        role.id = id;
        return this.roleRepository.save(role);
    }

    public async delete(id: number): Promise<Role> {
        this.log.info('Delete a role');
        const role = await this.findById(id);
        role.deleted = 1;
        return this.roleRepository.save(role);
    }

}
