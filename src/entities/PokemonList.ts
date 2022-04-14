import PokemonListInterface from '../interfaces/PokemonList'
import PokemonInterface from '../interfaces/Pokemon'

export default class PokemonList implements PokemonListInterface{
    
    constructor(
        public count: number,
        public next: string,
        public previous: string,
        public results: Array<PokemonInterface>,
        public baseURL: string,
    ){
        this.insertPokemonId()
        this.insertImageLInks()
    }

    insertPokemonId(){
        this.results.forEach((pokemon:PokemonInterface) => {
            let id = pokemon.url.replace(`${this.baseURL}pokemon`, '').replaceAll('/', '').trim()
            pokemon['id'] = id
        })
    }
    insertImageLInks(){
        this.results.forEach((pokemon:PokemonInterface) => {
            let mainLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
            let secondaryLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`
            pokemon['images'] = {mainLink, secondaryLink}
        })
    }
}