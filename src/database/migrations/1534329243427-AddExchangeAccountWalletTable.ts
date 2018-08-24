import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddExchangeAccountWalletTable1534329243427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('exchange_account_wallet', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'amount',
                type: 'decimal',
                precision: 36,
                scale: 18,
                default: 0,
            }, {
                name: 'remaining',
                type: 'decimal',
                precision: 36,
                scale: 18,
                default: 0,
            }, {
                name: 'exchange_account_id',
                type: 'integer',
                isNullable: true,
            }, {
                name: 'project_id',
                type: 'integer',
                isNullable: true,
            }, {
                name: 'crypto_id',
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
        await queryRunner.dropTable('exchange_account_wallet');
    }

}
