import * as fs from 'fs';
import * as yaml from 'yaml';

/**
 * 設定ファイル読み込みに関するクラス。
 *
 * @export
 * @class Env
 */
export default class YamlProperty {
    private yamlPropertys: any = yaml.parse(
        fs.readFileSync(`${__dirname}/../../config/app.yml`, 'utf8')
    );

    public load(key: string): any {
        const filler: string = '.';

        if (key.indexOf(filler) >= 0) {
            const keyList: string[] = key.split(filler);

            return this.scan(this.yamlPropertys, keyList.values());
        }

        return this.yamlPropertys[key];
    }

    private scan(
        yamlProperty: any,
        keyIterator: IterableIterator<string>
    ): string | number {
        const { value, done }: IteratorResult<string, any> = keyIterator.next();

        return done
            ? yamlProperty
            : this.scan(yamlProperty[value], keyIterator);
    }
}
