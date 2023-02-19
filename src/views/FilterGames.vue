<template>
    <h1>Games!</h1>
    <div class="buttons">
        <v-btn @click="previousPage">Previous</v-btn>
        <select name="" id="" @change="filter($event)">
            <option :value="genre" v-for="(genre, i) in genres" :key="i">
                {{ genre }}
            </option>
        </select>
        <v-btn @click="nextPage">Next</v-btn>
    </div>
    <div class="container">
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
    <div class="buttons">
        <v-btn @click="previousPage">Previous</v-btn>
        <v-btn @click="nextPage">Next</v-btn>
    </div>
</template>
<script>
    import axios from 'axios';
    const api = "https://restapigames-production.up.railway.app/api/v1"

    export default {
        name: "FilteredGames",
        created(){
            this.getGames(this.allGames, `games?genres=${this.genreSelected}`)
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
            async getGames(array, url) {
            let x = this.number
            const getData = async () => {
                await axios.get(`${api}${url}`)
                .then(res => {
                if(res == undefined){
                    throw new Error("Error getting data from api")
                }
                console.log(res);
                while(array.length < 52){
                    array.push(res.data.data[x])
                    x++
                }
                this.loaded = true
            })
            }
            getData()     
            },
            nextPage(){
                if(this.number+52 > 500){ return }
                this.number += 52
                this.allGames = []
                this.getGames(this.allGames, `games?genres=${this.genreSelected}`)
            },
            previousPage(){
                if(this.number-52 < 0){ return }
                this.number -= 52
                this.allGames = []
                this.getGames(this.allGames, `games?genres=${this.genreSelected}`)
            },
            filter(genre){
                console.log(genre);
                this.genreSelected = genre.target.value
                this.number=0 
                this.allGames = []
                this.getGames(this.allGames, `games?genres=${this.genreSelected}`)
            }
        }
        }
</script>
<style>
    select{
        box-shadow: 2px 2px 10px;
        text-align: center;
        width: 500px;
    }
    select:hover{
        background-color: #D3D3D3;
    }
    .buttons{
        display: flex;
        justify-content: space-around;
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