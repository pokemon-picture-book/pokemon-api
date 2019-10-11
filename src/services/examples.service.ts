const id = 0;
interface Example {
    id: number;
    name: string;
}

const examples: Example[] = [
    { id: id + 1, name: 'example 0' },
    { id: id + 1, name: 'example 1' }
];

export class ExamplesService {
    all(): Promise<Example[]> {
        return Promise.resolve(examples);
    }

    byId(iid: number): Promise<Example> {
        return this.all().then(r => r[iid]);
    }

    create(name: string): Promise<Example> {
        const example: Example = {
            id: id + 1,
            name
        };
        examples.push(example);
        return Promise.resolve(example);
    }
}

export default new ExamplesService();
