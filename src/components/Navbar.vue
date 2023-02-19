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
                v-if="loged"
                @click="logout">
                LogOut
            </v-btn>
            <v-btn 
                flat
                v-else
                @click="goLogin"
                v-for="item in finallyLoged"
                :key="item.title"
                :to="item.path"
            >
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>
import { loged, setLoged } from '@/loged/state';

export default {
    name: "NavBar",
    created() {

    },
    data(){
    return {
        appTitle: 'MyGameStash',    
        isLoged: loged,
        sidebar: false,
        menuItems: [
            { title: 'Pc Games', path: '/PcGames'},
            { title: 'Nintendo Games', path: '/NintendoGames'},
            { title: 'PlayStation Games', path: '/PlayGames'},
            { title: 'Xbox Games', path: '/XboxGames'},
            { title: 'Filter Games', path: '/FilteredGames'},
        ],
        finallyLoged: [
            /* { title: 'MyGames', path: '/MyGames'}, */
            { title: 'Login', path: '/Login'},
        ]
    }
    },
    methods:{
        goLogin(){
            this.$router.push("/Login")
            console.log(this.loged);
        },
        logout(){
            setLoged()
            this.$router.push("/Login")
            console.log(this.loged);
        }
    }
};
</script>
<style>
    .logo{
        width: 50px;
    }
</style>