import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Exchange } from './Exchange';
import { ExchangeAccountWallet } from './ExchangeAccountWallet';
import { Project } from './Project';

@Entity()
export class ExchangeAccount extends Base {

    @IsNotEmpty()
    @Column()
    public apiKey: string;

    @IsNotEmpty()
    @Column()
    public secretKey: string;

    @Column({
        name: 'exchange_id',
        nullable: true,
    })
    public exchangeId: number;

    @ManyToOne(type => Exchange, exchange => exchange.exchangeAccounts)
    @JoinColumn({ name: 'exchange_id' })
    public exchange: Exchange;

    @OneToMany(type => ExchangeAccountWallet, wallet => wallet.exchangeAccount)
    public exchangeAccountWallets: ExchangeAccountWallet[];

    @OneToMany(type => Project, project => project.exchangeAccount)
    public projects: Project[];

    public toString(): string {
        return `${this.apiKey}`;
    }
}
