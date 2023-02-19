<template>
    <v-sheet width="300" class="mx-auto">
        <v-form validate-on="submit" @submit.prevent="submit">
            <v-text-field
                v-model="userName"
                label="User name"
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                type="password"
            ></v-text-field>
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
            <v-btn @click="goRegister" block class="mt-2">Don't Have Account? Register Here!</v-btn>
        </v-form>
    </v-sheet>
</template>
<script>
import axios from 'axios';
import { setLoged } from '@/loged/state';

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
                            setLoged()
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