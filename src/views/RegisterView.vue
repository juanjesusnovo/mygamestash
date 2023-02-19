<template>
    <v-sheet width="300" class="mx-auto">
        <v-form validate-on="submit" @submit.prevent="submit">
            <v-text-field
                v-model="name"
                label="Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="userName"
                label="User Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-text-field
                v-model="checkPassword"
                label="Repeat Password"
                type="password"
                required
            ></v-text-field>
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
            <v-btn @click="goLogin" block class="mt-2">Have Account? Login Here!</v-btn>
        </v-form>
    </v-sheet>
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