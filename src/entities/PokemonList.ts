import PokemonListInterface from '@/interfaces/PokemonList.ts'

export default class PokemonList implements PokemonListInterface{
    
    constructor(
        private count: number,
        private next: string,
        private previous: string,
        private results: object[],
        private baseURL: string,
    ){
        this.insertPokemonId()
        this.insertImageLInks()
    }

    insertPokemonId(){
        this.results.forEach((pokemon:object) => {
            let id = pokemon.url.replace(`${this.baseURL}pokemon`, '').replaceAll('/', '').trim()
            pokemon['id'] = id
        })
    }
    insertImageLInks(){
        this.results.forEach((pokemon:object) => {
            let mainLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
            let secondaryLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`
            pokemon['images'] = {mainLink, secondaryLink}
        })
    }
}