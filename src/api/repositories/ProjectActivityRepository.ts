import { EntityRepository, Repository } from 'typeorm';

import { ProjectActivity } from '../models/ProjectActivity';

@EntityRepository(ProjectActivity)
export class ProjectActivityRepository extends Repository<ProjectActivity> {
}
