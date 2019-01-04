import { IsDate, validate } from "class-validator";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { CarSpace } from "./CarSpace";
import { User } from "./User";

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

@Entity()
export class Booking {

    public static create(params: Omit<NonFunctionProperties<Booking>, "id">): Booking {
        const booking = new Booking();
        booking.start = params.start;
        booking.end = params.end;
        booking.carSpace = params.carSpace;
        booking.user = params.user;
        return booking;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @IsDate()
    @Column()
    public start: Date;

    @IsDate()
    @Column()
    public end: Date;

    @ManyToOne(() => CarSpace)
    public carSpace: CarSpace;

    @ManyToOne(() => User)
    public user: User;

    @BeforeInsert()
    @BeforeUpdate()
    public async validate() {
        const errors = await validate(this);
        if (errors.length > 0) {
            const errString = errors.map((err) => err.toString()).join("; ");
            throw new Error(errString);
        }
    }
}
