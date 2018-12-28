import { BookingResolvers } from "../generated/graphqlgen";

export const  Booking: BookingResolvers.Type = {
    ...BookingResolvers.defaultResolvers,
    carSpace: async (booking, _, c) => {
        const carSpaceRepository = c.carSpaceRepository;
        const carSpace = await carSpaceRepository.findOne({
            where: { bookings: [booking] },
        });
        if (!carSpace) {
            throw new Error(`car space not found for booking ${booking.id}`);
        }
        return carSpace;
    },
    user: async (booking, _, c) => {
        const userRepository = c.userRepository;
        const user = await userRepository.findOne({
            where: { bookings: [booking] },
        });
        if (!user) {
            throw new Error("could not find user");
        }
        return user;
    },
};
