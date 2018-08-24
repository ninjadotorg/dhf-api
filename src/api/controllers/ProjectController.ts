import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { ProjectNotFoundError } from '../errors/ProjectNotFoundError';
import { Project } from '../models/Project';
import { ProjectService } from '../services/ProjectService';

@Authorized()
@JsonController('/projects')
export class ProjectController {

    constructor(
        private projectService: ProjectService
    ) { }

    @Get('/:id')
    @OnUndefined(ProjectNotFoundError)
    public one( @Param('id') id: number): Promise<Project | undefined> {
        return this.projectService.findById(id);
    }

    @Post()
    public create( @Body() project: Project): Promise<Project> {
        return this.projectService.create(project);
    }

    @Put('/:id')
    public update( @Param('id') id: number, @Body() project: Project): Promise<Project> {
        return this.projectService.update(id, project);
    }

    @Delete('/:id')
    public delete( @Param('id') id: number): Promise<Project> {
        return this.projectService.delete(id);
    }

}
