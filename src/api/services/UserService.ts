import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<User[]> {
        this.log.info('Find all users');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.userRepository.find(args);
    }

    public findById(id: number): Promise<User | undefined> {
        this.log.info('Find user by id');
        return this.userRepository.findOne({ id });
    }

    public findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }

    public findOne(args: object): Promise<User | undefined> {
        this.log.info('Find all users');
        return this.userRepository.findOne(args);
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: number, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: number): Promise<User> {
        this.log.info('Delete a user');
        const user = await this.findById(id);
        user.deleted = 1;
        return this.userRepository.save(user);
    }
}
