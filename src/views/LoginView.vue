<template>
    <div class="container">
        <h1>Login here!</h1>
        <div class="form">
            <v-sheet class="sheet">
                <v-form validate-on="submit" @submit.prevent="submit" class="allInputs">
                    <div class="center">
                        <v-text-field
                            class="input"  
                            v-model="userName"
                            label="User name"
                        ></v-text-field>
                        <v-text-field
                            class="input"
                            v-model="password"
                            label="Password"
                            type="password"
                        ></v-text-field>
                    </div>
                    <div class="buttons">
                        <v-btn type="submit" block class="button">Submit</v-btn>
                        <v-btn @click="goRegister" block class="button">Don't Have Account? Register Here!</v-btn>
                    </div>
                </v-form>
            </v-sheet>
            <img src="@/assets/pngwing.com.png" class="imagen">
            <div class="title">
                <h2>My</h2>
                <h2>Game</h2>
                <h2>Stash</h2>
            </div>
        </div>  
    </div>
</template>
<script>
import axios from 'axios';

    export default{
        data(){
            return{
                userName: "",
                password: "",
                timeout: null,
                loged: false,
            }
        },
        methods: {
            async submit () {
                const checkApi =  async () => {
                    await axios.get(`https://restapigames-production.up.railway.app/api/v1/users?userName=${this.userName}`)
                    .then(res => {
                        if(res === undefined){ return }
                        if(res.data.data[0].userName === this.userName && res.data.data[0].password === this.password){
                            this.loged = true
                        }
                    })
                }
                checkApi()
            },
            goRegister(){
                this.$router.push("/Register")
            }
        }
    }
</script>
<style>
    @font-face {
        font-family: mario;
        src: url("@/assets/SuperMario256.ttf");
    }
    .container{
        min-height: 70vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    h1{
        width: 100%;
        text-align: center;
    }
    .form{
        height: 50vh;
        box-shadow: 2px 2px 10px;
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        padding: 20px;
    }
    .sheet{
        width: 100%;
    }
    .input{
        width: 100%;    
    }
    .allInputs{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .center{
        width: 50%;
    }
    .buttons{
        width: 30%;
    }
    .button{
        margin: 20px;
    }
    .imagen{
        width: 300px;
        padding: 20px;
    }
    h2{
        font-size: 40px;
        font-family: mario;
    }
</style>