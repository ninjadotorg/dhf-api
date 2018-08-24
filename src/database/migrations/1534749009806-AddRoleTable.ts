import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddRoleTable1534749009806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('role', [
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
        await queryRunner.dropTable('role');
    }

}
