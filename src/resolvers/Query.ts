import { QueryResolvers } from "../generated/graphqlgen";

export const Query: QueryResolvers.Type = {
    user: async (_, args, ctx) => {
        const id = args.id;
        const repository = ctx.userRepository;
        const user = await repository.findOne(id);
        return user ? user : null;
    },
    users: async (_, __, ctx) => {
        return ctx.userRepository.find();
    },
};
