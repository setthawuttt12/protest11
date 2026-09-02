<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">สถานะการประเมินของผู้รับการประเมินผล</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="mt-3 table">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ผู้รับการประเมินผล</th>
                                    <th class="border text-center">รอบการประเมิน</th>
                                    <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                    <th class="border text-center">คะแนนที่ได้</th>
                                    <th class="border text-center">รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_eva">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname}} {{ items.lname }}</td>
                                    <td class="border text-center">รอบการประเมินที่:{{ items.round_sys}} ปี:{{ items.year_sys }}</td>
                                    <td class="border text-center">{{ items.day_eva}}</td>
                                    <td class="border text-center">{{ items.total_eva || '-' }} คะแนน</td>
                                    <td class="border text-center">
                                        <v-btn class="text-center text-white ma-2" size="small" color="info" @click="go(items.id_eva)">รายละเอียด</v-btn>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center text-red" colspan="10" v-if="result.length === 0">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';

const error = ref<Record<string,string>>({})
const result = ref([])
const eva = ref([])
const round = ref([])
const search =ref('')
const form = ref(
    {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
)
const reset = ()=>{
    form.value = {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
}
const emailRegex = /^[^\s]+@[^\s]+\.[\s]{2,}$/i
function validateForm(){
    error.value = {}
    const f =form.value

    if(!f.id_member)error.value.id_member = 'กรุณาเลือกผู้รับการประเมินผล'
    if(!f.id_sys)error.value.id_sys = 'กรุณาเลือกรอบการประเมิน'
    if(!f.day_eva)error.value.day_eva = 'กรุณากรอกวันที่ออกแบบการประเมิน'

    return Object.keys(error.value).length === 0
}

const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async()=>{
    if(!validateForm())return
    const f = form.value

    try {
        f.id_eva
        ? await axios.put(`${staff}/eva/update/${f.id_eva}`,f,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/eva/save`,f,{headers:{Authorization:`Bearer ${token}`}})
        await reset()
        await fetch()
        alert('ทำรายการสำเร็จ')

    } catch (error) {
        console.error("Error eva",error);
        
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        const res2 = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        eva.value = res2.data
        const res3 = await axios.get(`${staff}/system/show`,{headers:{Authorization:`Bearer ${token}`}})
        round.value = res3.data
    
    } catch (error) {
        console.error("Error Get eva",error)    
    }
}


const go = async(id_eva:number)=>{

    navigateTo({path:`/Staff/score_member-${id_eva}`})

}
onMounted(fetch)
</script>

<style scoped>

</style>