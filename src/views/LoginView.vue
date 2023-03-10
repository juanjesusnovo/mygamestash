<template>
    <div class="containerLogin">
        <h1 class="Login">Login here!</h1>
        <div class="formLogin">
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
                    <div class="buttonsLogin">
                        <v-btn type="submit" block class="button">Submit</v-btn>
                        <v-btn @click="goRegister" block class="button">Don't Have Account? Register Here!</v-btn>
                    </div>
                </v-form>
            </v-sheet>
            <div class="contenedor">
                <img src="@/assets/pngwing.com.png" class="imagenLogin">
                <div class="title">
                    <h2 class="nameLogin">My</h2>
                    <h2 class="nameLogin">Game</h2>
                    <h2 class="nameLogin">Stash</h2>
                </div>
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
                timeout: null
            }
        },
        methods: {
            async submit () {
                const checkApi =  async () => {
                    await axios.get(`https://restapigames-production-9b22.up.railway.app/api/v1/users?userName=${this.userName}`)
                    .then(res => {
                        if(res === undefined){ return }
                        if(res.data.data[0].userName === this.userName && res.data.data[0].password === this.password){
                            this.$store.commit("setUser", this.userName)
                            this.$store.commit("setStash", res.data.data[0].stash)
                            this.$store.commit("setLoged", true)
                            this.$store.commit("setId", res.data.data[0].id)
                            this.$router.push("/")
                        }
                    })
                }
                console.log(this.$store.state.isLoged)
                checkApi()
            },
            goRegister(){
                this.$router.push("/Register")
            }
        }
    }
</script>
<style scoped>
    @font-face {
        font-family: mario;
        src: url("@/assets/SuperMario256.ttf");
    }
    .containerLogin{
        min-height: 70vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .Login{
        width: 100%;
        text-align: center;
    }
    .formLogin{
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
    .buttonsLogin{
        width: 30%;
    }
    .button{
        margin: 20px;
    }
    .imagenLogin{
        width: 300px;
        padding: 20px;
    }
    .nameLogin{
        font-size: 40px;
        font-family: mario;
    }
    .contenedor{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
</style>