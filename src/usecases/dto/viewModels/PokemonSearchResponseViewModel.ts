export default class PokemonSearchResponseViewModel {
    private id: number;

    private code: string;

    private name: string;

    private generationNo: number;

    constructor(id: number, code: string, name: string, generationNo: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.generationNo = generationNo;
    }
}
