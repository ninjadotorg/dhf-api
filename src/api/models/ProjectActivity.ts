import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class ProjectActivity extends Base {

    @IsNotEmpty()
    @Column()
    public action: string;

    @IsNotEmpty()
    @Column()
    public amount: number;

    @IsNotEmpty()
    @Column()
    public odds: number;

    @IsNotEmpty()
    @Column()
    public description: string;

    @IsNotEmpty()
    @Column()
    public raw: string;

    @IsNotEmpty()
    @Column()
    public status: number;

    @Column({
        name: 'project_id',
        nullable: true,
    })
    public projectId: number;

    @ManyToOne(type => Project, project => project.projectActivities)
    @JoinColumn({ name: 'project_id' })
    public project: Project;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: number;

    @ManyToOne(type => User, user => user.projectActivities)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `${this.action} ${this.description} ${this.raw}`;
    }
}
