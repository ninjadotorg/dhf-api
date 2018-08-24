import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Project } from '../../src/api/models/Project';
import { ProjectService } from '../../src/api/services/ProjectService';
import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';

describe('ProjectService', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let connection: Connection;
    beforeAll(async () => connection = await createDatabaseConnection());
    beforeEach(() => migrateDatabase(connection));

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(() => closeDatabase(connection));

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('should create a new project in the database', async (done) => {
        const project = new Project();
        project.name = 'test';
        const service = Container.get<ProjectService>(ProjectService);
        const resultCreate = await service.create(project);
        expect(resultCreate.name).toBe(project.name);

        const resultFind = await service.findById(resultCreate.id);
        if (resultFind) {
            expect(resultFind.name).toBe(project.name);
        } else {
            fail('Could not find project');
        }
        done();
    });

});
