import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddProjectActivityTable1534329201529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('project_activity', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'action',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'amount',
                type: 'decimal',
                precision: 36,
                scale: 18,
                default: 0,
            }, {
                name: 'odds',
                type: 'decimal',
                precision: 36,
                scale: 18,
                default: 0,
            }, {
                name: 'description',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'status',
                type: 'integer',
                isNullable: false,
                default: 0,
            }, {
                name: 'raw',
                type: 'text',
                isNullable: true,
            }, {
                name: 'project_id',
                type: 'integer',
                isNullable: true,
            }, {
                name: 'deleted',
                type: 'tinyint',
                length: 1,
                default: 0,
            }, {
                name: 'created_at',
                type: 'datetime',
                default: 'NOW()',
            }, {
                name: 'updated_at',
                type: 'datetime',
                default: 'NOW()',
            },
        ]);
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('project_activity');
    }

}
