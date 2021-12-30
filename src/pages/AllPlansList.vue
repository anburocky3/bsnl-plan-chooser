<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useGlobal } from '@/stores/global.store';
import PriceCard from '@/components/PriceCard.vue';
import { useRoute } from 'vue-router';

const globalStore = useGlobal()

const route = useRoute();

let userCircle: string = ''
let userTaste: string[]

if (route.query.taste) {
    userCircle = route.query.circle as string;
    userTaste = (route.query.taste as string[]).map((taste) => taste.toUpperCase());
} else {
    userCircle = '3';
    userTaste = ['VOICE', 'DATA'];
}



const isLoaded = ref<boolean>(false)
let allPackages = reactive<any>([])

const filters = reactive({
    circle: userCircle,
    voucherType: userTaste ?? ['TOPUP'],
    cost: ''
})

// const filteredResults = computed(() => {
//     return globalStore.filteredPlans(filters.voucherType, filters.cost)
// })

const filteredResults = computed(() => {
    return globalStore.filteredPlansByTaste(filters.voucherType, filters.cost)
})

document.title = 'BSNL All Plans - Masterview'

isLoaded.value = true


</script>
    
<template>
    <div
        class="flex justify-center pt-10 sm:pt-10 min-h-screen bg-gradient-to-b from-indigo-500 to-indigo-600"
    >
        <div class="container mx-auto">
            <div class="bg-gray-50 px-10 py-5 rounded mb-10 mx-2">
                <div class="flex justify-between items-center">
                    <div class="flex flex-col sm:flex-row justify-between items-center w-full">
                        <h3 class="text-xl font-semibold my-5 text-gray-800 w-full">
                            <router-link :to="{ name: 'Home' }">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline-block mr-3 hover:text-indigo-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            </router-link>Here are your
                            <span
                                :class="{ 'text-indigo-500 mr-2': filteredResults.length > 0 }"
                            >plans</span>
                            <span
                                v-if="filteredResults.length > 0"
                                class="sm:font-bold"
                            >(Total: {{ filteredResults.length }})</span>
                            <span
                                v-for="taste in filters.voucherType"
                                :key="taste"
                                v-text="taste"
                                class="ml-4 px-2 bg-green-300 rounded text-sm"
                            ></span>
                        </h3>
                        <div
                            class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <!-- <select class="px-4 py-2 rounded w-full" v-model="filters.circle">
                                <option value>-Circle-</option>
                                <option
                                    :value="circle.CIRCLE_ID"
                                    v-for="circle in globalStore.circles"
                                    :key="circle.CIRCLE_ID"
                                >{{ circle.CIRCLE_NAME }}</option>
                            </select>-->
                            <select
                                class="px-4 py-2 rounded w-96 outline-none border-2 border-indigo-500"
                                v-model="filters.voucherType"
                                multiple
                            >
                                <option value>-VoucherType-</option>
                                <option
                                    :value="voucherType.name.toUpperCase()"
                                    v-for="voucherType in globalStore.voucherTypes"
                                    :key="voucherType.id"
                                >{{ voucherType.name }}</option>
                            </select>
                            <select
                                class="px-4 py-2 rounded w-full outline-none border-2 border-indigo-500"
                                v-model="filters.cost"
                            >
                                <option value>-Sort-</option>
                                <option
                                    :value="sortFilter.name"
                                    v-for="sortFilter in globalStore.sortFilters"
                                    :key="sortFilter.name"
                                >{{ sortFilter.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center py-5">
                    <div v-if="isLoaded" class="w-full">
                        <div v-if="filteredResults.length > 0">
                            <PriceCard
                                v-for="voucher in filteredResults"
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
                                    >Report to us.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h1 class="text-xl sm:text-xl text-gray-600">
                            <svg
                                class="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-500 inline-block"
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
</template>
