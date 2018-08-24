/**
 * events
 * ---------------------
 * Define all your possible custom events here.
 */
export const events = {
    user: {
        created: 'onUserCreate',
        deleted: 'onUserDelete',
        updated: 'onUserUpdate',
    },
    role: {
        created: 'onRoleCreate',
        deleted: 'onRoleDelete',
        updated: 'onRoleUpdate',
    },
    action: {
        created: 'onActionCreate',
        deleted: 'onActionDelete',
        updated: 'onActionUpdate',
    },
    project: {
        created: 'onProjectCreate',
        deleted: 'onProjectDelete',
        updated: 'onProjectUpdate',
    },
    projectActivity: {
        created: 'onProjectActivityCreate',
        deleted: 'onProjectActivityDelete',
        updated: 'onProjectActivityUpdate',
    },
    exchange: {
        created: 'onExchangeCreate',
        deleted: 'onExchangeDelete',
        updated: 'onExchangeUpdate',
    },
    exchangeAccount: {
        created: 'onExchangeAccountCreate',
        deleted: 'onExchangeAccountDelete',
        updated: 'onExchangeAccountUpdate',
    },
    exchangeAccountWallet: {
        created: 'onExchangeAccountWalletCreate',
        deleted: 'onExchangeAccountWalletDelete',
        updated: 'onExchangeAccountWalletUpdate',
    },
    crypto: {
        created: 'onCryptoCreate',
        deleted: 'onCryptoDelete',
        updated: 'onCryptoUpdate',
    },
};
