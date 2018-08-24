import { EntityRepository, Repository } from 'typeorm';

import { Crypto } from '../models/Crypto';

@EntityRepository(Crypto)
export class CryptoRepository extends Repository<Crypto> {
}
