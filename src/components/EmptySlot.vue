<template>
    <div :class="TeamBoardClasses.emptySlot">
        <p>Slot{{index}}</p> 
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    index:{
        type:Number,
        required:true
    }
})

const TeamBoardClasses = {
    emptySlot: "slot col-2 d-flex flex-row justify-content-center align-items-center",
}
</script>

<style>
.slot{
    max-width: 150px;
    min-width: 150px;
    height:auto;
    min-height:180px;
    font-size: 2rem;
    color: #dedede;
}
</style>