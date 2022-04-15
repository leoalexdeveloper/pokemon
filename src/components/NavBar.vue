<template>
    <div :class="NavBarClass.container">
        <div>
            <nav :class="NavBarClass.nav">
                <ul :class="NavBarClass.ul">
                
                    <router-link to="/">
                        <li :class="[NavBarClass.li, 'btn-secondary text-light']">Teams</li>
                    </router-link>

                    <router-link v-if:="!checkSavedTeams()" :to="{name:'CreatePickBoard', params:{team:store.state.createTeam.currentTeamObject.name, page:store.state.createTeam.currentPage}}">
                        <li :class="[NavBarClass.li, 'bg-primary text-light']">Create Team</li>
                    </router-link>
                    
                    <router-link v-if:="checkSavedTeams()" :to="{name:'EditPickBoard', params:{team:store.state.createTeam.currentTeamObject.name, page:store.state.createTeam.currentPage}}">
                        <li :class="[NavBarClass.li, 'bg-primary text-light']">Edit Team</li>
                    </router-link>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const store = useStore()
const route = useRoute()

const NavBarClass = {
    container:"navbar-container container-fluid rounded-bottom position-sticky top-0 start-0 d-flex justify-content-center",
    nav:"nav-bar mx-5",
    ul: "list-unstyled d-flex justify-content-center",
    li:"btn m-2"
}

const CreateTeam = {
    teamName:ref<string>(String(route.params.team))
}

const checkSavedTeams = () => {
    return Object.keys(store.state.createTeam.savedTeams).find((key: string) => store.state.createTeam.savedTeams[key].uuid === store.state.createTeam.currentTeamObject.uuid) ? true : false
}
</script>

<style>
.navbar-container{
    max-width:auto;
    z-index:10;
    height: 4rem;
    background-color: rgba(255,255,255,0.8);
}
.navBarHidden{
    transform:translateY(-100%);
}
</style>

<style scoped>

</style>