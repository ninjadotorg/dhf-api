import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ExchangeAccountWallet } from '../models/ExchangeAccountWallet';
import { ExchangeAccountWalletRepository } from '../repositories/ExchangeAccountWalletRepository';
import { events } from '../subscribers/events';

@Service()
export class ExchangeAccountWalletService {

    constructor(
        @OrmRepository() private exchangeAccountWalletRepository: ExchangeAccountWalletRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<ExchangeAccountWallet[]> {
        this.log.info('Find exchange account wallets');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.exchangeAccountWalletRepository.find(args);
    }

    public findById(id: number): Promise<ExchangeAccountWallet | undefined> {
        this.log.info('Find exchange account wallet by id');
        return this.exchangeAccountWalletRepository.findOne({ id, deleted: 0 });
    }

    public findOne(args: any): Promise<ExchangeAccountWallet | undefined> {
        this.log.info('Find exchange account wallet');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.exchangeAccountWalletRepository.findOne(args);
    }

    public async create(exchangeAccountWallet: ExchangeAccountWallet): Promise<ExchangeAccountWallet> {
        this.log.info('Create a new exchange account wallet => ', exchangeAccountWallet.toString());
        const newExchangeAccountWallet = await this.exchangeAccountWalletRepository.save(exchangeAccountWallet);
        this.eventDispatcher.dispatch(events.exchangeAccountWallet.created, newExchangeAccountWallet);
        return newExchangeAccountWallet;
    }

    public update(id: number, exchangeAccountWallet: ExchangeAccountWallet): Promise<ExchangeAccountWallet> {
        this.log.info('Update a exchange account wallet');
        exchangeAccountWallet.id = id;
        return this.exchangeAccountWalletRepository.save(exchangeAccountWallet);
    }

    public async delete(id: number): Promise<ExchangeAccountWallet> {
        this.log.info('Delete a exchange account wallet');
        const exchangeAccountWallet = await this.findById(id);
        exchangeAccountWallet.deleted = 1;
        return this.exchangeAccountWalletRepository.save(exchangeAccountWallet);
    }

}
