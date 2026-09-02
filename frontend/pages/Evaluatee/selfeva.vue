<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 1" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-2">
                        <p >ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p >รอบการประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row>
                        <v-col cols="12" v-for="(topic,t) in topics" :key="topic.id_topic">
                            {{ t+1 }}.{{ topic.name_topic }}
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { eva } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])

const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fecthTopics = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
  

onMounted(async()=>{
    await Promise.all([fecth(),fecthTopics()])
})

const saveScore = async()=>{

}
</script>

<style scoped>

</style>