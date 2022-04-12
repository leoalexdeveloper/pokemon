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
        <div v-if="!Pokemon.editName.value" :class="TeamBoardClasses.teamName">
            <div class="border p-2 rounded">
                Team: {{store.state.createTeam.currentTeamObject.name}}
                <button v-on:click="changeName" class="btn btn-sm btn-primary border">Edit team name</button>
            </div>
            <div class="col-7 d-flex justify-content-around align-items-center p-0">
                <div :class="{'bg-success':validate(), 'text-light':validate(), 'bg-warning':!validate(), 'text-dark':!validate()}" 
                class="border rounded p-1 col-9 text-center d-flex justify-content-evenly" role="alert">
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
        <EditPokemonName v-if="Pokemon.editName.value" v-on:changeTeamName="changeName" class=""/>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, onUpdated, watch, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import TeamEntity from  '@/entities/Team.ts'
import EmptySlot from '@/components/EmptySlot.vue'
import PokemonSlot from '@/components/PokemonSlot.vue'
import EditPokemonName from '@/components/EditPokemonName.vue'

const store = useStore()
const route = useRoute()

const Pokemon = {
    team: reactive(store.state.createTeam.currentTeamObject.team),
    validTeam: ref<boolean>(false),
    disableEditTeamName: ref<boolean>(false),
    teamName: ref<string>(store.state.createTeam.currentTeamObject.name),
    editName: ref<boolean>(false)
}

const TeamBoardClasses = {
    container: "team-container container bg-light border position-sticky top-0 start-0 d-flex flex-column justify-content-between",
    teamName: "w-100 border bg-primary text-light fs-6 p-2 rounded lead d-flex justify-content-between align-items-center",
    cardContainer: "d-flex justify-content-between",
    card: "card m-2 mt-2 d-flex flex-row border",
}

const removeFromSlot = (index: number) => {
    store.commit('deleteCurrentTeamItem', index)
}

const saveTeam = () => {
    if(validate()){
        const savedTeams = store.state.createTeam.savedTeams
        savedTeams[store.state.createTeam.currentTeamObject.uuid] = {...store.state.createTeam.currentTeamObject}
        store.commit('saveTeams', savedTeams)
         console.log(savedTeams[store.state.createTeam.currentTeamObject.uuid])
        resetCurrentTeamObject()
    }
}

const resetCurrentTeamObject = () => {
    store.commit('setCurrentTeamObject', new TeamEntity())
}

const disableSaveButton = () => {
    return validate()
    ?
    true
    :
    false
}

const validate = () => {
    return Pokemon.team.length === store.state.createTeam.maxSlotNumber ? true : false
}

const countTeamPokemons = () => {
    const count = store.state.createTeam.maxSlotNumber - store.state.createTeam.currentTeamObject.team.length
    if(count < 1){
        return 'Great job! Click on save to store this team.'
    }else{
        return `You should choose ${count} pokemons yet!`
    }
}

const changeName = () => {
    Pokemon.editName.value = !Pokemon.editName.value
}
</script>

<style scoped>

.team-container{
    z-index: 2;
}
</style>