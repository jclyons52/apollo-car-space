import { createConnection, Connection, Repository } from "typeorm";
import { Memoize } from "lodash-decorators";
import { ResolverFactory } from "./resolvers";
import { User } from "./entity/User";
import { Booking } from "./entity/Booking";
import { CarSpace } from "./entity/CarSpace";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { UserFactory } from "./factory/UserFactory";
import { CarSpaceFactory } from "./factory/CarSpaceFactory";
import { BookingFactory } from "./factory/BookingFactory";
import { Resolvers } from "./generated/graphqlgen";


export interface IConfig {
    env: "test" | "dev" | "prod"
}

export class Container {
    constructor() { }

    @Memoize(() => 1)
    connection(): Promise<Connection> {
        return createConnection()
    }

    @Memoize(() => 1)
    async userRepository(): Promise<Repository<User>> {
        const connection = await this.connection()
        return connection.getRepository(User)
    }

    @Memoize(() => 1)
    async bookingRepository(): Promise<Repository<Booking>> {
        const connection = await this.connection()
        return connection.getRepository(Booking)
    }

    @Memoize(() => 1)
    async carSpaceRepository(): Promise<Repository<CarSpace>> {
        const connection = await this.connection()
        return connection.getRepository(CarSpace)
    }

    @Memoize(() => 1)
    async resolverFactory({
        userRepository = this.userRepository(),
        bookingRepository = this.bookingRepository(),
        carSpaceRepository = this.carSpaceRepository(),
    }): Promise<ResolverFactory> {
        return new ResolverFactory(
            await userRepository, 
            await bookingRepository, 
            await carSpaceRepository, 
            this.bookingFactory(),
        )
    }

    @Memoize(() => 1)
    async resolvers(): Promise<Resolvers> {
        const resolverFactory = await this.resolverFactory({})
        return resolverFactory.generate()
    }

    @Memoize(() => 1)
    async apolloServer(): Promise<ApolloServer> {
        const resolvers: any = await this.resolvers()
       return new ApolloServer({ typeDefs, resolvers });
    }

    @Memoize(() => 1)
    userFactory(): UserFactory {
        return new UserFactory()
    }

    @Memoize(() => 1)
    carSpaceFactory(): CarSpaceFactory {
        return new CarSpaceFactory(this.userFactory())
    }

    @Memoize(() => 1)
    bookingFactory(): BookingFactory {
        return new BookingFactory(this.userFactory(), this.carSpaceFactory())
    }
}