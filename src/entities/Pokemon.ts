import PokemonInterface from '../interfaces/Pokemon'

export default class Pokemon implements PokemonInterface{
    constructor(
        public name:string,
        public images:{'mainLink':string, 'secondaryLink':string},
        public id:string,
        public url:string
    ){}
}