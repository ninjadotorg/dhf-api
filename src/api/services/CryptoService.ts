import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Crypto } from '../models/Crypto';
import { CryptoRepository } from '../repositories/CryptoRepository';
import { events } from '../subscribers/events';

@Service()
export class CryptoService {

    constructor(
        @OrmRepository() private cryptoRepository: CryptoRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(args: any = {}): Promise<Crypto[]> {
        this.log.info('Find cryptos');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.cryptoRepository.find(args);
    }

    public findById(id: number): Promise<Crypto | undefined> {
        this.log.info('Find crypto by id');
        return this.cryptoRepository.findOne({ id, deleted: 0 });
    }

    public findOne(args: any): Promise<Crypto | undefined> {
        this.log.info('Find crypto');
        if (!args.deleted) {
            args.deleted = 0;
        }
        return this.cryptoRepository.findOne(args);
    }

    public async create(crypto: Crypto): Promise<Crypto> {
        this.log.info('Create a new crypto => ', crypto.toString());
        const newCrypto = await this.cryptoRepository.save(crypto);
        this.eventDispatcher.dispatch(events.crypto.created, newCrypto);
        return newCrypto;
    }

    public update(id: number, crypto: Crypto): Promise<Crypto> {
        this.log.info('Update a crypto');
        crypto.id = id;
        return this.cryptoRepository.save(crypto);
    }

    public async delete(id: number): Promise<Crypto> {
        this.log.info('Delete a crypto');
        const crypto = await this.findById(id);
        crypto.deleted = 1;
        return this.cryptoRepository.save(crypto);
    }

}
