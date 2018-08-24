import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUserActionTable1534751328770 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('user_action', [
            {
                name: 'user_id',
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
        await queryRunner.dropTable('user_action');
    }

}
