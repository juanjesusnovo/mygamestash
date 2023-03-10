<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
    <v-navigation-drawer v-model="sidebar" app>
        <v-list>
            <v-list-tile
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path">
                <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
        <span class="hidden-sm-and-up">
            <v-toolbar-side-icon @click="sidebar = !sidebar">
            </v-toolbar-side-icon>
        </span>
    <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
            <img src="@/assets/pngwing.com.png" alt="logoMyGameStash" class="logo">
        </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn
                flat
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path">
                {{ item.title }}
            </v-btn>
            <v-btn
                flat
                v-if="!$store.state.isLoged"
                @click="goLogin">
                Login
            </v-btn>
            <v-toolbar-items v-else class="logout">
                <v-btn
                flat
                @click="goMyGames"
                >My Games</v-btn>
                <v-btn 
                flat
                @click="saveMyGames"
                >Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>
import axios from 'axios';


export default {
    name: "NavBar",
    created() {

    },
    data(){
    return {
        appTitle: 'MyGameStash',    
        sidebar: false,
        menuItems: [
            { title: 'Pc Games', path: '/PcGames'},
            { title: 'Nintendo Games', path: '/NintendoGames'},
            { title: 'PlayStation Games', path: '/PlayGames'},
            { title: 'Xbox Games', path: '/XboxGames'},
            { title: 'Filter Games', path: '/FilteredGames'},
        ]
    }
    },
    methods:{
        goLogin(){
            this.$router.push("/Login")
            console.log(this.$store.state.currentUser)
        },
        goMyGames(){
            this.$router.push("/MyGames")
        },
        saveMyGames(){
            const updateStash = { stash: this.$store.state.currentStash }
            const checkApi = async () => {
                await axios.patch(`https://restapigames-production-9b22.up.railway.app/api/v1/users/${this.$store.state.currentId}`, updateStash)
                    .then(res => console.log(res))
            }
            checkApi()
            this.$router.push("/Login")
            this.$store.commit("setLoged", false)
            this.$store.commit("setLogout")
        }
    }
};
</script>
<style>
    .logo{
        width: 50px;
    }
    .logout{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logout span{
        width: 100%;
    }
</style>