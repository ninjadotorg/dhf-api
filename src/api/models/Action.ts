import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Base } from './Base';
import { Role } from './Role';
import { User } from './User';

@Entity()
export class Action extends Base {

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public description: string;

    @IsNotEmpty()
    @Column()
    public group: string;

    @ManyToMany(type => User, user => user.actions)
    @JoinTable()
    public users: User[];

    @ManyToMany(type => Role, role => role.actions)
    @JoinTable()
    public roles: Role[];

    public toString(): string {
        return `${this.name} ${this.description}`;
    }

}
