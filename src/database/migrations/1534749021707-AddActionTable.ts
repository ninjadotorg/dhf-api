import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddActionTable1534749021707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('action', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'name',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'description',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'group',
                type: 'varchar',
                length: 255,
                isNullable: false,
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
        await queryRunner.dropTable('action');
    }

}
