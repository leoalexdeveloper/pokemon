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

import { ref, onMounted, onUpdated } from 'vue'

const store = useStore()
const route = useRoute()

const NavBarClass = {
    container:"navbar-container container w-100 rounded-bottom position-sticky top-0 start-0 d-flex justify-content-end",
    nav:"nav-bar w-100",
    ul: "list-unstyled d-flex justify-content-center",
    li:"btn m-2"
}

const CreateTeam = {
    teamName:ref<string>(String(route.params.team))
}

const scrollHide = () => {
    
    const scrollCoords:number[] = []
    const navBarElement = document.querySelector('.navbar-container')
    
    window.onscroll = () => {
        scrollCoords.push(window.scrollY)
        if(scrollCoords[0] > scrollCoords[4]){
            navBarElement.classList.remove('navBarHidden')
        }else{
            navBarElement.classList.add('navBarHidden')
        }
        if(scrollCoords.length > 5) scrollCoords.shift()
    }
}

const checkSavedTeams = () => {
    return Object.keys(store.state.createTeam.savedTeams).find((key: object) => store.state.createTeam.savedTeams[key].uuid === store.state.createTeam.currentTeamObject.uuid) ? true : false
}

onMounted(()=>{
    //scrollHide()
})

onUpdated(()=>{
    console.log(route.params)
})
</script>

<style>
.navbar-container{
    max-width:1120px;
    z-index:10;
    height: 3.5rem;
    background-color: rgba(255,255,255,0.2);
    transition: transform 0.2s cubic-bezier(.18,.81,.77,.94);
    transform-origin: top;
    transform: translateY(0%);
}
.navBarHidden{
    transform:translateY(-100%);
}
</style>

<style scoped>
.conrtainer{
}
</style>