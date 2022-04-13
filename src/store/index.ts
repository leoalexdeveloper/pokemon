import { createStore } from 'vuex'
import Api from '@/classes/Api.ts'
import PokemonListEntity from '@/entities/PokemonList.ts'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
}).plugin

export default createStore({
    state:{
        baseURL: "https://pokeapi.co/api/v2/"
    },
    mutations:{

    },
    actions:{
       
    },
    modules:{
        createTeam:{
            state:()=>{
                return {
                    currentTeamObject: {} as object,
                    currentTeam: [] as object[],
                    savedTeams: {} as object,
                    pokemonList: {} as object,
                    maxElementsToShow: 14 as number,
                    currentPage: 1 as number,
                    selectedRange: [] as number[],
                    maxSlotNumber: 4 as number,
                }
            },
            mutations:{
                setCurrentTeamObject(state, payload: object){
                    Object.assign(state.currentTeamObject, {...payload})
                },
                setPokemonList(state, payload){             
                    payload.then((res: object) => Object.assign(state.pokemonList, (new PokemonListEntity(res.data.count, res.data.next, res.data.previous, res.data.results, this.state.baseURL))))
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
                    state.currentTeam.length = 0
                },
                deleteCurrentTeamItem(state, index){
                    state.currentTeam.splice(index, 1)
                },
                saveTeams(state, team){
                    Object.assign(state.savedTeams, {...team})
                },
                deleteSavedTeamsItem(state, index: string){ 
                    delete state.savedTeams[index]
                }
            },
            actions:{ 
                getPokemonList({commit}, [limit, offset]:string[]){
                    commit('setPokemonList', Api.get(`pokemon?limit=${limit}&offset=${offset}`))
                },
            },
            getters:{
             
            }
        },
    },
    getters:{
        
    },
    plugins:[vuexLocal]
})