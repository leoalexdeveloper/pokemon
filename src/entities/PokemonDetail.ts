import PokemonDetailInterface from '@/interfaces//PokemonDetail.ts'
export default class PokemonDetail implements PokemonDetailInterface{
    constructor(
        private abilities: object[],
        private types: object[],
        private stats: object[]
    ){}
}