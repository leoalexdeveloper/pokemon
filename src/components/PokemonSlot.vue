<template>
    <div :class="TeamBoardClasses.pickedPokemon">
        <h6 :class="TeamBoardClasses.title">
            {{utils.firstNameCaps(pokemonTeam.name)}}
        </h6>
        <object :class="TeamBoardClasses.img" :data="pokemonTeam.images.mainLink" type="image/png">
            <img :class="TeamBoardClasses.img" :src="pokemonTeam.images.secondaryLink" :alt="pokemonTeam.name">
        </object>
        <button v-on:click="removeFromSlot(index-1)" :class="TeamBoardClasses.removeBtn">Remove</button>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import utils from '../utils/utils'

const store = useStore()

const props =defineProps({
    pokemonTeam:{
        type:Object,
        required:true
    },
    index:{
        type:Number,
        required:true
    }
})

const TeamBoardClasses = {
    pickedPokemon: "container slot p-2 rounded d-flex flex-column justify-content-start align-items-center",
    title:"w-100 p-1 fs-6 rounded-top text-light lead bg-primary d-flex justify-content-center",
    img: "col-12 card-img img-thumbnail",
    removeBtn: "btn-remove btn btn-sm btn-danger col-12 mt-2 py-0 rounded-0 rounded-bottom"
}

const emit = defineEmits(['removeFromSlot'])
const removeFromSlot = (index: number) => {
    emit('removeFromSlot', index)
}

</script>

<style>
.card{
    max-width: 150px;
    min-width: 150px;
    max-height: 190px;
}
.card-img{
    
    max-height: 100px;
    height:auto;
    object-fit:contain;
    object-position: center;
}
.btn-remove{
    font-size: 1rem;
}
</style>