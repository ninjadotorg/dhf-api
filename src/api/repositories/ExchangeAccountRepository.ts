import { EntityRepository, Repository } from 'typeorm';

import { ExchangeAccount } from '../models/ExchangeAccount';

@EntityRepository(ExchangeAccount)
export class ExchangeAccountRepository extends Repository<ExchangeAccount> {
}
