import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ExchangeAccount } from '../models/ExchangeAccount';
import { ExchangeAccountRepository } from '../repositories/ExchangeAccountRepository';
import { events } from '../subscribers/events';

@Service()
export class ExchangeAccountService {

    constructor(
        @OrmRepository() private exchangeAccountRepository: ExchangeAccountRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<ExchangeAccount[]> {
        this.log.info('Find exchange accounts');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.exchangeAccountRepository.find(args);
    }

    public findById(id: number): Promise<ExchangeAccount | undefined> {
        this.log.info('Find exchange account by id');
        return this.exchangeAccountRepository.findOne({ id, deleted: 0 });
    }

    public findOne(args: any): Promise<ExchangeAccount | undefined> {
        this.log.info('Find exchange account');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.exchangeAccountRepository.findOne(args);
    }

    public async create(exchangeAccount: ExchangeAccount): Promise<ExchangeAccount> {
        this.log.info('Create a new exchange account => ', exchangeAccount.toString());
        const newExchangeAccount = await this.exchangeAccountRepository.save(exchangeAccount);
        this.eventDispatcher.dispatch(events.exchangeAccount.created, newExchangeAccount);
        return newExchangeAccount;
    }

    public update(id: number, exchangeAccount: ExchangeAccount): Promise<ExchangeAccount> {
        this.log.info('Update a exchange account');
        exchangeAccount.id = id;
        return this.exchangeAccountRepository.save(exchangeAccount);
    }

    public async delete(id: number): Promise<ExchangeAccount> {
        this.log.info('Delete a exchange account');
        const exchangeAccount = await this.findById(id);
        exchangeAccount.deleted = 1;
        return this.exchangeAccountRepository.save(exchangeAccount);
    }

}
