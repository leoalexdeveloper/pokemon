<template>
    <div :class="TeamBoardClasses.emptySlot">
        Slot{{index}}
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
    max-width: 120px;
    min-width: 120px;
    height:auto;
    min-height:150px;
    font-size: 2rem;
    color: #dedede;
}
</style>