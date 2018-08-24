import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { Crypto } from './Crypto';
import { ExchangeAccount } from './ExchangeAccount';
import { Project } from './Project';

@Entity()
export class ExchangeAccountWallet extends Base {

    @IsNotEmpty()
    @Column()
    public amount: number;

    @IsNotEmpty()
    @Column()
    public remaining: number;

    @Column({
        name: 'exchange_account_id',
        nullable: true,
    })
    public exchangeAccountId: number;

    @ManyToOne(type => ExchangeAccount, account => account.exchangeAccountWallets)
    @JoinColumn({ name: 'exchange_account_id' })
    public exchangeAccount: ExchangeAccount;

    @Column({
        name: 'project_id',
        nullable: true,
    })
    public projectId: number;

    @ManyToOne(type => Project, project => project.exchangeAccountWallets)
    @JoinColumn({ name: 'project_id' })
    public project: Project;

    @Column({
        name: 'crypto_id',
        nullable: true,
    })
    public cryptoId: number;

    @ManyToOne(type => Crypto, crypto => crypto.exchangeAccountWallets)
    @JoinColumn({ name: 'crypto_id' })
    public crypto: Crypto;

    public toString(): string {
        return `${this.projectId} ${this.exchangeAccountId} ${this.amount}`;
    }
}
