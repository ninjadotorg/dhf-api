import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Exchange } from './Exchange';
import { ExchangeAccountWallet } from './ExchangeAccountWallet';
import { Project } from './Project';

@Entity()
export class Crypto extends Base {

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public symbol: string;

    @IsNotEmpty()
    @Column()
    public icon: string;

    @IsNotEmpty()
    @Column()
    public wallet: string;

    @OneToMany(type => Project, project => project.crypto)
    public projects: Project[];

    @OneToMany(type => ExchangeAccountWallet, wallet => wallet.crypto)
    public exchangeAccountWallets: ExchangeAccountWallet[];

    @ManyToMany(type => Exchange, exchange => exchange.cryptos)
    @JoinTable()
    public exchanges: Exchange[];

    public toString(): string {
        return `${this.name}`;
    }
}
