import { EntityRepository, Repository } from 'typeorm';

import { Exchange } from '../models/Exchange';

@EntityRepository(Exchange)
export class ExchangeRepository extends Repository<Exchange> {
}
