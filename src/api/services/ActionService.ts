import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Action } from '../models/Action';
import { ActionRepository } from '../repositories/ActionRepository';
import { events } from '../subscribers/events';

@Service()
export class ActionService {

    constructor(
        @OrmRepository() private actionRepository: ActionRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<Action[]> {
        this.log.info('Find actions');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.actionRepository.find(args);
    }

    public findById(id: number): Promise<Action | undefined> {
        this.log.info('Find action by id');
        return this.actionRepository.findOne({ id, deleted: 0 });
    }

    public findOne(args: any): Promise<Action | undefined> {
        this.log.info('Find action');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.actionRepository.findOne(args);
    }

    public async create(action: Action): Promise<Action> {
        this.log.info('Create a new action => ', action.toString());
        const newAction = await this.actionRepository.save(action);
        this.eventDispatcher.dispatch(events.action.created, newAction);
        return newAction;
    }

    public update(id: number, action: Action): Promise<Action> {
        this.log.info('Update a action');
        action.id = id;
        return this.actionRepository.save(action);
    }

    public async delete(id: number): Promise<Action> {
        this.log.info('Delete a action');
        const action = await this.findById(id);
        action.deleted = 1;
        return this.actionRepository.save(action);
    }

}
