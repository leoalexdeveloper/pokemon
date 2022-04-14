import PokemonDetailInterface from '../interfaces/PokemonDetail'
export default class PokemonDetail implements PokemonDetailInterface{
    constructor(
        public abilities: {'ability':{'name':string, 'url':string}} = {'ability':{'name':'', 'url':''}},
        public types: {'type':{'name':string, 'url':string}} = {'type':{'name':'', 'url':''}},
        public stats: {'base_stat':number, 'effort':number, 'stat':{'name':string, 'url':string}} = {'base_stat':0, 'effort':0, 'stat':{'name':'', 'url':''}}
    ){}
}