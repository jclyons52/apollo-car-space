import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { CarSpace } from "./CarSpace"
import { Booking } from "./Booking";

@Entity()
export class User {

    public static create(params: Partial<User>) {
        const user = new User();
        user.name = params.name || "";
        user.userName = params.userName || "";
        user.email = params.email || "";
        user.password = params.password || "";
        user.carSpaces = params.carSpaces || Promise.resolve([]);
        user.bookings = params.bookings || Promise.resolve([]);
        return user;
    }

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
