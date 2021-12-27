<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useGlobal } from '@/stores/global';
import PrepaidDataService from '@/services/PrepaidDataService'
import Checkbox from '@/components/forms/Checkbox.vue';
import PriceCard from '@/components/PriceCard.vue';
import { VoucherPrice } from '@/types/Global';

const globalStore = useGlobal()
const response = ref<VoucherPrice[]>()
const isLoaded = ref<boolean>(false)
const currentPlan = ref<string>()

document.title = 'BSNL All Plans'

onMounted(async () => {
    fetchPlans('TOPUP', 'TOPUP', '3', 'S')
})

const fetchPlans = async (category: string, voucherType: string, circleCode: string, zoneCode: string) => {
    isLoaded.value = false
    currentPlan.value = voucherType // setting current requesting voucher.
    await PrepaidDataService.getPlans(category, voucherType, circleCode, zoneCode)
        .then(({ data: { data } }) => {
            isLoaded.value = true
            response.value = data
        }).catch((e) => {
            console.log(e);

            isLoaded.value = false
        })
}

const isService = ((plan: string) => {
    return currentPlan.value === plan ? 'px-4 py-2 bg-indigo-400 text-white' : 'px-4 py-2 text-indigo-400'
})
</script>
    
<template>
    <div
        class="flex justify-center pt-40 min-h-screen bg-gradient-to-b from-indigo-500 to-indigo-600"
    >
        <div class="container w-full">
            <div class="mb-10 text-center space-x-10">
                <button
                    :class="isService('TOPUP')"
                    @click="fetchPlans('TOPUP', 'TOPUP', '3', 'S')"
                >Topup</button>
                <button :class="isService('DATA')" @click="fetchPlans('STV', 'DATA', '3', 'S')">Data</button>
                <button
                    :class="isService('VOICE')"
                    @click="fetchPlans('STV', 'VOICE', '3', 'S')"
                >Voice</button>
                <button :class="isService('SMS')" @click="fetchPlans('STV', 'SMS', '3', 'S')">SMS</button>
                <button :class="isService('ISD')" @click="fetchPlans('STV', 'ISD', '3', 'S')">ISD</button>
                <button
                    :class="isService('OTHER')"
                    @click="fetchPlans('STV', 'OTHER', '3', 'S')"
                >Other Vouchers</button>
            </div>
            <div class="bg-gray-50 p-10 rounded mb-10">
                <div class="flex justify-between items-center">
                    <h3 class="text-3xl font-black my-5 text-gray-800">Here are your plans</h3>
                    <label
                        class="px-4 py-2 rounded bg-sky-600 text-white font-semibold"
                    >{{ currentPlan }}</label>
                </div>
                <div class="flex justify-center items-center py-5">
                    <div v-if="isLoaded" class="w-full">
                        <div v-if="response!.length > 0">
                            <PriceCard
                                v-for="voucher in response"
                                :name="voucher.name"
                                :description="voucher.description"
                                :denom="voucher.denom"
                                :validity="voucher.validity"
                                :planid="voucher.planid"
                                :processingcharge="voucher.processingcharge"
                                :remarks="voucher.remarks"
                                :servicetax="voucher.servicetax"
                                :talk_value="voucher.talk_value"
                            />
                        </div>
                        <div v-else>
                            <div class="text-center space-y-4">
                                <h4 class="text-2xl font-semibold">No Data available. Retry later</h4>
                                <p class="text-gray-500">
                                    It may be due to BSNL server errors, keep refreshing and if you still can't load.
                                    <a
                                        href="mailto:#"
                                        class="text-indigo-600 font-semibold"
                                    >Talk to us.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h1 class="text-4xl text-gray-600">
                            <svg
                                class="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500 inline-block"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Loading...
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute top-20 right-20">
        <p class="text-center text-white">
            Confused?
            <router-link :to="{ name: 'Home' }" class="text-indigo-400">Know what you need here.</router-link>
        </p>
    </div>
</template>
