import { CarSpaceResolvers } from "../generated/graphqlgen";

export const CarSpace: CarSpaceResolvers.Type = {
    ...CarSpaceResolvers.defaultResolvers,
    bookings: async (carSpace, _, c) => {
        const bookingRepository = c.bookingRepository;
        return bookingRepository.find({
            where: { carSpaceId: carSpace.id },
        });
    },
    owner: async (carSpace, _, c) => {
        const userRepository = c.userRepository;
        const user = await userRepository.findOne({
            where: { carSpaces: [carSpace] },
        });
        if (!user) {
            throw new Error("could not find owner");
        }
        return user;
    },
};
