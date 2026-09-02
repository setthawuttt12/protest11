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
                            <v-table class="table">
                                    <tr>
                                        <th class="bg-grey border pa-1" style="width: 10%;">ตัวชี้วัด</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">น้ำหนักคะแนน</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">คะแนนเต็ม</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">รายละเอียด</th>
                                        <th class="bg-grey border pa-1" style="width: 10%;">คะแนนที่ได้</th>
                                    </tr>
                                <tr v-for="(indicate, i) in topic.indicates" :key="indicate.id_indicate">
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                        <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                        <td class="border pa-1 text-center" style="width: 10%;"></td>
                                        <td class="border pa-1 text-center" style="width: 10%;"></td>
                                        <td class="border pa-1 text-center" style="width: 10%;"></td>
                                    
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="text-center mt-4">
                        <v-btn color="blue" type="submit">บันทึกคะแนน</v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva } from '~/API/base';

const user = ref<any>({})

</script>

<style scoped>

</style>