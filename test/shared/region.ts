export const getRegionPokemonNum = (...regionNames: string[]) => {
    const regionPokemonNum: { [k: string]: number } = {
        kanto: 151,
        johto: 100,
        hoenn: 135,
        innoh: 107,
        unova: 156,
        kalos: 72,
        alola: 86
    };
    return Object.keys(regionPokemonNum)
        .filter(key => regionNames.includes(key))
        .reduce((sum, key) => sum + regionPokemonNum[key], 0);
};

export default {};
