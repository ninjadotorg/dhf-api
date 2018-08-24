import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Project } from '../models/Project';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { events } from '../subscribers/events';

@Service()
export class ProjectService {

    constructor(
        @OrmRepository() private projectRepository: ProjectRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<Project[]> {
        this.log.info('Find projects');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.projectRepository.find(args);
    }

    public findById(id: number): Promise<Project | undefined> {
        this.log.info('Find project by id');
        return this.projectRepository.findOne({ id, deleted: 0 });
    }

    public findOne(args: any): Promise<Project | undefined> {
        this.log.info('Find project');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.projectRepository.findOne(args);
    }

    public async create(project: Project): Promise<Project> {
        this.log.info('Create a new project => ', project.toString());
        const newProject = await this.projectRepository.save(project);
        this.eventDispatcher.dispatch(events.project.created, newProject);
        return newProject;
    }

    public update(id: number, project: Project): Promise<Project> {
        this.log.info('Update a project');
        project.id = id;
        return this.projectRepository.save(project);
    }

    public async delete(id: number): Promise<Project> {
        this.log.info('Delete a project');
        const project = await this.findById(id);
        project.deleted = 1;
        return this.projectRepository.save(project);
    }

}
