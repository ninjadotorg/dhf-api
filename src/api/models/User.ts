import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { Action } from './Action';
import { Base } from './Base';
import { Project } from './Project';
import { ProjectActivity } from './ProjectActivity';
import { Role } from './Role';

@Entity()
export class User extends Base {

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @IsNotEmpty()
    @Column()
    public email: string;

    @Column()
    public avatar: string;

    @IsNotEmpty()
    @Column()
    @Exclude({toClassOnly: false, toPlainOnly: true})
    public password: string;

    @Column()
    public status: number;

    @Column({
        name: 'role_id',
        nullable: true,
    })
    public roleId: number;

    @ManyToOne(type => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    public role: Role;

    @OneToMany(type => Project, project => project.user)
    public projects: Project[];

    @OneToMany(type => ProjectActivity, activity => activity.user)
    public projectActivities: Project[];

    @ManyToMany(type => Action, action => action.users)
    @JoinTable()
    public actions: Action[];

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

}
