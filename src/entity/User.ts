import { IsEmail, validate } from "class-validator";
import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Booking } from "./Booking";
import { CarSpace } from "./CarSpace";

@Entity()
export class User {

    public static create(params: Partial<User>) {
        const user = new User();
        user.name = params.name || "";
        user.userName = params.userName || "";
        user.email = params.email || "";
        user.password = params.password || "";
        user.carSpaces = params.carSpaces || [];
        user.bookings = params.bookings || [];
        return user;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public userName: string;

    // @IsEmail()
    @Column()
    public email: string;

    @Column()
    public password: string;

    @OneToMany(() => CarSpace, (carSpace) => carSpace.owner)
    public carSpaces: CarSpace[];

    @OneToMany(() => Booking, (booking) => booking.user)
    public bookings: Booking[];

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
