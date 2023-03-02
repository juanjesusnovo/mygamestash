<template>
    <div class="container">
        <h1>Register Here!</h1>
        <div class="form">
            <v-sheet class="sheet">
                <v-form validate-on="submit" @submit.prevent="submit" class="allInputs">
                    <v-text-field
                        class="input"
                        v-model="name"
                        label="Name"
                        required
                    ></v-text-field>
                    <v-text-field
                        class="input"
                        v-model="userName"
                        label="User Name"
                        required
                    ></v-text-field>
                    <v-text-field
                        class="input"
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                    ></v-text-field>
                    <v-text-field
                        class="input"
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                    <v-text-field
                        class="input"
                        v-model="checkPassword"
                        label="Repeat Password"
                        type="password"
                        required
                    ></v-text-field>
                    <v-btn type="submit" block class="mt-2">Submit</v-btn>
                    <v-btn @click="goLogin" block class="mt-2">Have Account? Login Here!</v-btn>
                </v-form>
            </v-sheet>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

    export default{
        data(){
            return{
                name: "",
                userName: "",
                password: "",
                email: "",
                checkPassword:"",
                timeout: null,
            }
        },
        methods: {
            async submit () {
                if(this.name === "" || this.userName === "" || this.password === "" || this.email === "" || this.checkPassword === ""){
                    alert("Tienes que rellenar todos los campos")
                }
                const checkApi =  async () => {
                    await axios.post(`https://restapigames-production.up.railway.app/api/v1/users`,{
                        userName: this.userName,
                        name: this.name,
                        password: this.password,
                        email: this.email
                    })
                    .then(res =>{
                        console.log(res);
                        this.goLogin()
                    })
                }
                if(this.password != this.checkPassword){
                    alert("Valores mal introducidos")
                }
                if(this.name != "" && this.userName != "" && this.password != "" && this.email != "" && this.checkPassword != "" && this.password===this.checkPassword){
                    checkApi()
                }
            },
            goLogin(){
                this.$router.push("/Login")
            }
        }
    }
</script>
<style>
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
        box-shadow: 2px 2px 10px;
        width: 80%;
        display: flex;
        border-radius: 10px;
        padding: 20px;
    }
    .sheet{
        width: 100%;
    }
    .input{
        width: 40%;
        padding: 15px;
    }
    .allInputs{
        display: flex;
        flex-wrap: wrap;
    }
</style>