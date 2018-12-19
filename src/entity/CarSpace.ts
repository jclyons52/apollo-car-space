import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
 import { User } from "./User"
import { Booking } from "./Booking"

@Entity()
export class CarSpace {

    static create(params: Partial<CarSpace> & { owner: Promise<User> }): CarSpace {
        const carSpace = new CarSpace();
        carSpace.address = params.address || "";
        carSpace.latitude = params.latitude || "";
        carSpace.longitude = params.longitude || "";
        carSpace.owner = params.owner
        return carSpace
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    address: string;

    @ManyToOne(() => User)
    owner: Promise<User>;

    @OneToMany(() => Booking, booking => booking.carSpace)
    bookings: Promise<Booking[]>;
}