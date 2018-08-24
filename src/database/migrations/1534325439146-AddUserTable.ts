import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUserTable1534325439146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('user', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'first_name',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'last_name',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'email',
                type: 'varchar',
                length: 255,
                isNullable: false,
            }, {
                name: 'avatar',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'password',
                type: 'varchar',
                length: 255,
                isNullable: false,
            }, {
                name: 'status',
                type: 'integer',
                isNullable: false,
                default: 0,
            }, {
                name: 'role_id',
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
        await queryRunner.dropTable('user');
    }

}
