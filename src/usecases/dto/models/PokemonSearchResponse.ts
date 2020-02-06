export default class PokemonSearchResponse {
    private pId: number;

    private pCode: string;

    private pName: string;

    private pGenerationNo: number;

    constructor(id: number, code: string, name: string, generationNo: number) {
        this.pId = id;
        this.pCode = code;
        this.pName = name;
        this.pGenerationNo = generationNo;
    }

    get id(): number {
        return this.pId;
    }

    get code(): string {
        return this.pCode;
    }

    get name(): string {
        return this.pName;
    }

    get generationNo(): number {
        return this.pGenerationNo;
    }
}
