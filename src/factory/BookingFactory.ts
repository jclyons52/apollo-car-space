import * as faker from "faker";
import { Repository } from "typeorm";
import { Booking } from "../entity/Booking";
import { CarSpaceFactory } from "./CarSpaceFactory";
import { Factory } from "./Factory";
import { UserFactory } from "./UserFactory";

export class BookingFactory extends Factory<Booking> {

    constructor(
        private userFactory: UserFactory,
        private carSpaceFactory: CarSpaceFactory,
        private bookingRepository: Repository<Booking>,
    ) {
        super();
    }

    public async make(entity: Partial<Booking>): Promise<Booking> {
        const user = await this.userFactory.make({});
        const carSpace = await this.carSpaceFactory.make({});
        const booking = this.create({ user, carSpace, ...entity });
        return this.bookingRepository.save(booking);
    }

    public create({
        start = faker.date.past(),
        end = faker.date.future(),
        carSpace = this.carSpaceFactory.create({}),
        user = this.userFactory.create({}),
    }: Partial<Booking>): Booking {
        return Booking.create({ start, end, carSpace, user });
    }

}
