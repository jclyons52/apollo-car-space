import * as bcrypt from "bcryptjs";
import { MutationResolvers } from "../generated/graphqlgen";

export const Mutation: MutationResolvers.Type = {
    populateDB: async (_, __, c) => {
        await c.bookingFactory.make({});
        return true;
    },
    register: async (_, data, c) => {
        const userRepository = c.userRepository;
        const count = await userRepository.count({ where: { email: data.email } });
        if (count > 0) {
            throw new Error("user already registered");
        }
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(data.password, salt);
        const user = userRepository.create({ ...data, password: hash });
        return userRepository.save(user);
    },
    login: async (_, data, c) => {
        const userRepository = c.userRepository;
        const user = await userRepository.findOneOrFail({ where: { email: data.email } });
        return bcrypt.compare(data.password, user.password);
    },
};
