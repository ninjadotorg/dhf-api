import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { Action } from './Action';
import { Base } from './Base';
import { User } from './User';

enum Roles {
    Admin = 'admin',
    Manager = 'manager',
    User = 'user',
}

@Entity()
export class Role extends Base {
    public static readonly Roles = Roles;
    public readonly Roles = Role.Roles;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: Roles;

    @IsNotEmpty()
    @Column({ name: 'description' })
    public description: string;

    @OneToMany(type => User, user => user.role)
    public users: User[];

    @ManyToMany(type => Action, action => action.roles)
    @JoinTable()
    public actions: Action[];

    public toString(): string {
        return `${this.name} ${this.description}`;
    }

}
