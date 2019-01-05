import * as bcrypt from "bcryptjs";
import { Booking } from "../entity/Booking";
import { CarSpace } from "../entity/CarSpace";
import { MutationResolvers } from "../generated/graphqlgen";

export const Mutation: MutationResolvers.Type = {
    populateDB: async (_, __, c) => {
        await c.bookingFactory.make({});
        return true;
    },
    register: async (_, data, c) => {
        const count = await c.userRepository.count({ where: { email: data.email } });
        if (count > 0) {
            throw new Error("user already registered");
        }
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(data.password, salt);
        const user = c.userRepository.create({ ...data, password: hash });
        return c.userRepository.save(user);
    },
    login: async (_, data, c) => {
        const user = await c.userRepository.findOneOrFail({ where: { email: data.email } });
        return bcrypt.compare(data.password, user.password);
    },
    addCarSpace: async (_, { ownerId, latitude, longitude, address }, c) => {
        const owner = await c.userRepository.findOneOrFail(ownerId);
        const carSpace = CarSpace.create({ owner, latitude, longitude, address });
        return c.carSpaceRepository.save(carSpace);
    },
    addBooking: async (_, { userId, carSpaceId, start, end }, c) => {
        const user = await c.userRepository.findOneOrFail(userId);
        const carSpace = await c.carSpaceRepository.findOneOrFail(carSpaceId);
        const booking = Booking.create({ user, carSpace, start: new Date(start), end: new Date(end) });
        return c.bookingRepository.save(booking);
    },
};
