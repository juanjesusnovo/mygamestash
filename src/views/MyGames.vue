<template>
    <h1>My Games!</h1>
    <div>
        <div v-if="loaded" class="container">
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
        <div v-else>
            <h1>Loading...</h1>
        </div>
    </div> 
</template>

<script>
/* import { getMyGames } from '@/helpers/helper'; */
import axios from 'axios'

export default{
    name: "MyGames",
    created(){
        this.loaded = this.$store.state.currentStash.forEach(id => {
        const getData = async () => {
            await axios.get(`https://restapigames-production-9b22.up.railway.app/api/v1/games/${id}`)
            .then(res => {
            if(res == undefined){
                throw new Error("Error getting data from api")
            }
            console.log(res.data.data);
            this.games.push(res.data.data)
            this.loaded = true
        })
        }
        getData()     
        })
    },
    data(){
        return{
            loaded: false,
            games: []
        }
    },
    methods: {
        favs(id){
            this.$store.commit("addGame", id)
            location.reload()
        }
    }
}
</script>
<style scoped>
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