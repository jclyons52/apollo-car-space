import { Memoize } from "lodash-decorators";
import { createConnection, Repository } from "typeorm";
import { Booking } from "./entity/Booking";
import { CarSpace } from "./entity/CarSpace";
import { User } from "./entity/User";
import { BookingFactory } from "./factory/BookingFactory";
import { CarSpaceFactory } from "./factory/CarSpaceFactory";
import { UserFactory } from "./factory/UserFactory";

export interface IConfig {
    env: "test" | "dev" | "prod";
}

export class Container {

    private connection = createConnection();

    @Memoize(() => 1)
    public async userRepository(): Promise<Repository<User>> {
        const connection = await this.connection;
        return connection.getRepository(User);
    }

    @Memoize(() => 1)
    public async bookingRepository(): Promise<Repository<Booking>> {
        const connection = await this.connection;
        return connection.getRepository(Booking);
    }

    @Memoize(() => 1)
    public async carSpaceRepository(): Promise<Repository<CarSpace>> {
        const connection = await this.connection;
        return connection.getRepository(CarSpace);
    }

    @Memoize(() => 1)
    public userFactory(): UserFactory {
        return new UserFactory();
    }

    @Memoize(() => 1)
    public carSpaceFactory(): CarSpaceFactory {
        return new CarSpaceFactory(this.userFactory());
    }

    @Memoize(() => 1)
    public bookingFactory(): BookingFactory {
        return new BookingFactory(this.userFactory(), this.carSpaceFactory());
    }
}
