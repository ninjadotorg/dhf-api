import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddExchangeCryptoTable1534751341792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('exchange_crypto', [
            {
                name: 'exchange_id',
                type: 'integer',
                isPrimary: true,
            }, {
                name: 'crypto_id',
                type: 'integer',
                isPrimary: true,
            },
        ]);
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('exchange_crypto');
    }

}
