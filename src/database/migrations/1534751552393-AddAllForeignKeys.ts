import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddAllForeignKeys1534751552393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // add foreign keys to Project table
        await queryRunner.createForeignKey('project', new TableForeignKey(
            'fk_project_crypto',
            ['crypto_id'],
            ['id'],
            'crypto',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('project', new TableForeignKey(
            'fk_project_exchange',
            ['exchange_id'],
            ['id'],
            'exchange',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('project', new TableForeignKey(
            'fk_project_exchange_account',
            ['exchange_account_id'],
            ['id'],
            'exchange_account',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('project', new TableForeignKey(
            'fk_project_user',
            ['user_id'],
            ['id'],
            'user',
            'CASCADE'
        ));

        // add foreign keys to ProjectActivity table
        await queryRunner.createForeignKey('project_activity', new TableForeignKey(
            'fk_project_activity_project',
            ['project_id'],
            ['id'],
            'project',
            'CASCADE'
        ));

        // add foreign keys to User table
        await queryRunner.createForeignKey('user', new TableForeignKey(
            'fk_user_role',
            ['role_id'],
            ['id'],
            'role',
            'CASCADE'
        ));

        // add foreign keys to ExchangeAccount table
        await queryRunner.createForeignKey('exchange_account', new TableForeignKey(
            'fk_exchange_account_exchange',
            ['exchange_id'],
            ['id'],
            'exchange',
            'CASCADE'
        ));

        // add foreign keys to ExchangeAccountWallet table
        await queryRunner.createForeignKey('exchange_account_wallet', new TableForeignKey(
            'fk_exchange_account_wallet_exchange_account',
            ['exchange_account_id'],
            ['id'],
            'exchange_account',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('exchange_account_wallet', new TableForeignKey(
            'fk_exchange_account_wallet_crypto',
            ['crypto_id'],
            ['id'],
            'crypto',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('exchange_account_wallet', new TableForeignKey(
            'fk_exchange_account_wallet_project',
            ['project_id'],
            ['id'],
            'project',
            'CASCADE'
        ));

        // add foreign keys to RoleAction table
        await queryRunner.createForeignKey('role_action', new TableForeignKey(
            'fk_role_action_role',
            ['role_id'],
            ['id'],
            'role',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('role_action', new TableForeignKey(
            'fk_role_action_action',
            ['action_id'],
            ['id'],
            'action',
            'CASCADE'
        ));

        // add foreign keys to UserAction table
        await queryRunner.createForeignKey('user_action', new TableForeignKey(
            'fk_user_action_user',
            ['user_id'],
            ['id'],
            'user',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('user_action', new TableForeignKey(
            'fk_user_action_action',
            ['action_id'],
            ['id'],
            'action',
            'CASCADE'
        ));

        // add foreign keys to ExchangeCrypto table
        await queryRunner.createForeignKey('exchange_crypto', new TableForeignKey(
            'fk_exchange_crypto_exchange',
            ['exchange_id'],
            ['id'],
            'exchange',
            'CASCADE'
        ));
        await queryRunner.createForeignKey('exchange_crypto', new TableForeignKey(
            'fk_exchange_crypto_crypto',
            ['crypto_id'],
            ['id'],
            'crypto',
            'CASCADE'
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const jobs = [];

        const project = await queryRunner.getTable('project');
        const projectForeignKeys = ['fk_project_crypto', 'fk_project_exchange', 'fk_project_exchange_account', 'fk_project_user'];
        project.foreignKeys.forEach(fk => {
            if (fk.name in projectForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('project', fk));
            }
        });

        const projectActivity = await queryRunner.getTable('project_activity');
        const projectActivityForeignKeys = ['fk_project_activity_project'];
        projectActivity.foreignKeys.forEach(fk => {
            if (fk.name in projectActivityForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('project_activity', fk));
            }
        });

        const user = await queryRunner.getTable('user');
        const userForeignKeys = ['fk_user_role'];
        user.foreignKeys.forEach(fk => {
            if (fk.name in userForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('user', fk));
            }
        });

        const exchangeAccount = await queryRunner.getTable('exchange_account');
        const exchangeAccountForeignKeys = ['fk_exchange_account_exchange'];
        exchangeAccount.foreignKeys.forEach(fk => {
            if (fk.name in exchangeAccountForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('exchange_account', fk));
            }
        });

        const exchangeAccountWallet = await queryRunner.getTable('exchange_account_wallet');
        const exchangeAccountWalletForeignKeys = ['fk_exchange_account_wallet_exchange_account',
            'fk_exchange_account_wallet_crypto', 'fk_exchange_account_wallet_project'];
        exchangeAccountWallet.foreignKeys.forEach(fk => {
            if (fk.name in exchangeAccountWalletForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('exchange_account_wallet', fk));
            }
        });

        const roleAction = await queryRunner.getTable('role_action');
        const roleActionForeignKeys = ['fk_role_action_role', 'fk_role_action_action'];
        roleAction.foreignKeys.forEach(fk => {
            if (fk.name in roleActionForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('role_action', fk));
            }
        });

        const userAction = await queryRunner.getTable('user_action');
        const userActionForeignKeys = ['fk_user_action_user', 'fk_user_action_action'];
        userAction.foreignKeys.forEach(fk => {
            if (fk.name in userActionForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('user_action', fk));
            }
        });

        const exchangeCrypto = await queryRunner.getTable('exchange_crypto');
        const exchangeCryptoForeignKeys = ['fk_exchange_crypto_exchange', 'fk_exchange_crypto_crypto'];
        exchangeCrypto.foreignKeys.forEach(fk => {
            if (fk.name in exchangeCryptoForeignKeys) {
                jobs.push(queryRunner.dropForeignKey('exchange_crypto', fk));
            }
        });

        await Promise.all(jobs);
    }

}
