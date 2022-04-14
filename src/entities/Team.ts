import TeamInterface from '../interfaces/Team'
import PokemonInterface from '../interfaces/Pokemon'
import { v4 as uuidv4 } from 'uuid'

export default class Team implements TeamInterface{
    public uuid: string
    public createdAt: number
    public updatedAt: number
    constructor(
        public name: string = '',
        public team: Array<PokemonInterface> = [],
        public rating: number = 1
    ){
        this.uuid = uuidv4()
        this.createdAt = Date.now()
        this.updatedAt = Date.now()
    }
}