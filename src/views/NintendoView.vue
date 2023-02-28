<template>
    <h1>Top Nintendo Games Rated!</h1>
    <GamesComponent :platform="this.platform"></GamesComponent>
</template>
<script>
import GamesComponent from '@/components/GamesComponent.vue';

export default {
    name: "NintendoGames",
    data(){
        return {
            platform: "https://cdn-icons-png.flaticon.com/512/871/871510.png"
        }
    },
    components: { GamesComponent }
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