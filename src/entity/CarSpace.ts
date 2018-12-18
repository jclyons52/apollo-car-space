import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
 import { User } from "./User"
import { Booking } from "./Booking"

@Entity()
export class CarSpace {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    address: string;

    @ManyToOne(() => User)
    owner: Promise<User>;

    @OneToMany(() => Booking, booking => booking.carSpace)
    bookings: Promise<Booking[]>;
}