import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddCryptoTable1534329260172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('crypto', [
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
                name: 'wallet',
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
        await queryRunner.dropTable('crypto');
    }

}
