<template>
    <h1>Top PlayStation Games Rated!</h1>
    <div class="buttons">
        <v-btn @click="previousPage">Previous</v-btn>
        <v-btn @click="nextPage">Next</v-btn>
    </div>
    <div class="container">
        <v-card v-for="(game, i) in playGames" :key="i"
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
        </v-card>
    </div>    
    <div class="buttons">
        <v-btn @click="previousPage">Previous</v-btn>
        <v-btn @click="nextPage">Next</v-btn>
    </div>
</template>
<script>
    import axios from 'axios';
    const api = "https://restapigames-production.up.railway.app/api/v1/"

    export default {
        name: "PlayStationGames",
        created(){
            this.getGames(this.playGames, "games?platforms=https://cdn-icons-png.flaticon.com/512/1/1443.png")
        },
        data() {
            return {
                loaded: false,
                playGames: [],
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
                this.playGames = []
                this.getGames(this.playGames, "games?platforms=https://cdn-icons-png.flaticon.com/512/1/1443.png")
            },
            previousPage(){
                if(this.number-52 < 0){ return }
                this.number -= 52
                this.playGames = []
                this.getGames(this.playGames, "games?platforms=https://cdn-icons-png.flaticon.com/512/1/1443.png")
            }
        }
        }
</script>
<style>
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
</style>