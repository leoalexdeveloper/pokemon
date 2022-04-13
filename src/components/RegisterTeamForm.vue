<template>
    <div :class="FormClass.container">
        <div v-if:="FormData.hasError.value" 
            :class="[FormClass.alert,{'bg-danger':FormData.hasError.value, 'bg-success':FormData.hasError.value}]" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>
                {{FormData.errorMsg.value}}
            </div>
        </div>
        <form :class="FormClass.form" action="">
            <label :class="FormClass.label" for="">Create Team</label>
            <input v-model="FormData.teamName.value" :class="FormClass.inputText" type="text" placeholder="Insert a team name">   
            <router-link v-on:click.prevent.stop="storeCurrentTeamObject" :to="{name:'CreatePickBoard', params:{team:FormData.teamName.value, page:1}}">
                <input :class="FormClass.inputSubmit" type="submit" value="Register">
            </router-link>   
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import TeamEntity from '@/entities/Team.ts'

const route  = useRoute()
const store = useStore()

const FormClass = {
    container:"container mt-5",
    form:"form col-6 m-auto border p-4 d-flex flex-column rounded",
    label:"form-label",
    inputText:"form-control",
    inputSubmit:"form-submit col-12 btn btn-primary mt-3",
    alert:"col-6 alert d-flex align-items-center border text-light m-auto"
}

const FormData = {
    teamName: ref<string>(''),
    hasError: ref<boolean>(false),
    errorMsg: ref<string>('The name should\'t be empty or have this symbols: @, \", #')
}

const validate = () => {
    return (FormData.teamName.value.length === 0 || FormData.teamName.value.match(/#|"|@/)) ? false : true
}

const throwError = () => {
    return FormData.hasError.value = true
}

const storeCurrentTeamObject = () => {
    if(validate()){
        store.commit('setCurrentTeamObject', new TeamEntity(FormData.teamName.value))
        return
    }
    throwError()
}

onMounted(()=>{
    store.commit('setCurrentPage', 1)
})
</script>

<style scoped>
.form{
    background-color: rgba(255,255,255,0.8) !important;
}
</style>