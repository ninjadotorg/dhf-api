import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ProjectActivity } from '../models/ProjectActivity';
import { ProjectActivityRepository } from '../repositories/ProjectActivityRepository';
import { events } from '../subscribers/events';

@Service()
export class ProjectActivityService {

    constructor(
        @OrmRepository() private projectActivityRepository: ProjectActivityRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<ProjectActivity[]> {
        this.log.info('Find project activities');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.projectActivityRepository.find(args);
    }

    public findById(id: number): Promise<ProjectActivity | undefined> {
        this.log.info('Find project activity by id');
        return this.projectActivityRepository.findOne({ id, deleted: 0 });
    }

    public findOne(args: any): Promise<ProjectActivity | undefined> {
        this.log.info('Find project activity');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.projectActivityRepository.findOne(args);
    }

    public async create(projectActivity: ProjectActivity): Promise<ProjectActivity> {
        this.log.info('Create a new project activity => ', projectActivity.toString());
        const newProjectActivity = await this.projectActivityRepository.save(projectActivity);
        this.eventDispatcher.dispatch(events.projectActivity.created, newProjectActivity);
        return newProjectActivity;
    }

    public update(id: number, projectActivity: ProjectActivity): Promise<ProjectActivity> {
        this.log.info('Update a project activity');
        projectActivity.id = id;
        return this.projectActivityRepository.save(projectActivity);
    }

    public async delete(id: number): Promise<ProjectActivity> {
        this.log.info('Delete a project activity');
        const projectActivity = await this.findById(id);
        projectActivity.deleted = 1;
        return this.projectActivityRepository.save(projectActivity);
    }

}
