<template>
    <div :class="TeamBoardClasses.container">
        <div :class="TeamBoardClasses.cardContainer">
            <div :class="TeamBoardClasses.card" 
                v-for:="index in store.state.createTeam.maxSlotNumber">
                <div v-if:="!Pokemon.team[index-1]">
                    <EmptySlot :index="index"/>
                </div>
                <div v-else:="">
                    <PokemonSlot v-on:removeFromSlot="removeFromSlot" :pokemonTeam="Pokemon.team[index-1]" :index="index"/>
                </div>
            </div>
        </div>
        <div v-if="!Pokemon.editName.value" :class="TeamBoardClasses.panel">
            <div class="w-auto border rounded p-2 d-flex align-items-center justify-content-between">
                Team: {{utils.firstNameCaps(store.state.createTeam.currentTeamObject.name)}}
                <button v-on:click="changeNameBox" class="btn btn-sm btn-secondary border mx-2">Edit</button>
            </div>
            <div class="col-8 d-flex justify-content-around align-items-center p-0">
                <div :class="[TeamBoardClasses.alertBox, {'bg-success':validate(), 'text-light':validate(), 'bg-warning':!validate(), 'text-dark':!validate()}]" role="alert">
                    {{countTeamPokemons()}}
                    <div v-if:="disableSaveButton()">
                        <router-link :to="{name:'ViewTeam'}">
                            <button v-on:click="saveTeam" 
                                    class="btn btn-primary px-2 py-0 btn-sm rounded border border-light">Save</button>
                        </router-link>
                    </div>
                </div>
                <div>
                    <router-link v-on:click="resetCurrentTeamObject" to="/">
                        <button class="btn btn-danger text-light px-2 btn-sm rounded border">Cancel</button>
                    </router-link>
                </div>
            </div>
        </div>
        <EditPokemonName v-if="Pokemon.editName.value" v-on:changeTeamName="changeNameBox" v-on:closeChangeTeamNameBox="changeNameBox"/>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import TeamEntity from  '../entities/Team'
import EmptySlot from '../components/EmptySlot.vue'
import PokemonSlot from '../components/PokemonSlot.vue'
import EditPokemonName from '../components/EditPokemonName.vue'
import utils from '../utils/utils'
import Team from '../entities/Team'

const store = useStore()
const route = useRoute()

const Pokemon = {
    team: reactive(store.state.createTeam.currentTeam),
    teamTemp: {...store.state.createTeam.currentTeam},
    validTeam: ref<boolean>(false),
    disableEditTeamName: ref<boolean>(false),
    teamName: ref<string>(store.state.createTeam.currentTeamObject.name),
    editName: ref<boolean>(false),
    modifyTeam: ref(false)
}

const TeamBoardClasses = {
    container: "team-container container position-sticky top-0 start-0 my-2",
    panel: "w-100 bg-primary text-light fs-6 p-2 rounded-bottom lead d-flex flex-wrap justify-content-between align-items-center",
    cardContainer: "card-container d-flex flex-wrap justify-content-evenly mb-2 rounded-top",
    card: "card m-2 mt-2 d-flex flex-row",
    alertBox:"border rounded p-1 col-9 text-center d-flex justify-content-evenly"
}

const removeFromSlot = (index: number) => {
    store.commit('deleteCurrentTeamItem', index)
}

const saveTeam = () => {
    if(validate()){
        const savedTeams = {...store.state.createTeam.savedTeams}
        if(route.fullPath.includes('/create')) store.state.createTeam.currentTeamObject['createdAt'] = Date.now()
        store.state.createTeam.currentTeamObject['updatedAt'] = Date.now()
        store.state.createTeam.currentTeamObject.team = [...store.state.createTeam.currentTeam]
        savedTeams[store.state.createTeam.currentTeamObject.uuid] = {...store.state.createTeam.currentTeamObject}
        store.commit('saveTeams', {...savedTeams})
        resetCurrentTeamObject()
    }
}

const resetCurrentTeamObject = () => {
    store.commit('clearCurrentTeam')
    store.commit('setCurrentTeamObject', {...new TeamEntity()})
}

const disableSaveButton = () => {
    return validate()
    ?
    true
    :
    false
}

const validate = () => {
    return Pokemon.team.length === store.state.createTeam.maxSlotNumber 
    && Pokemon.modifyTeam.value 
    ? 
    true 
    : 
    false
}

const countTeamPokemons = () => {
    const count = store.state.createTeam.maxSlotNumber - store.state.createTeam.currentTeam.length
    const compareTeams = JSON.stringify(Object.values(Pokemon.teamTemp)) === JSON.stringify(Object.values(Pokemon.team))
    console.log()
    
    if(compareTeams && store.state.createTeam.currentTeam.length > 0){
        Pokemon.modifyTeam.value = false
        return 'Modify your team!'
    }else if(compareTeams && store.state.createTeam.currentTeam.length === 0){
        return 'Pick some pokemon!'
    }else{
        Pokemon.modifyTeam.value = true
        if(count < 1){
            return 'Great job! Click on save to store this team.'
        }else{
            return `You could pick ${count} pokemons!`
        }
    }
}

const changeNameBox = () => {
    Pokemon.editName.value = !Pokemon.editName.value
}

onMounted(()=>{
    scroll()
})

onUpdated(()=>{
    

})
</script>

<style scoped>

.team-container{
    min-width: 600px;
    z-index: 2;
}
.card-container{
    background-color: rgba(255,255,255,0.8)
}
</style>