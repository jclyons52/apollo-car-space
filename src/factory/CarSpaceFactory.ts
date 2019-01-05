import * as faker from "faker";
import { Repository } from "typeorm";
import { CarSpace } from "../entity/CarSpace";
import { User } from "../entity/User";
import { Factory } from "./Factory";

export class CarSpaceFactory extends Factory<CarSpace> {

    constructor(private userFactory: Factory<User>, private carSpaceRepository: Repository<CarSpace>) {
        super();
    }

    public async make(entity: Partial<CarSpace>): Promise<CarSpace> {
        const owner = await this.userFactory.make({});
        const carSpace = this.create({ owner, ...entity });
        return this.carSpaceRepository.save(carSpace);
    }

    public create({
        address = faker.address.streetAddress(),
        longitude = faker.address.longitude(),
        latitude = faker.address.latitude(),
        owner = this.userFactory.create({}),
    }: Partial<CarSpace>): CarSpace {
        return CarSpace.create({ address, longitude, latitude, owner });
    }

}
