import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddProjectTable1534329184979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('project', [
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
                name: 'raise',
                type: 'decimal',
                precision: 36,
                scale: 18,
                default: 0,
            }, {
                name: 'total_amount',
                type: 'decimal',
                precision: 36,
                scale: 18,
                default: 0,
            }, {
                name: 'used_amount',
                type: 'decimal',
                precision: 36,
                scale: 18,
                default: 0,
            }, {
                name: 'status',
                type: 'integer',
                isNullable: false,
                default: 0,
            }, {
                name: 'crypto_id',
                type: 'integer',
                isNullable: true,
            }, {
                name: 'user_id',
                type: 'integer',
                isNullable: true,
            }, {
                name: 'exchange_id',
                type: 'integer',
                isNullable: true,
            }, {
                name: 'exchange_account_id',
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
        await queryRunner.dropTable('project');
    }

}
