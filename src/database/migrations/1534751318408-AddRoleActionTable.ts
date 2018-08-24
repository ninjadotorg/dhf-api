import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddRoleActionTable1534751318408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('role_action', [
            {
                name: 'role_id',
                type: 'integer',
                isPrimary: true,
            }, {
                name: 'action_id',
                type: 'integer',
                isPrimary: true,
            },
        ]);
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('role_action');
    }

}
