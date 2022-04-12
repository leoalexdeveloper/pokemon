<template>
    <div :class="NavBarClass.container">
        <div>
        <nav :class="NavBarClass.nav">
            <ul :class="NavBarClass.ul">
            
                <router-link to="/">
                    <li :class="NavBarClass.li">Teams</li>
                </router-link>

                <router-link :to="{name:'CreatePickBoard', params:{team:store.state.createTeam.currentTeamObject.name, page:store.state.createTeam.currentPage}}">
                    <li :class="NavBarClass.li">Create Team</li>
                </router-link>
                
            </ul>
        </nav>
    </div>
    </div>
</template>

<script lang="ts" setup>
import LocalStorage from '@/classes/LocalStorage.ts'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { ref, onMounted, onUpdated, watch } from 'vue'

const store = useStore()
const route = useRoute()

const NavBarClass = {
    container:"navbar-container w-100 position-sticky top-0 start-0",
    nav:"nav-bar w-100",
    ul: "list-unstyled d-flex justify-content-center",
    li:"m-2"
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

onMounted(()=>{
    //scrollHide()
})
</script>

<style>
.navbar-container{
    z-index:10;
    height: 2.5rem;
    background-color: rgba(255,255,255,0.9);
    transition: transform 0.2s cubic-bezier(.18,.81,.77,.94);
    transform-origin: top;
    transform: translateY(0%);
}
.navBarHidden{
    transform:translateY(-100%);
}
</style>