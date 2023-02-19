<template>
  <v-container>
    <h1>Top Rated Games!</h1>
    <v-card elevation="20">
      <v-carousel
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover="hover"
        v-if="this.loaded"
      >
        <v-carousel-item v-for="(topgame, i) in topGames" :key="i" class="container">
          <div class="container">
            <img class="game_image" :src="topgame.image"/>
            <div class="info">
              <h1>{{ topgame.game_name }}</h1>
              <div class="info-container">
                <h3 class="title">Genres: </h3>
                <p class="tags" v-for="(genre, i) in topgame.genres" :key="i">{{ genre }}</p>
              </div>
              <div class="info-container">
                <h3 class="title">Some tags about the game: </h3>
                <p class="tags" v-for="(tag, i) in topgame.tags" :key="i">{{ tag }}</p>
              </div>
              <div class="info-container">
                <h3 class="title">This game is available in: </h3>
                <img class="platform" v-for="(image, i) in topgame.platforms" :key="i" :src="image"/>
              </div>
              <div class="info-container">
                <h3 class="rating">Rating: </h3>
                <p class="rating">{{ topgame.rating }}</p>
              </div>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
      <div v-else>
        <h2>Loading..</h2>
      </div>
    </v-card>
  </v-container>
</template>

<script>

import axios from "axios"
/* import { api } from "@/helpers/helper" */
const api = "https://restapigames-production.up.railway.app/api/v1/"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "HomeView",
    created() {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve("ok");
            }, 300);
        });
        promise
            .then(this.getGames(this.topGames, "games/rating"));
    },
    data() {
        return {
            loaded: false,
            topGames: []
        };
    },
    methods: {
        async getGames(array, url) {
            let number = 0;
            const getData = async () => {
                await axios.get(`${api}${url}`)
                    .then(res => {
                    if (res == undefined) {
                        throw new Error("Error getting data from api");
                    }
                    console.log(res);
                    while (array.length < 16) {
                        array.push(res.data.data[number]);
                        number++;
                    }
                    this.loaded = true;
                });
            };
            getData();
        }
    }
}
</script>
<style>
.container{
  display: flex;
  flex-wrap: wrap;
}
.rating{
  padding: 5px;
  width: 5;
}
.info-container{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.platform{
  height: 40px;
  background-color: lightgray;
  padding: 2.5px;
  margin: 4px;
  border-radius: 7px;
}
.tags{
  padding: 2.5px;
  background-color: lightgray;
  margin: 4px;
  border-radius: 7px;
}
.tags:hover{
  background-color: gray;
}
.title{
  width: 100%;
  padding: 5px;
}
.info{
  padding: 20px;
  width: 50%;
}
.game_image{
  height: 500px;
  width: 50%;
}
</style>
