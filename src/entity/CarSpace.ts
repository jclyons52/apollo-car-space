import { validate } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";
import { User } from "./User";

@Entity()
export class CarSpace {

    public static create(params: Partial<CarSpace> & { owner: Promise<User> }): CarSpace {
        const carSpace = new CarSpace();
        carSpace.address = params.address || "";
        carSpace.latitude = params.latitude || "";
        carSpace.longitude = params.longitude || "";
        carSpace.owner = params.owner;
        return carSpace;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public latitude: string;

    @Column()
    public longitude: string;

    @Column()
    public address: string;

    @ManyToOne(() => User)
    public owner: Promise<User>;

    @OneToMany(() => Booking, (booking) => booking.carSpace)
    public bookings: Promise<Booking[]>;

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
