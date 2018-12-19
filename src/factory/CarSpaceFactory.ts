import { CarSpace } from "../entity/CarSpace";
import { Factory } from "./Factory";
import { UserFactory } from "./UserFactory";
import * as faker from 'faker';

export class CarSpaceFactory extends Factory<CarSpace> {
    constructor(private userFactory: UserFactory) {
        super();
    }
    public create({
        address = faker.address.streetAddress(),
        longitude = faker.address.longitude(),
        latitude = faker.address.latitude(),
        owner = Promise.resolve(this.userFactory.create({})),
    }: Partial<CarSpace>): CarSpace {
        return CarSpace.create({ address, longitude, latitude, owner })
    }
    
}