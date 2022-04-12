<template>
    <div :class="ShowViewBoard.container">
        <div v-for:="(team, index, order) in teams" class="my-1 mt-3 p-2 d-flex align-items-start justify-content-center border rounded ">
            <div :class="ShowViewBoard.teamContainer">
                <div :class="ShowViewBoard.teamName">
                    <p :class="ShowViewBoard.teamNameP" class="col-4 rounded-start">Team: {{team.name}}</p>
                    <p :class="ShowViewBoard.teamNameP" class="col-4">Created at: {{String(new Date(team.createdAt)).substring(4,24)}}</p>
                    <p :class="ShowViewBoard.teamNameP" class="col-4 rounded-end">Updated at: {{String(new Date(team.updatedAt)).substring(4,24)}}</p>
                </div>
                <div :class="ShowViewBoard.pokeContainer">
                    <div :class="ShowViewBoard.pokeCard" v-for:="(element, index) in team.team">
                        <p :class="ShowViewBoard.name">{{element.name}}</p>
                        <div :class="ShowViewBoard.imgContainer">
                            <object :class="ShowViewBoard.image" :data="element.images.mainLink" type="image/png">
                                <img :class="ShowViewBoard.image" :src="element.images.secondaryLink" :alt="`${element.name} image`" :title="`${element.name} image`">
                            </object>  
                        </div>
                    </div>
                </div>
                <div :class="ShowViewBoard.btnContainer">
                    <router-link  v-on:click="storeEditableTeam(team)" :to="{name:'EditPickBoard', params:{team:team.name, page:1}}">
                        <button :class="ShowViewBoard.btnSave">Edit</button>
                    </router-link>
                    <button v-on:click="deleteSavedTeamsItem(index)" :class="ShowViewBoard.btnDelete">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const ShowViewBoard = {
    container: "container mt-4 py-2",
    teamContainer: "containerw-100 m-auto p-0 rounded d-flex flex-row flex-wrap justify-content-between align-items-center",
    teamName: "text-center col-12 d-flex flex-row justify-content-center align-items-start text-light",
    teamNameP: "name-p lead fs-6 text-start p-1 bg-primary d-flex align-items-center justify-content-center",
    pokeContainer:"p-2 col-10 rounded d-flex justify-content-between",
    pokeCard: "border p-2 rounded",
    imgContainer:"d-flex justify-content-center align-items-center",
    name:"poke-name w-100 rounded-top fs-6 lead text-center bg-primary text-light",
    image:"image img-fluid",
    btnContainer: "col-1 border btn-container d-flex flex-column justify-content-center align-items-center",
    btnSave: "w-100 save btn btn-sm btn-primary mx-2",
    btnDelete: "w-100 delete mt-2 btn btn-sm btn-danger"
}

const teams = reactive<object[]>(store.state.createTeam.savedTeams)



const deleteSavedTeamsItem = (index: string) => {
    if(window.confirm(`Confirm delete Team ${index}?`)){
        store.commit('deleteSavedTeamsItem', index)
    }
}

const storeEditableTeam = (team: object) => {
    store.commit('setCurrentTeamObject', team)
}
</script>

<style scoped>
.container{
    min-width: 600px;
    max-height:auto;
}
.image{
    min-width:100px;
    max-width:100px;
    height:40px;
    object-fit:contain;
    object-position: center
}
.btn-container{

    height:auto;
}
.name-p{
    font-size: 0.9rem !important;
    min-height: auto;
}
.save, .delete{
    height:1.1rem;
    display: flex;
    align-items:center;
    justify-content: center;
    font-size:0.8rem;
}
.poke-name{
    font-size: 0.9rem !important;
}
</style>