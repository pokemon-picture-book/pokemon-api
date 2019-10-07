import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

const scan = (
    yamlProperty: any,
    keyIterator: IterableIterator<string>
): string | number => {
    const { value, done }: IteratorResult<string> = keyIterator.next();

    return done ? yamlProperty : scan(yamlProperty[value], keyIterator);
};

const load = (yamlPropertys: YamlPropertys, key: string) => {
    const filler: string = '.';

    if (key.indexOf(filler) >= 0) {
        const keyList: string[] = key.split(filler);

        return scan(yamlPropertys, keyList.values());
    }

    return yamlPropertys[key];
};

export default (key: string): any => {
    try {
        const yamlPropertys: YamlPropertys = yaml.safeLoad(
            fs.readFileSync(
                path.resolve(__dirname, '../../config/app.yml'),
                'utf8'
            )
        );

        return load(yamlPropertys, key);
    } catch (err) {
        throw new Error(err);
    }
};
