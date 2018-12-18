import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { CarSpace } from "./CarSpace"
import { Booking } from "./Booking";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => CarSpace, carSpace => carSpace.owner)
    carSpaces: Promise<CarSpace[]>;

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Promise<Booking[]>;
}
