<!-- eslint-disable vue/multi-word-component-names -->
<template>
        <v-footer class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
        <div class="pt-0">
            Esta página ha sido creada por Juan Jesus Novo usando lo siguiente: Vuetify, Axios, JavaScript, CSS, la ApiRest diseñada por Juan Jesús Novo, a la cual podrá acceder a través del siguiente enlace <a href="">link a la api</a>, muchas gracias por su tiempo.
        </div>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>I tried</strong>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script>
    export default{
        name: "NavFooter",
        data(){
            return{
                icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ]
        }
        }
    }
</script>