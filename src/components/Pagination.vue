<template>
    <div :class="PaginationClasses.container">
        <nav aria-label="Page navigation example">
            <ul class="pagination">

                <div v-if:="Number(route.params.page) > 1">
                    <router-link v-on:click="first" :to="{name:'CreatePickBoard', params:{team:currentTeam.name, page:(Number(route.params.page)-Number(route.params.page)+1)}}">
                        <li :class="PaginationClasses.li"><a :class="PaginationClasses.a" class="rounded-start" href="#">First</a></li>
                    </router-link>
                </div>
                <div v-else:="">
                    <button :class="PaginationClasses.btn" class="rounded-start" disabled><ins>First</ins></button>
                </div>

                <div v-if:="Number(route.params.page) > 10">
                    <router-link v-on:click="backward10" :to="{name:'CreatePickBoard', params:{team:currentTeam.name, page:Number(route.params.page) - 10}}">
                        <li :class="PaginationClasses.li"><a :class="PaginationClasses.a" href="#">Back10</a></li>
                    </router-link>  
                </div>
                <div v-else:="">
                    <button :class="PaginationClasses.btn" disabled><ins>Back10</ins></button>
                </div>

                <div v-if:="Number(route.params.page) > 1">
                    <router-link v-on:click="previous" :to="{name:'CreatePickBoard', params:{team:currentTeam.name, page:Number(route.params.page) - 1}}">
                        <li :class="PaginationClasses.li"><a :class="PaginationClasses.a" href="#">Previous</a></li>
                    </router-link>
                </div>
                <div v-else:="">
                    <button :class="PaginationClasses.btn" disabled><ins>Previous</ins></button>    
                </div>

                <li :class="PaginationClasses.li"><a :class="PaginationClasses.a" href="#"><ins>{{route.params.page}}</ins></a></li>

                <div v-if:="Number(route.params.page) < returnPageNumber()">
                    <router-link v-on:click="next" :to="{name:'CreatePickBoard', params:{team:currentTeam.name, page:Number(route.params.page) + 1}}">
                        <li :class="PaginationClasses.li"><a :class="PaginationClasses.a" href="#">Next</a></li>
                    </router-link>
                </div>
                <div v-else:="">
                    <button :class="PaginationClasses.btn" disabled><ins>Next</ins></button>    
                </div>

                <div v-if:="Number(route.params.page) < returnPageNumber() - 10">
                    <router-link v-on:click="forward10" :to="{name:'CreatePickBoard', params:{team:currentTeam.name, page:Number(route.params.page) + 10}}">
                        <li :class="PaginationClasses.li"><a :class="PaginationClasses.a" href="#">Forward10</a></li>
                    </router-link>
                </div>
                <div v-else:="">
                    <button :class="PaginationClasses.btn" disabled><ins>Forward10</ins></button>    
                </div>

                <div v-if:="Number(route.params.page) < returnPageNumber()">
                    <router-link v-on:click="last" :to="{name:'CreatePickBoard', params:{team:currentTeam.name, page:returnPageNumber()}}">
                        <li :class="PaginationClasses.li"><a :class="PaginationClasses.a" class="rounded-end" href="#">Last</a></li>
                    </router-link>
                </div>
                <div v-else:="">
                    <button :class="PaginationClasses.btn" class="rounded-end" disabled><ins>Last</ins></button>    
                </div>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const currentTeam = reactive(store.state.createTeam.currentTeamObject)

const PaginationClasses = {
    container: "pagination-container position-sticky bottom-0 w-25 rounded-top d-flex justify-content-center",
    btn: "btn btn-light text-primary rounded-0 border",
    li: "page-item rounded-0",
    a: "page-link rounded-0"
}

const Pagination = {
    selectedPage: ref<number>(1)
}

const returnPageNumber = () => Math.floor(Number(store.state.createTeam.pokemonList.count) / store.state.createTeam.maxElementsToShow)

const first = () => Pagination.selectedPage.value = Number(route.params.page)-Number(route.params.page)+1
const backward10 = () => Pagination.selectedPage.value = Number(route.params.page) - 10
const previous = () => Pagination.selectedPage.value = Number(route.params.page) - 1
const next = () => Pagination.selectedPage.value = Number(route.params.page) + 1
const forward10 = () => Pagination.selectedPage.value = Number(route.params.page) + 10
const last = () => Pagination.selectedPage.value = returnPageNumber()   

watch(Pagination.selectedPage, ()=>{
    store.commit('setCurrentPage', Pagination.selectedPage.value)
    pagination()
})

const emit = defineEmits(['emitqueryrange'])

const pagination = () => {
    const limit = store.state.createTeam.maxElementsToShow
    const offset = (Pagination.selectedPage.value * store.state.createTeam.maxElementsToShow) - store.state.createTeam.maxElementsToShow
    emit('emitqueryrange', [limit, offset])
}

onMounted(()=>{
    Pagination.selectedPage.value = route.params.page
})
</script>

<style>
.pagination-container{
    z-index:2;
}
</style>