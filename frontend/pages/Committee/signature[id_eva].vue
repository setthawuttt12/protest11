<template>
    <v-container fluid class="py-10">
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">ยืนยันผลการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form v-if="!result.signature" @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field label="ไฟล์" v-model="file" accept=".png,.jpg" ></v-text-field>
                                    <p class="text-error font-weifht-bold">*** รองรับเฉพาะนามสกุลไฟล์ .png .jpg เท่านั้น</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                   <center>
                                        <v-btn class=" ma-2" type="submit" color="primary">บันทึก</v-btn>
                                        <v-btn class=" ma-2" type="reset" color="error">ยกเลิก</v-btn>
                                    </center>
                                    
                                </v-col>
                                <!-- <v-col cols="12" md="6">
                                   <center>
                                    
                                   </center>
                                     
                                        
                                   
                                    
                                </v-col> -->
                            </v-row>
                        </v-form>
                        <v-table v-else>
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ไฟล์</th>
                                    <th class="border text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td class="border text-center">{{ 1 }}</td>
                                    <td class="border text-center">{{ result.signature}}</td>
                                    <td class="border text-center">
                                        <v-btn class="text-center text-white ma-2" size="small" color="info" @click="view(result.signature)" prepend-icon="mdi-eye">เปิดดู</v-btn>
                                        <v-btn class="text-center text-white ma-2" size="small" color="error" @click="del(id_eva)">ลบ</v-btn>
                                        
                                    </td>
                                </tr>
                                <tr v-if="result.length === 0">
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
import { api, commit, staff } from '~/API/base';

const error = ref<Record<string,string>>({})
const dataResult = ref([])
const file = ref<File | null>(null)
const search =ref('')
const name_doc = ref('')
const id_eva = useRoute().params.id_eva

const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async () => {
    if(!file.value ) return alert('กรุณาแนบไฟล์ก่อนบันทึก')
    try{
        const formData = new FormData()
        formData.append('file',file.value)
        await axios.post(`${commit}/signature/${id_eva}`,formData,{headers: {Authorization: `Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        file.value = null
        await fetch()
    }catch(err){
        console.error('Error!',err)
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
    
    } catch (error) {
        console.error("Error Get doc",error)    
    }
}

const result = ref([])

const view = (filename:string)=>{
    const url = new URL(`/uploads/signature/${filename}`,commit).href
    window.open(url,'_blank')
}


const del = async(id_doc:number)=>{

    
    try {
        if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
        await axios.delete(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        alert('ลบสำเร็จ')
        await fetch()
    } catch (error) {
        console.error("Error delete",error);
        
    }


}
onMounted(fetch)
</script>

<style scoped>

</style>