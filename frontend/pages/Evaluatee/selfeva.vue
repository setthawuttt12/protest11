<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 1" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-2 mt-2">
                        <p >ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p >รอบการประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12" >
                            <h1 class="text-h5 font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                        
                        <v-card class="pa-2">
                            <v-row v-for="(indicate, i) in topic.indicates" :key="indicate.id_indicate">
                                <v-col cols="12">
                                {{ t+1 }}.{{ i+1 }} {{ indicate.name_indicate }} รายละเอียดตัวชี้วัด : {{ indicate.detail_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} คะแนนรวม : {{ indicate.point_indicate*4 }}
                                <v-textarea rows="2" v-model="indicate.detail_eva" label="คำอธิบายเพิ่มเติม(ถ้ามี)" ></v-textarea>
                                <v-file-input  @change="onFileChange($event,topic.id_topic,indicate.id_indicate)" label="*** รองรับเฉพาะนามสกุลไฟล์ .png .jpg .pdf *** " accept=".png,.jpg,.pdf"></v-file-input>
                                <v-select v-if="indicate.check_indicate === 'y'" v-model="indicate.score" label="ใส่คะแนนประเมิน 1-4" :items="[1,2,3,4]" ></v-select>
                                <v-text-filed v-else v-model="indicate.score" label="ใส่คะแนนประเมิน 1-4" @input="indicate.score > 4 ? indicate.score = 4 :null" type="number" min="0"></v-text-filed>
                                </v-col>
                            </v-row>
                        </v-card>
                        </v-col>
                    </v-row>
                    <div class="text-center mt-4">
                        <v-btn color="blue" type="submit">บันทึกคะแนน</v-btn>
                    </div>
                </v-form>
                <v-alert color="success" v-else-if="user.status_eva === 2 || user.status_eva ===3">ประเมินสำเร็จ</v-alert>
                <v-alert color="error" v-else>ยังไม่มีแบบประเมิน</v-alert>
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
  
const fileMap = ref<Record<string,File>>({})
const onFileChange = (event:Event,id_topic:number,id_indicate:number)=>{
    const file = (event.target as HTMLInputElement)?.files?.[0]
    if(!file)return
    fileMap.value[`${id_topic}-${id_indicate}`] =file
}



onMounted(async()=>{
    await Promise.all([fecth(),fecthTopics()])
})

const saveScore = async()=>{
const token = localStorage.getItem('token')
const formData = new FormData()
const allScore = topics.value.flatMap((t:any)=>
        t.indicates.map((i)=>{
            const key = `${t.id_topic}-${i.id_indicate}`
            const file = fileMap.value[key] 
            if(file) formData.append(`file_${key}`,file)
            return{
            id_topic:t.id_topic,
            id_indicate:i.id_indicate,
            score:i.score,
            detail_eva:i.detail_eva,
            file_key:file ? `file_${key}` :null
            }
        })
    )
    if(allScore.some((s:any)=> !s.score)) {
        alert('กรุณากรอกคะแนนให้สมบูรณ์')
        return
    }
    formData.append('score',JSON.stringify(allScore))
    try {
        await axios.post(`${eva}/selfeva/save`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('ประเมินสำเร็จ')
        await Promise.all([fecth(),fecthTopics()])
    } catch (error) {
        console.error('Error Post Score',error)
    }
}
</script>

<style scoped>

</style>