export default interface PokemonDetail{
    abilities: {'ability':{'name':string, 'url':string}},
    types: {'type':{'name':string, 'url':string}},
    stats: {'base_stat':number, 'effort':number, 'stat':{'name':string, 'url':string}}
}