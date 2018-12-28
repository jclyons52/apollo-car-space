import { AsyncSetupFixture, AsyncTest, Expect, Timeout } from "alsatian";
import { Express } from "express";
import * as request from "supertest";
import { Repository } from "typeorm";
import { Container } from "./Container";
import { User } from "./entity/User";
import { UserFactory } from "./factory/UserFactory";
import { startServer } from "./start";
export class ResolverTest {
    private userFactory: UserFactory;
    private userRepository: Repository<User>;
    private app: Express;

    @AsyncSetupFixture
    public async asyncSetupFixture() {
        const c = await Container.create();
        this.userFactory = c.userFactory;
        this.userRepository = await c.userRepository;
        const [app] = await startServer(c);
        this.app =  app;
    }

    @AsyncTest()
    @Timeout(10000)
    public async registerMutationTest() {
        const user = this.userFactory.create({});
        const mutation = this.getRegisterMutation(user);
        const response = await request(this.app)
            .post("/graphql")
            .send({ query: mutation })
            .set("Accept", "application/json")
            .expect(200)
            ;
        Expect(response.body.data).toEqual({ register: { email: user.email } });
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
