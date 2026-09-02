<template> 
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3" >
                    <h1 class="text-h5 font-weight-bold">ผลการประเมินของกรรมการประเมิน</h1>
                    <v-card class="pa-2 mt-2">
                        <p >ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p >รอบการประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12" >
                            <h1 class="text-h5 font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                    <tr>
                                        <th class="bg-grey border pa-1" style="width: 10%;">ตัวชี้วัด</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">น้ำหนักคะแนน</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">คะแนนเต็ม</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">คะแนนที่ได้</th>
                                    </tr>
                                <tr v-for="(indicate) in topic.indicates" :key="indicate.id_indicate">
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ (((scores[indicate.id_indicate]?.a ?? 0)+(scores[indicate.id_indicate]?.b ?? 0)+(scores[indicate.id_indicate]?.c ?? 0))/3).toFixed(2) }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="text-center mt-4">
                        <v-card color="success" class="pa-2 text-end">คะแนนรวม : {{ ((user.total_commit)/3).toFixed(2) }} คะแนน</v-card>
                    </div>
                    <div class="mt-4">
                        <v-card class="pa-2">
                            <label for="">ข้อเสนอแนะของกรรมการ</label>
                            <v-row>
                                <v-col cols="12" v-for="(commit,c) in commits" :key="commit.id_commit">
                                    <img :src="`http://localhost:3001/uploads/signature/${commit.signature}`" :alt="`รอ${commit.level_commit}ประเมิน`"width="20%"> <br>
                                    ( {{ commit.fname }}  {{ user.lname }})
                                    {{ commit.level_commit }}
                                </v-col>
                            </v-row>
                        </v-card>
                        <div class="text-center-mt-4">
                            <v-btn color="warning" class="no-p" @click="printDoc">พิมพ์</v-btn>
                        </div>
                    </div>
                </v-form>
                <v-alert color="info" v-else-if="user.status_eva === 2">รอกรรมการประเมิน</v-alert>
                <v-alert color="success" v-else-if="user.status_eva === 1">ยังไมได่้ประเมิน</v-alert>
                <v-alert color="error" v-else>ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva } from '~/API/base';

const user = ref<any>({})
const topics =ref<any>([])
const scores =ref<any>([])
const commits =ref<any>([])

const printDoc = ()=>{
    window.print()
}

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

const fecthScore = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/score_commit/score`,{headers:{Authorization:`Bearer ${token}`}})
        scores.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}

const fecthCommit = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/score_commit/commit`,{headers:{Authorization:`Bearer ${token}`}})
        commits.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}

onMounted(async()=>{
    await Promise.all([fecth(),fecthTopics(),fecthCommit(),fecthScore()])
})

</script>

<style scoped>

</style>