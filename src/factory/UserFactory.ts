import * as faker from "faker";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { Factory } from "./Factory";

export class UserFactory extends Factory<User> {

    constructor(private userRepository: Repository<User>) {
        super();
    }

    public make(entity: Partial<User>): Promise<User> {
        const user = this.create(entity);
        return this.userRepository.save(user);
    }
    public create({
        email = faker.internet.email(),
        name = faker.name.findName(),
        userName = faker.internet.userName(),
        password = faker.internet.password(),
    }: Partial<User>): User {
        return User.create({ email, name, userName, password });
    }
}
