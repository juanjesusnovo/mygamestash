<template>
    <h1>Games!</h1>
    <div class="buttons">
        <button class="buttonPrev" @click="previousPage"><span> Previous  </span></button>
        <div class="caja">
            <select name="" id="" @change="filter($event)">
            <option :value="genre" v-for="(genre, i) in genres" :key="i">
                {{ genre }}
            </option>
        </select>
        </div>
        <button class="buttonNext" @click="nextPage"><span> Next </span></button>
    </div>
    <div class="container" v-if="loaded">
        <v-card v-for="(game, i) in allGames" :key="i"
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
        </v-card>
    </div>
    <div class="container" v-else>
        Loading
    </div>  
</template>
<script>
    import { getGames } from "@/helpers/helper.js"

    export default {
        name: "FilteredGames",
        created(){
            this.loaded = getGames(this.allGames, `games?genres=${this.genreSelected}`, this.number)
        },
        data() {
            return {
                loaded: false,
                allGames: [],
                genreSelected: "Action",
                genres: ["Action", "Adventure", "RPG", "Shooter", "Puzzle", "Indie", "Platformer", "Massively Multiplayer", "Sports","Racing", "Simulation", "Arcade", "Fighting", "Casual", "Strategy"],
                number: 0
            }
        },
        methods: {
            nextPage(){
                if(this.number+32 > 500){ return }
                this.number += 32
                this.loaded = false
                this.allGames = []
                if(getGames(this.allGames, `games?genres=${this.genreSelected}`, this.number)){
                    this.loaded=true
                }
            },
            previousPage(){
                if(this.number-32 < 0){ return }
                this.number -= 32
                this.allGames = []
                this.loaded = false
                if(getGames(this.allGames, `games?genres=${this.genreSelected}`, this.number)){
                    this.loaded=true
                }
            },
            filter(genre){
                console.log(genre);
                this.genreSelected = genre.target.value
                this.number=0 
                this.allGames = []
                if(getGames(this.allGames, `games?genres=${this.genreSelected}`, this.number)){
                    this.loaded=true
                }
            }
        }
        }
</script>
<style>
    select{
        text-align: center;
        width: 500px;
    }
    .caja {
        margin:20px auto;        
        height:30px;
        overflow: hidden;
        position:relative;
        box-shadow: 2px 2px 10px;
        text-align: center;
        width: 500px;
    }
    .caja::after{
        content:"\025be";
        display:table-cell;
        text-align:center;
        padding-top:7px;
        width:30px;
        height:30px;
        background-color:#d9d9d9;
        position:absolute;
        top:0;
        right:0px;
        pointer-events: none;
    }
    .caja:hover{
        background-color: #D3D3D3;
    }
    select:hover{
        background-color: #D3D3D3;
    }
    .buttons{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
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
        content: '\2039';  /* Entidades CSS. Para usar entidades HTML, use &#8594;*/
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
        content: '\203A';  /* Entidades CSS. Para usar entidades HTML, use &#8594;*/
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
</style>