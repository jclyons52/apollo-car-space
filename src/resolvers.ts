import { Repository } from "typeorm";
import { User } from "./entity/User";
import { Booking } from "./entity/Booking";
import { CarSpace } from "./entity/CarSpace";
import { BookingFactory } from "./factory/BookingFactory";
import { Resolvers, UserResolvers, BookingResolvers, CarSpaceResolvers } from "./generated/graphqlgen";

export class ResolverFactory {
    constructor(
        private userRepository: Repository<User>,
        private bookingRepository: Repository<Booking>,
        private carSpaceRepository: Repository<CarSpace>,
        private bookingFactory: BookingFactory
    ) { }

    public generate(): Resolvers {
        return {
            Query: {
                user: async (_, args) => {
                    const id = args.id
                    const user = await this.userRepository.findOne(id)
                    return user ? user : null
                }
            },
            Mutation: {
                populateDB: async (_, data) => {
                    const bookings = this.bookingFactory.createMany(data.bookingCount || 1)
                    await this.bookingRepository.save(bookings)
                    return true
                }
            },
            User: {
                ...UserResolvers.defaultResolvers,
                bookings: (user) => {
                    return this.bookingRepository.find({ where: { userId: user.id } })
                },
                carSpaces: (user) => {
                    return this.carSpaceRepository.find({ where: { ownerId: user.id } })
                }
            },
            Booking: {
                ...BookingResolvers.defaultResolvers,
                carSpace: async (booking) => {
                    const carSpace = await this.carSpaceRepository.findOne({
                        where: { bookings: [booking] }
                    })
                    if (!carSpace) {
                        throw new Error(`car space not found for booking ${booking.id}`)
                    }
                    return carSpace
                },
                user: async (booking) => {
                    const user = await this.userRepository.findOne({
                        where: { bookings: [booking] }
                    })
                    if (!user) {
                        throw new Error("could not find user")
                    }
                    return user
                }
            },
            CarSpace: {
                ...CarSpaceResolvers.defaultResolvers,
                bookings: (carSpace) => {
                    return this.bookingRepository.find({
                        where: { carSpaceId: carSpace.id }
                    })
                },
                owner: async (carSpace) => {
                    const user = await this.userRepository.findOne({
                        where: { carSpaces: [carSpace] }
                    })
                    if (!user) {
                        throw new Error("could not find owner")
                    }
                    return user
                }
            }
        }
    }
}