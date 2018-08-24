import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Crypto } from './Crypto';
import { Exchange } from './Exchange';
import { ExchangeAccount } from './ExchangeAccount';
import { ExchangeAccountWallet } from './ExchangeAccountWallet';
import { ProjectActivity } from './ProjectActivity';
import { User } from './User';

@Entity()
export class Project extends Base {

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public raise: number;

    @IsNotEmpty()
    @Column()
    public total_amount: number;

    @IsNotEmpty()
    @Column()
    public used_amount: number;

    @IsNotEmpty()
    @Column()
    public status: number;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: number;

    @ManyToOne(type => User, user => user.projects)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    @Column({
        name: 'crypto_id',
        nullable: true,
    })
    public cryptoId: number;

    @ManyToOne(type => Crypto, crypto => crypto.projects)
    @JoinColumn({ name: 'crypto_id' })
    public crypto: Crypto;

    @Column({
        name: 'exchange_id',
        nullable: true,
    })
    public exchangeId: number;

    @ManyToOne(type => Exchange, exchange => exchange.projects)
    @JoinColumn({ name: 'exchange_id' })
    public exchange: Exchange;

    @Column({
        name: 'exchange_account_id',
        nullable: true,
    })
    public exchangeAccountId: number;

    @ManyToOne(type => ExchangeAccount, account => account.projects)
    @JoinColumn({ name: 'exchange_account_id' })
    public exchangeAccount: ExchangeAccount;

    @OneToMany(type => ExchangeAccountWallet, wallet => wallet.project)
    public exchangeAccountWallets: ExchangeAccountWallet[];

    @OneToMany(type => ProjectActivity, activity => activity.project)
    public projectActivities: ProjectActivity[];

    public toString(): string {
        return `${this.name}`;
    }
}
