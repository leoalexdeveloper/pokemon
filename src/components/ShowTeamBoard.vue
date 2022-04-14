<template>
    <div :class="ShowViewBoard.container">
        <div v-if="checkSavedTeams()" 
             v-for:="(team, index, order) in teams" class="my-1 mt-3 p-2 d-flex align-items-start justify-content-center rounded ">
            <div :class="ShowViewBoard.teamContainer">
                <div :class="ShowViewBoard.teamName">
                    <p :class="ShowViewBoard.teamNameP" class="col-4 rounded-start">Team: {{utils.firstNameCaps(team.name)}}</p>
                    <p :class="ShowViewBoard.teamNameP" class="col-4">Created at: {{String(new Date(team.createdAt)).substring(4,24)}}</p>
                    <p :class="ShowViewBoard.teamNameP" class="col-4 rounded-end">Updated at: {{String(new Date(team.updatedAt)).substring(4,24)}}</p>
                </div>
                <div :class="ShowViewBoard.pokeContainer">
                    <div :class="ShowViewBoard.pokeCard" v-for:="(element, index) in (team.team as Array<PokemonEntity>)">
                        <p :class="ShowViewBoard.name">{{utils.firstNameCaps(element.name)}}</p>
                        <div :class="ShowViewBoard.imgContainer">
                            <object :class="ShowViewBoard.image" :data="element.images.mainLink" type="image/png">
                                <img :class="ShowViewBoard.image" :src="element.images.secondaryLink" :alt="`${element.name} image`" :title="`${element.name} image`">
                            </object>  
                        </div>
                    </div>
                </div>
                <div :class="ShowViewBoard.btnContainer">
                    <router-link  class="w-100 mx-0 d-flex justify-content-center" v-on:click="storeEditableTeam(index)" :to="{name:'EditPickBoard', params:{team:team.name, page:1}}">
                        <button :class="[ShowViewBoard.btn, 'btn-primary']">Edit</button>
                    </router-link>
                    <button v-on:click="deleteSavedTeamsItem(index)" :class="[ShowViewBoard.btn, 'btn-danger', 'mt-2']">Delete</button>
                </div>
            </div>
        </div>
        <div v-if="!checkSavedTeams()" class="container border p-5 text-center text-dark lead rounded-4 rounded lead fs-1 bg-light mt-5">
            <div class="empty-msg">Mount your team!</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import TeamEntity from  '../entities/Team'
import utils from '../utils/utils'
import PokemonEntity from '../entities/Pokemon'

const store = useStore()

const ShowViewBoard = {
    container: "container mt-2 py-2",
    teamContainer: "container-team m-auto p-2 rounded d-flex flex-row flex-wrap justify-content-between align-items-center border",
    teamName: "text-center col-12 d-flex flex-row justify-content-center align-items-center text-light bg-primary rounded",
    teamNameP: "name-p lead fs-5 text-start p-1 d-flex align-items-center justify-content-center mt-3",
    pokeContainer:"p-2 col-10 rounded d-flex justify-content-between",
    pokeCard: "w-25 mx-2 border p-2 rounded",
    imgContainer:"w-100 d-flex justify-content-center align-items-center",
    name:"poke-name rounded-top lead text-center bg-primary text-light",
    image:"image img-fluid w-100",
    btnContainer: "col-2 btn-container d-flex flex-column justify-content-start align-items-center",
    btn: "w-75 save btn btn-sm btn-primary",
    teamEmptyMsg: "background-color: rgba(255,255,255,0.2);"
}

const teams = reactive<TeamEntity[]>(store.state.createTeam.savedTeams)
console.log(teams)
const deleteSavedTeamsItem = (index: number) => {
    const team = store.state.createTeam.savedTeams[String(index)]
    if(window.confirm(`Confirm delete Team ${team.name}?`)){
        store.commit('deleteSavedTeamsItem', index)
        store.commit('clearCurrentTeam')
        if(store.state.createTeam.currentTeamObject.uuid === team.uuid){
            store.commit('setCurrentTeamObject', new TeamEntity())
        }
    }
}

const storeEditableTeam = (uuid: number) => {
    const editableTeamUuid: string | any = Object.keys(store.state.createTeam.savedTeams).find((key:string) => key === String(uuid))
    store.commit('setCurrentTeamObject', {...store.state.createTeam.savedTeams[editableTeamUuid]})
    store.commit('setCurrentTeam', [...store.state.createTeam.savedTeams[editableTeamUuid].team])
}

const checkSavedTeams = () => {
    return Object.keys({...store.state.createTeam.savedTeams}).length > 0 ? true : false
}
</script>

<style scoped>
.container{
    max-width:auto;
    min-width:800px;
    max-height:auto;
}
.container-team{
    background-color: rgba(255,255,255,0.8) !important;
}
.image{
    height:80px;
    object-fit:contain;
    object-position: center
}
.btn-container{
    height:auto;
}
.btn{
    display: flex;
    align-items:center;
    justify-content: center;
}
</style>