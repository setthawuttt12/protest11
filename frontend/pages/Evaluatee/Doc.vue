<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">คู่มือการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="mt-3 table">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ชื่อเอกสาร</th>
                                    <th class="border text-center">วันที่เพิ่ม</th>
                                    <th class="border text-center">ไฟล์</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_doc">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.name_doc}}</td>
                                    <td class="border text-center">
                                        {{ items.day_doc }}
                                    </td>
                                    <td class="border text-center">
                                        <v-btn class="text-center text-white ma-2" size="small" color="info" @click="view(items.file)"  prepend-icon="mdi-eye">เปิดดู</v-btn>
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
import { api, staff, eva } from '~/API/base';

const error = ref<Record<string,string>>({})
const dataResult = ref([])
const file = ref<File | null>(null)
const search =ref('')
const name_doc = ref('')

const token = import.meta.client ? localStorage.getItem('token'):null



const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/docnoe`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
    
    } catch (error) {
        console.error("Error Get doc",error)    
    }
}

const result = ref([])

const view = (filename:string)=>{
    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
}



onMounted(fetch)
</script>

<style scoped>

</style>