<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">รายงานผล</h1>
                    </v-card-title>
                    <v-card-text>
                        
                        <v-table class="mt-3 table">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ชื่อ-สกุล</th>
                                    <th class="border text-center">อีเมล</th>
                                    <th class="border text-center">ชื่อผู้ใช้</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_member">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="border text-center">{{ items.email }}</td>
                                    <td class="border text-center">{{ items.username }}</td>

                                </tr>
                                <tr>
                                    <td class="text-center text-red" colspan="10" v-if="result.length === 0">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <center><v-btn class="text-center text-white no-p mt-3" prepend-icon="mdi-printer" @click="print()" color="warning">พิมพ์</v-btn></center>
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
const dataResult = ref([])
const show = ref(false)
const showPw = ref(false)
const typeR = ['ผู้รับการประเมินผล']
const search =ref('')
const form = ref(
    {
        id_member:'',
        fname:'',
        lname:'',
        email:'',
        username:'',
        password:'',
        role:''
    }
)
const reset = ()=>{
    form.value = {
        id_member:'',
        fname:'',
        lname:'',
        email:'',
        username:'',
        password:'',
        role:''
    }
}
const emailRegex = /^[^\s]+@[^\s]+\.[\s]{2,}$/i
function validateForm(){
    error.value = {}
    const f =form.value

    if(!f.fname.trim())error.value.fname = 'กรุณากรอกชื่อ'
    if(!f.lname.trim())error.value.lname = 'กรุณากรอกนามสกุล'
    if(!f.email.trim())error.value.email = 'กรุณากรอกอีเมล'
    else if(emailRegex.test(f.email.trim()))error.value.email = 'กรุณากรอกอีเมลให้ถูกต้อง'
    if(!f.username.trim())error.value.username = 'กรุณากรอกชื่อผู้ใช้'
    else if(f.username.trim().length < 4)error.value.username = 'ชื่อผู้ใช้ต้องยาวอย่างน้อย 4 ตัวอักษร'

    if(!f.password.trim())error.value.password = 'กรุณากรอกรหัสผ่าน'
    else if(f.password.trim().length < 6)error.value.password = 'รหัสผ่านต้องยาวอย่างน้อย 4 ตัวอักษร'

    if(!f.role.trim())error.value.role = 'กรุณาเลือกประเภทสมาชิก'

    return Object.keys(error.value).length === 0
}

const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async()=>{
    if(!validateForm())return
    const f = form.value
    const payload = {
        fname:f.fname,
        lname:f.lname,
        email:f.email,
        username:f.username,
        password:f.password,
        role:f.role,
        ...(f.password ? {password:f.password}:null)
    }

    try {
        f.id_member
        ? await axios.put(`${staff}/member/update/${f.id_member}`,payload,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/member/save`,{...payload,password:f.password},{headers:{Authorization:`Bearer ${token}`}})
        await reset()
        await fetch()
        alert('ทำรายการสำเร็จ')

    } catch (error) {
        console.error("Error member",error);
        
    }
}

const print = ()=>{
    window.print()
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
    
    } catch (error) {
        console.error("Error Get memberE",error)    
    }
}

const result = computed(()=>{
    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()

    return dataResult.value.filter((items:any)=>{
        return(
            items.fname.toLowerCase().includes(s) || 
            items.lname.toLowerCase().includes(s) || 
            items.username.toLowerCase().includes(s)
        )
    })
})

const edit = (items:any)=>{
    form.value = {...items}
}

const del = async(id_member:number)=>{

    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        await axios.delete(`${staff}/member/delete/${id_member}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()
    } catch (error) {
        console.error("Error delete",error);
        
    }


}
onMounted(fetch)
</script>

<style scoped>
@media print{
    .v-app-bar,.v-btn.no-p{
        margin: 0 !important;
        margin-top: 0 !important;
        display: none !important;
        padding: 0 !important;
        width: 100% !important;
    }

    td,th{
        color: black !important;
        border: 1px solid black !important;
    }

    h1,h2,h3{
        color: black !important;
    }

}
</style>