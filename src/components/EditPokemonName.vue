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
        <form :class="FormClass.form" v-on:keypress.enter.prevent.stop="">
        <div class="w-100">
            <button v-on:click.prevent.stop="closeChangeTeamNameBox" :class="[FormClass.closeBtn]">&#x2716;</button>
        </div>
            <label :class="FormClass.label" for="">Change name</label>
            <input v-model="FormData.teamName.value" 
                   :placeholder="store.state.createTeam.currentTeamObject.name" 
                   :class="FormClass.inputText" 
                   type="text" 
                   placeholder="Insert a team name"
                   autofocus>
            
            <router-link v-on:click.prevent.stop="changeTeamName"      
                        :to="{name:'EditPickBoard', params:{team:FormData.teamName.value, page:1}}">
                <input :class="FormClass.inputSubmit" type="submit" value="Change name">
            </router-link>    
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route  = useRoute()
const store = useStore()

const emit = defineEmits(['changeTeamName', 'closeChangeTeamNameBox'])

const FormClass = {
    container:"container w-100 mt-3",
    form:"form col-6 m-auto border p-4 d-flex flex-column rounded",
    closeBtn: "close-btn col-1 float-end btn border-2 border-dark px-0 py-0",
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

const changeTeamName = () => {
    if(validate()){
        const currentTeamObject = store.state.createTeam.currentTeamObject
        currentTeamObject['name'] = FormData.teamName.value
        store.commit('setCurrentTeamObject', currentTeamObject)
        emit('changeTeamName', true)
        return 
    }
    throwError()
}

const closeChangeTeamNameBox = () => {
    emit('closeChangeTeamNameBox', true)
}

onMounted(()=>{
    const editInputName = document.querySelector('[type="text"]')as HTMLInputElement 
    editInputName.focus()
    store.commit('setCurrentPage', 1)
})
</script>

<style scoped>
.container{
width: 600px;
height: 30%;
}
.form{
background-color: rgba(255,255,255,0.95);
}
.close-btn{
    filter: invert(.7)
}
</style>