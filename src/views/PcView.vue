<template>
    <h1>Top Pc Games!</h1>
    <GamesComponent :platform="this.platform"></GamesComponent>
</template>
<script>
import GamesComponent from '@/components/GamesComponent.vue';

export default {
    name: "PcGames",
    data(){
        return {
            platform: "https://cdn-icons-png.flaticon.com/512/732/732076.png"
        }
    },
    components: { GamesComponent }
    }
</script>
<style scoped>
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