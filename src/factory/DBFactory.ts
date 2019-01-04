import { Container } from "../Container";
import { CarSpace } from "../entity/CarSpace";
import { User } from "../entity/User";

export class DBFactory {
    constructor(private ctx: Container) {}

    public async makeUser() {
        const user = this.ctx.userFactory.create({});
        return this.ctx.userRepository.save(user);
    }

    public async makeCarSpace(owner: Promise<User> = this.makeUser()) {
        const carSpace = this.ctx.carSpaceFactory.create({ owner: await owner });
        return this.ctx.carSpaceRepository.save(carSpace);
    }

    public async makeBooking(user = this.makeUser(), carSpace = this.makeCarSpace()) {
        const booking = this.ctx.bookingFactory.create({ user: await user, carSpace: await carSpace });
        return this.ctx.bookingRepository.save(booking);
    }
}
