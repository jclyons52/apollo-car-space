import { QueryResolvers } from "../generated/graphqlgen";

export const Query: QueryResolvers.Type = {
    user: async (_, args, ctx) => {
        const id = args.id
        const repository =  await ctx.userRepository()
        const user = await repository.findOne(id)
        return user ? user : null
    }
}