import { AsyncSetupFixture, AsyncTest, Expect, TeardownFixture } from "alsatian";
import { request } from "graphql-request";
import { Repository } from "typeorm";
import { host } from "./constants";
import { Container } from "./Container";
import { User } from "./entity/User";
import { UserFactory } from "./factory/UserFactory";
import { startServer } from "./start";

export class ResolverTest {
    private userFactory: UserFactory;
    private userRepository: Repository<User>;

    @AsyncSetupFixture
    public async asyncSetupFixture() {
        const container = new Container();
        this.userFactory = container.userFactory();
        this.userRepository = await container.userRepository();
        await startServer(container);
    }

    @TeardownFixture
    public teardownFixture() { }

    @AsyncTest()
    public async registerMutationTest() {
        const user = this.userFactory.create({});
        const mutation = this.getRegisterMutation(user);
        const response = await request(host, mutation);
        Expect(response).toEqual({ register: { email: user.email } });
        const users = await this.userRepository.find({ where: { email: user.email } });
        Expect(users.length).toEqual(1);
        Expect(users[0].email).toEqual(user.email);
        Expect(users[0].password).not.toEqual(user.password);
    }

    private getRegisterMutation({name, userName, email, password }: User) {
        return `
            mutation {
                register(name: "${name}", userName: "${userName}", email: "${email}", password: "${password}") {
                    email
                }
            }
        `;
    }
}
