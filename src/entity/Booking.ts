import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { CarSpace } from "./CarSpace"
import { User } from "./User";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @ManyToOne(() => CarSpace)
    carSpace: Promise<CarSpace>;

    @ManyToOne(() => User)
    user: Promise<User>;
}