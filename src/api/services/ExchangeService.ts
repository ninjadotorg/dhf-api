import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Exchange } from '../models/Exchange';
import { ExchangeRepository } from '../repositories/ExchangeRepository';
import { events } from '../subscribers/events';

@Service()
export class ExchangeService {

    constructor(
        @OrmRepository() private exchangeRepository: ExchangeRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<Exchange[]> {
        this.log.info('Find exchanges');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.exchangeRepository.find(args);
    }

    public findById(id: number): Promise<Exchange | undefined> {
        this.log.info('Find exchange by id');
        return this.exchangeRepository.findOne({ id, deleted: 0 });
    }

    public findOne(args: any): Promise<Exchange | undefined> {
        this.log.info('Find exchange');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.exchangeRepository.findOne(args);
    }

    public async create(exchange: Exchange): Promise<Exchange> {
        this.log.info('Create a new exchange => ', exchange.toString());
        const newExchange = await this.exchangeRepository.save(exchange);
        this.eventDispatcher.dispatch(events.exchange.created, newExchange);
        return newExchange;
    }

    public update(id: number, exchange: Exchange): Promise<Exchange> {
        this.log.info('Update a exchange');
        exchange.id = id;
        return this.exchangeRepository.save(exchange);
    }

    public async delete(id: number): Promise<Exchange> {
        this.log.info('Delete a exchange');
        const exchange = await this.findById(id);
        exchange.deleted = 1;
        return this.exchangeRepository.save(exchange);
    }

}
