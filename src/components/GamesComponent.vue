<template>
    <div class="buttons">
        <button class="buttonPrev" @click="previousPage"><span> Previous  </span></button>
        <button class="buttonNext" @click="nextPage"><span> Next </span></button>
    </div>
    <div class="container">
        <v-card v-for="(game, i) in games" :key="i"
            class="cardGame"
        >
            <v-img
            class="align-end text-white"
            height="200"
            :src="game.image"
            cover
            >
                <v-card-title>{{ game.game_name }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
                Rating: {{ game.rating }}
            </v-card-subtitle>

            <v-card-text>
                <p v-for="(genre, i) in game.genres" :key="i">{{ genre }}</p>
            </v-card-text>
            <div class="info-container">
                <h3 class="title">This game is available in: </h3>
                <img class="platform" v-for="(image, i) in game.platforms" :key="i" :src="image"/>
            </div>
            <div v-if="$store.state.isLoged">
                <button v-if="$store.state.currentStash.includes(game.id)" class="buttonRemove" @click="favs(game.id)">Remove</button>
                <button v-else class="buttonAdd" @click="favs(game.id)">Add</button>
            </div>
        </v-card>
    </div>  
    <div class="buttons">
        <button class="buttonPrev" @click="previousPage"><span> Previous  </span></button>
        <button class="buttonNext" @click="nextPage"><span> Next </span></button>
    </div>
</template>
<script>
import { getGames } from '@/helpers/helper'


export default {
    name: "GamesComponent",
    props: {
        platform: { String }
    },
    created(){
        this.loaded = getGames(this.games, `games?platforms=${this.platform}`, this.number)
    },
    data(){
        return {
            loaded: false,
            games: [],
            number: 0
        }
    },
    methods: {
        nextPage(){
                if(this.number+32 > 500){ return }
                this.number += 32
                this.loaded = false
                this.games = []
                if(getGames(this.games, `games?platforms=${this.platform}`, this.number)){
                    this.loaded=true
                }
                window.scrollTo(0,0)
            },
        previousPage(){
            if(this.number-32 < 0){ return }
            this.number -= 32
            this.games = []
            this.loaded = false
            if(getGames(this.games, `games?platforms=${this.platform}`, this.number)){
                this.loaded=true
            }
            window.scrollTo(0,0)
        },
        favs(id){
            this.$store.commit("addGame", id)
        }
    }
}
</script>
<style>
    .buttons{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 15px;
    }
    .buttonPrev {
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 30px;
        border-radius: 4px;
        background-color: white;
        box-shadow: 2px 2px 10px;
        border: none;
        color: black;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 150px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
        }
    .buttonPrev span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }
    .buttonPrev span:after {
        content: '\2039';
        position: absolute;
        text-align: center;
        opacity: 0;
        top: 0;
        left: -125px;
        transition: 0.5s;
    }
    .buttonPrev:hover span {
        padding-left: 25px;
    }
    .buttonPrev:hover span:after {
        opacity: 1;
        right: 0;
    }
    .buttonNext {
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 30px;
        border-radius: 4px;
        background-color: white;
        box-shadow: 2px 2px 10px;
        border: none;
        color: black;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 150px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
        }
    .buttonNext span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }
    .buttonNext span:after {
        content: '\203A';  
        position: absolute;
        text-align: center;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }
    .buttonNext:hover span {
        padding-right: 25px;
    }
    .buttonNext:hover span:after {
        opacity: 1;
        right: 0;
    }
    h1{
        padding: 10px;
        text-align: center;
    }
    .container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .cardGame{
        width: 23.5%;
        margin: 10px;
        box-shadow: 2px 2px 10px;
        border: 1px solid #000;
    }
    .title{
        width: 100%;
        padding: 5px;
    }
    .platform{
        height: 40px;
        padding: 2.5px;
        margin: 4px;
        border-radius: 7px;
    }
    .container{
        min-height: 80vh;
    }
    .buttonRemove{
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 30px;
        border-radius: 4px;
        background-color: white;
        box-shadow: 2px 2px 10px;
        border: none;
        color: black;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 150px;
        cursor: pointer;
        margin: 5px;
    }
    .buttonAdd{
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 30px;
        border-radius: 4px;
        background-color: white;
        box-shadow: 2px 2px 10px;
        border: none;
        color: black;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 150px;
        cursor: pointer;
        margin: 5px;
    }
    .buttonRemove:hover{
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 30px;
        border-radius: 4px;
        background-color: rgb(184, 69, 69);
        box-shadow: 2px 2px 10px;
        border: none;
        color: black;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 150px;
        cursor: pointer;
        margin: 5px;
    }
    .buttonAdd:hover{
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 30px;
        border-radius: 4px;
        background-color: rgb(95, 187, 67);
        box-shadow: 2px 2px 10px;
        border: none;
        color: black;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 150px;
        cursor: pointer;
        margin: 5px;
    }
</style>