import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Crypto } from './Crypto';
import { ExchangeAccount } from './ExchangeAccount';
import { Project } from './Project';

@Entity()
export class Exchange extends Base {

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public icon: string;

    @IsNotEmpty()
    @Column()
    public endpoint: string;

    @OneToMany(type => ExchangeAccount, account => account.exchange)
    public exchangeAccounts: ExchangeAccount[];

    @OneToMany(type => Project, project => project.exchange)
    public projects: Project[];

    @ManyToMany(type => Crypto, crypto => crypto.exchanges)
    @JoinTable()
    public cryptos: Crypto[];

    public toString(): string {
        return `${this.name}`;
    }
}
