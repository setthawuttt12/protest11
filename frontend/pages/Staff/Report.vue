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
                                    <th class="border text-center">รายงานผล</th>
                                    <th class="border text-center">รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border text-center">1</td>
                                    <td class="border text-center">รายงานผล</td>
                                    <td class="border text-center">
                                        <center>
                                            <nuxt-link to="/Staff/Re_eva"><v-btn class="text-center text-white ma-2" size="small" color="info">รายละเอียด</v-btn></nuxt-link>
                                        </center>
                                    </td>
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


</script>

<style scoped>

</style>