import * as faker from "faker";
import { User } from "../entity/User";
import { Factory } from "./Factory";

export class UserFactory extends Factory<User> {
    public create({
        email = faker.internet.email(),
        name = faker.name.findName(),
        userName = faker.internet.userName(),
        password = faker.internet.password(),
    }: Partial<User>): User {
        return User.create({ email, name, userName, password });
    }
}
