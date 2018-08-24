import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddExchangeAccountTable1534329230664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('exchange_account', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'api_key',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'secret_key',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'exchange_id',
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
        await queryRunner.dropTable('exchange_account');
    }

}
