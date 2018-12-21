
export abstract class Factory<T> {
    public abstract create(entity: Partial<T>): T;
    public createMany(count: number, entity: Partial<T> = {}): T[] {
        const range =  [...Array(count).keys()];
        return range.map(() => this.create(entity));
    }
}
