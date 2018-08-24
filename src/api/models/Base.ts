import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column()
    @Exclude()
    public deleted: number;

    @IsNotEmpty()
    @Column({name: 'created_at', type: 'datetime'})
    public createdAt: Date;

    @IsNotEmpty()
    @Column({name: 'updated_at', type: 'datetime'})
    public updatedAt: Date;

}
