export default interface PokemonList{
    baseURL: string,
    count: number,
    next: string,
    previous: string,
    results: object[]
}