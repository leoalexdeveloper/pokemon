<template>
    <section :class="CardClasses.container">
    <div class="flipper w-100">
        <article :class="CardClasses.front">
            <p :class="CardClasses.p">{{utils.firstNameCaps(pokemon.name)}}</p>
            <object :class="CardClasses.img" :data="pokemon.images.mainLink" type="image/png">
                <img :class="CardClasses.img" :src="pokemon.images.secondaryLink" :alt="`${pokemon.name} image`" :title="`${pokemon.name} image`">
            </object>  
            <div :class="CardClasses.btnContainer">
                <button v-if:="hiddenChooseBtn()" 
                        v-on:click="choosePokemon"  
                        :class="CardClasses.btnPrimary">Choose</button>                
                <button v-on:click="onDetailsClick"  
                        :class="CardClasses.btnSecondary">Details</button>
            </div>
        </article>
        <article :class="CardClasses.back"> 
            <button v-on:click="closeDetails" 
                    :class="CardClasses.backFlipButton">&#x21b2;</button>
            <div :class="CardClasses.detailContainer">
                <dl :class="CardClasses.detailContainerListLeft" style="line-height:0.5rem">
                    <dt :class="[CardClasses.detailsTitles, 'text-dark']">Types</dt>
                    <dd :class="[CardClasses.detailsInfos, 'text-dark']" style="width: auto; height:1rem; font-size:0.7rem" 
                        v-for:="types in (pokemonDetails[String(pokemon.id)]?.types as Array<PokemonDetailEntity['types']>)">{{(types.type.name)}}</dd>
                        <br>
                    <dt  :class="[CardClasses.detailsTitles, 'text-dark']" >Abilities</dt>
                    <dd :class="[CardClasses.detailsInfos, 'text-dark']" style="width: auto; height:1rem; font-size: 0.7rem" 
                        v-for:="abilities in (pokemonDetails[String(pokemon.id)]?.abilities as Array<PokemonDetailEntity['abilities']>)">
                        {{abilities.ability.name}}
                        
                    </dd>      
                </dl>
                <dl :class="CardClasses.detailContainerListRight" style="line-height:0.6rem">
                    <dt  :class="[CardClasses.detailsTitles, 'text-light']">Stats</dt>
                     <dd :class="[CardClasses.detailsInfos, 'text-light']" style="width: auto; height:1rem; font-size: 0.7rem" 
                       v-for:="stats in (pokemonDetails[String(pokemon.id)]?.stats as Array<PokemonDetailEntity['stats']>)">{{stats.stat.name}}: {{stats.base_stat}}
                    </dd>
                </dl>
            </div>
        </article>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import Api from '../classes/Api'
import PokemonDetailEntity from '../entities/PokemonDetail'
import PokemonEntity from '../entities/Pokemon'

import utils from '../utils/utils'

const store = useStore()

const CardClasses = {
    container: "card-container rounded overflow-hidden d-flex",
    img: "w-100 card-image img-thumbnail rounded-0 mb-3",
    p: "w-100 text-light fs-6 lead d-flex justify-content-center bg-primary rounded-top p-1",
    btnContainer: "card-btn-container w-100",
    btnPrimary: " w-100 btn btn-sm btn-primary p-0 rounded-0",
    btnSecondary: "w-100 btn btn-sm btn-secondary p-0 rounded-0 rounded-bottom",
    front: "card-front border rounded bg-light p-2 d-flex flex-column justify-content-between align-items-center",
    back: "card-back border rounded bg-light rounded p-0",
    detailContainer: "p-0 d-flex flex-row",
    detailContainerListLeft: "list-unstyled p-1 col-5 mt-4",
    detailsTitles: "h6",
    detailsInfos: "p-1",
    rightDetailsTitles: "",
    detailContainerListRight: "list-unstyled p-1 col-7 bg-primary pb-5",
    statsContainer: "p-0",
    backFlipButton: "btn btn-sm rounded-0 position-absolute top-0 start-0 mx-0 my-0 bg-light px-2 text-primary"
}

const props = defineProps({
    pokemon:{
        type: Object,
        required: true
    },
})

const TeamBoard = {
    hasPokemon: ref<boolean>(false)
}

const onDetailsClick = (e:any) => {
    const cardContainer = e.target.parentElement.parentElement.parentElement 
    cardContainer.classList.add("flip-in")    
    getPokemonDetail(cardContainer)
}

const closeDetails = (e:any) => {
    const cardContainer = e.target.parentElement.parentElement
    cardContainer.classList.remove('flip-in')
}

const pokemonDetails = reactive<PokemonDetailEntity>(store.state.createTeam.pokemonDetail)

const getPokemonDetail = (card: object) => {
    store.dispatch('getPokemonDetail', props.pokemon.id)
}

const choosePokemon = (e:any) => {
    const selectedPokemon = store.state.createTeam.pokemonList.results.find((pokemon: PokemonEntity) => pokemon.url.includes(`/${props.pokemon.id}`))
    if(store.state.createTeam.currentTeam.length < store.state.createTeam.maxSlotNumber){
        hiddenChooseBtn()
        store.commit('pushToCurrentTeam', {...selectedPokemon})
    }
}

const hiddenChooseBtn = () => {
    return (store.state.createTeam.currentTeam.length === store.state.createTeam.maxSlotNumber
    || store.state.createTeam.currentTeam.find((pokemon:PokemonEntity) => props.pokemon.name === pokemon.name))
    ? 
    false 
    : 
    true
}
</script>

<style scoped>
.card-container{
    position:relative;
    width:150px;
    height:200px;
    perspective: 2000px;
}
.card-sub{
    height: auto;
}
.card-image{
    width:90%;
    height:80px;
    object-fit: contain;
    object-position: center;
}
.card-front,
.card-back{
    width:100%;
    max-height:auto;
    position:absolute;
    top:0;
    left:0;
    backface-visibility:hidden;
}
.card-back{
    position:relative;
    transform:rotateY(180deg);
}
.flipper{
    transform-origin:center;
    transform-style:preserve-3d;
    transition: 0.5s transform cubic-bezier(.48,1.52,.8,1.03);
}

.flip-in{
    transform:rotateY(calc(180deg * 1));
}
</style>