import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddExchangeTable1534329218354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('exchange', [
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
                name: 'icon',
                type: 'varchar',
                length: 255,
                isNullable: true,
            }, {
                name: 'endpoint',
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
        await queryRunner.dropTable('exchange');
    }

}
