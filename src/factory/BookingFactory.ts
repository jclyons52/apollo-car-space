import { Factory } from "./Factory";
import { Booking } from "../entity/Booking";
import * as faker from 'faker';
import { UserFactory } from "./UserFactory";
import { CarSpaceFactory } from "./CarSpaceFactory";

export class BookingFactory extends Factory<Booking> {

    constructor(
        private userFactory: UserFactory, 
        private carSpaceFactory: CarSpaceFactory,
    ) {
        super();
    }

    public create({
        start = faker.date.past(),
        end = faker.date.future(),
        carSpace = Promise.resolve(this.carSpaceFactory.create({})),
        user = Promise.resolve(this.userFactory.create({}))
    }: Partial<Booking>): Booking {
        return Booking.create({ start, end, carSpace, user })
    }

}