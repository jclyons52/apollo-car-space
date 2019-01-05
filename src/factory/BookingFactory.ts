import * as faker from "faker";
import { Repository } from "typeorm";
import { Booking } from "../entity/Booking";
import { CarSpace } from "../entity/CarSpace";
import { User } from "../entity/User";
import { Factory } from "./Factory";

export class BookingFactory extends Factory<Booking> {

    constructor(
        private userFactory: Factory<User>,
        private carSpaceFactory: Factory<CarSpace>,
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
