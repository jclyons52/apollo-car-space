import { UserResolvers } from "../generated/graphqlgen";

export const User: UserResolvers.Type = {
    ...UserResolvers.defaultResolvers,
    bookings: async (user, _, c) => {
        const bookingRepository = await c.bookingRepository();
        return bookingRepository.find({ where: { userId: user.id } });
    },
    carSpaces: async (user, _, c) => {
        const carSpaceRepository = await c.carSpaceRepository();
        return carSpaceRepository.find({ where: { ownerId: user.id } });
    },
};
