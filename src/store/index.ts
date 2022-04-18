import { createStore } from 'vuex'
import Api from '../classes/Api'
import PokemonListEntity from '../entities/PokemonList'
import PokemonDetailEntity from '../entities/PokemonDetail'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
}).plugin

export default createStore({
    state:{
        
    },
    mutations:{

    },
    actions:{
       
    },
    modules:{
        createTeam:{
            state:()=>{
                return {
                    baseURL: "https://pokeapi.co/api/v2/" as string,
                    currentTeamObject: {} as object,
                    currentTeam: [] as object[],
                    savedTeams: {} as object,
                    pokemonList: {} as object,
                    pokemonDetail: {} as object,
                    maxElementsToShow: 14 as number,
                    currentPage: 1 as number,
                    selectedRange: [] as number[],
                    maxSlotNumber: 5 as number,
                }
            },
            mutations:{
                setCurrentTeamObject(state, payload: object){
                    Object.assign(state.currentTeamObject, {...payload})
                },
                setPokemonList(state, payload){           
                    payload.then((res: PokemonListEntity) => Object.assign(state.pokemonList, (new PokemonListEntity(res.count, res.next, res.previous, res.results, state.baseURL))))
                },
                setCurrentPage(state, payload){
                    state.currentPage = payload
                },
                setCurrentTeam(state, payload){
                    state.currentTeam = [...payload]
                },
                pushToCurrentTeam(state, payload){
                   state.currentTeam.push({...payload})
                },
                clearCurrentTeam(state, payload){
                    state.currentTeam = []
                },
                deleteCurrentTeamItem(state, index){
                    state.currentTeam.splice(index, 1)
                },
                saveTeams(state, team){
                    
                    Object.assign(state.savedTeams, {...team})
                    console.log(state.savedTeams)
                },
                deleteSavedTeamsItem(state, index: string){ 
                    delete state.savedTeams[index]
                },
                setPokemonDetail(state, [pokemonId, pokemon]){
                    const pokemonDetail = state.pokemonDetail
                    pokemon.then((res:PokemonDetailEntity) => pokemonDetail[String(pokemonId)] = new PokemonDetailEntity(res.abilities, res.types, res.stats))
                    Object.assign(state.pokemonDetail, pokemonDetail)
                }
            },
            actions:{ 
                getPokemonList({commit}, [limit, offset]:string[]){
                    commit('setPokemonList', Api.get(`pokemon?limit=${limit}&offset=${offset}`))
                },
                getPokemonDetail({commit}, pokemonId){
                    commit('setPokemonDetail', [pokemonId, Api.get(`/pokemon/${pokemonId}`)])
                }
            },
            getters:{
             
            }
        },
    },
    getters:{
        
    },
    plugins:[vuexLocal]
})