import { Connection, createConnection, Repository } from "typeorm";
import { LazyGetter } from "typescript-lazy-get-decorator";
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

    public static async create(): Promise<Container> {
        const connection = await createConnection();
        return new Container(connection);
    }

    constructor(private connection: Connection) {}

    @LazyGetter()
    public get userRepository(): Repository<User> {
        const connection = this.connection;
        return connection.getRepository(User);
    }

    @LazyGetter()
    public get bookingRepository(): Repository<Booking> {
        const connection = this.connection;
        return connection.getRepository(Booking);
    }

    @LazyGetter()
    public get carSpaceRepository(): Repository<CarSpace> {
        const connection = this.connection;
        return connection.getRepository(CarSpace);
    }

    @LazyGetter()
    public get userFactory(): UserFactory {
        return new UserFactory();
    }

    @LazyGetter()
    public get carSpaceFactory(): CarSpaceFactory {
        return new CarSpaceFactory(this.userFactory);
    }

    @LazyGetter()
    public get bookingFactory(): BookingFactory {
        return new BookingFactory(this.userFactory, this.carSpaceFactory);
    }
}
