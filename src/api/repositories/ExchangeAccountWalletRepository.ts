import { EntityRepository, Repository } from 'typeorm';

import { ExchangeAccountWallet } from '../models/ExchangeAccountWallet';

@EntityRepository(ExchangeAccountWallet)
export class ExchangeAccountWalletRepository extends Repository<ExchangeAccountWallet> {
}
