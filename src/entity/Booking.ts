import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { CarSpace } from "./CarSpace"
import { User } from "./User";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

@Entity()
export class Booking {

    static create(params: Omit<Booking, "id">): Booking {
        const booking = new Booking();
        booking.start = params.start;
        booking.end = params.end;
        booking.carSpace = params.carSpace;
        booking.user = params.user;
        return booking;
    }

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