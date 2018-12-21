import { User } from "../entity/User";
import { MutationResolvers } from "../generated/graphqlgen";

export const Mutation: MutationResolvers.Type = {
    populateDB: async (_, data, c) => {
        const bookingFactory = await c.bookingFactory();
        const bookingRepository = await c.bookingRepository();
        const bookings = bookingFactory.createMany(data.bookingCount || 1);
        await bookingRepository.save(bookings);
        return true;
    },
    register: async (_, data, c) => {
        const userRepository = await c.userRepository();
        const user = User.create(data);
        return userRepository.save(user);
    },
};
