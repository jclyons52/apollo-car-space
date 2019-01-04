import * as faker from "faker";
import { Repository } from "typeorm";
import { CarSpace } from "../entity/CarSpace";
import { Factory } from "./Factory";
import { UserFactory } from "./UserFactory";

export class CarSpaceFactory extends Factory<CarSpace> {

    constructor(private userFactory: UserFactory, private carSpaceRepository: Repository<CarSpace>) {
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
