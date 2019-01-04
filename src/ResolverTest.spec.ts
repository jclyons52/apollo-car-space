import { AsyncSetupFixture, AsyncTest, Expect, Timeout } from "alsatian";
import { Express } from "express";
import * as request from "supertest";
import { Repository } from "typeorm";
import { Container } from "./Container";
import { User } from "./entity/User";
import { UserFactory } from "./factory/UserFactory";
import { startServer } from "./start";

export class ResolverTest {
    private ctx: Container;
    private userFactory: UserFactory;
    private userRepository: Repository<User>;
    private app: Express;

    @AsyncSetupFixture
    public async asyncSetupFixture() {
        this.ctx = await Container.create();
        this.userFactory = this.ctx.userFactory;
        this.userRepository = this.ctx.userRepository;
        const [app] = await startServer(this.ctx);
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

    @AsyncTest()
    @Timeout(10000)
    public async getUserBookings() {
        const booking = await this.ctx.bookingFactory.make({});
        const query = `
            {
                user(id: ${booking.user.id}) {
                    bookings {
                        start,
                        end,
                        carSpace {
                            address
                        },
                        user {
                            name
                        }
                    }
                }
            }
        `;

        const response = await request(this.app)
        .post("/graphql")
        .send({ query })
        .set("Accept", "application/json")
        .expect(200);
        Expect(response.body.data.user.bookings[0].user.name).toEqual(booking.user.name);
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
