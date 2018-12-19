import { Factory } from "./Factory";
import { User } from "../entity/User";
import * as faker from 'faker';

export class UserFactory extends Factory<User> {
    public create({
        email = faker.internet.email(),
        name = faker.name.findName(),
        userName = faker.internet.userName(),
        password = faker.internet.password(),
    }: Partial<User>): User {
        return User.create({ email, name, userName, password })
    }
}