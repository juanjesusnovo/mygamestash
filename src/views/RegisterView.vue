<template>
    <div class="container">
        <h1>Register Here!</h1>
        <div class="form">
            <v-sheet class="sheet">
                <v-form validate-on="submit" @submit.prevent="checkForm" class="allInputs">
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
                    <p v-if="!validUser" class="error">El nombre de usuario debe ser de 4 a 24 caracteres y empezar por una letra</p>
                    <v-text-field
                        class="input"
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                    ></v-text-field>
                    <p v-if="!validEmail" class="error">El correo debe ser un correo válido</p>
                    <v-text-field
                        class="input"
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                    <p v-if="!validPass" class="error">La contraseña debe ser de 8 a 24 caracteres y debe incluir mayúsculas y minúsculas, un número y un caracter especial, (caracteres especiales permitidos [!,@,#,$,%])</p>
                    <v-text-field
                        class="input"
                        v-model="checkPassword"
                        label="Repeat Password"
                        type="password"
                        required
                    ></v-text-field>
                    <p v-if="!validPass" class="error">La contraseña debe ser de 8 a 24 caracteres y debe incluir mayúsculas y minúsculas, un número y un caracter especial, (caracteres especiales permitidos [!,@,#,$,%])</p>
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
                validUser: true,
                validPass: true,
                validEmail: true
            }
        },
        methods: {
            async submit () {
                if(this.name === "" || this.userName === "" || this.password === "" || this.email === "" || this.checkPassword === ""){
                    alert("Tienes que rellenar todos los campos")
                }
                const checkApi =  async () => {
                    await axios.post(`https://restapigames-production-9b22.up.railway.app/api/v1/users`,{
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
            },
            checkForm(){
                const userGood = /^[A-z][A-z0-9-_]{3,23}$/
                const passwordGood = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
                const emailGood = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

                this.validUser = userGood.test(this.userName)
                this.validPass = passwordGood.test(this.password)
                this.validEmail = emailGood.test(this.email)

                if(this.validUser && this.validPass && this.validEmail){
                    this.submit()
                }
            }
        }
    }
</script>
<style scoped>
    .container{
        min-height: 100vh;
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
        width: 70%;
        display: flex;
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .sheet{
        width: 100%;
    }
    .input{
        width: 100%;
        padding: 15px;
    }
    .allInputs{
        display: flex;
        flex-wrap: wrap;
    }
    .error{
        width: 100%;
        margin: 20px;
    }
</style>