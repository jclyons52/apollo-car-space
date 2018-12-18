import { IResolvers } from "graphql-tools"
import { Repository } from "typeorm";
import { User } from "./entity/User";
import { Booking } from "./entity/Booking";
import { CarSpace } from "./entity/CarSpace";

export class ResolverFactory {
    constructor(
        private userRepository: Repository<User>,
        private bookingRepository: Repository<Booking>,
        private carSpaceRepository: Repository<CarSpace>
        ) {}

    public generate(): IResolvers {
        return {
            Query: {
                user: (_, args) => {
                    const id = args.id
                    return this.userRepository.findOne(id)
                }
            },
            User: {
                bookings: (user: User) => {
                    return this.bookingRepository.find({ where: { userId: user.id } })
                },
                carSpaces: (user: User) => {
                    return this.carSpaceRepository.find({ where: { ownerId: user.id }})
                }
            },
            Booking: {
                carSpace: (booking: Booking) => {
                    return this.carSpaceRepository.findOne({ 
                        where: { bookings: [booking] } 
                    })
                },
                user: (booking: Booking) => {
                    return  this.userRepository.findOne({
                        where: { bookings: [booking] }
                    })
                }
            },
            CarSpace: {
                bookings: (carSpace: CarSpace) => {
                    return this.bookingRepository.find({ 
                        where: { carSpaceId: carSpace.id }
                    })
                },
                owner: (carSpace: CarSpace) => {
                    return this.userRepository.findOne({
                        where: { carSpaces: [carSpace] }
                    })
                }
            }
        }
    }
}