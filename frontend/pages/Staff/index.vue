<template>
    <v-container>
        <v-sheet class="mt-3 pa-3" elevation="5" rounded="lg">
            <v-card class="pa-3" rounded="lg">
                <v-card-title><h1 class="text-h5 text-center">Dashboard-Staff</h1></v-card-title>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box" :key="b">
                        <h3 class="text-center">{{ b.title }}</h3>
                        <h3 class="text-center">{{ b.value }}</h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box2" :key="b">
                        <h3 class="text-center">{{ b.title }}</h3>
                        <h3 class="text-center">{{ b.value }}</h3>
                    </v-col>
                </v-row>
            </v-card>
        </v-sheet>
    </v-container>
    
</template>

<script setup lang="ts">
import { api } from '~/API/base';
import axios from 'axios'
const token = import.meta.client ? localStorage.getItem('token'):null
const box = ref([])
const box2 = ref([])
const fetch = async()=>{
    try {

        const res = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        box2.value = res.data.box2
        
    } catch (error) {
        console.error("error box",error)
    }
}

onMounted(fetch)

</script>

<style scoped>

</style>