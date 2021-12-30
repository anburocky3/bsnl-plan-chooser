<script setup lang="ts">

interface VoucherPrice {
    denom: string,
    description?: string,
    name: string,
    planid?: string,
    validity?: string,
    processingcharge?: string,
    remarks?: string,
    servicetax?: string,
    talk_value?: string
}

defineProps<VoucherPrice>()
</script>

<template>
    <div
        class="bg-white rounded flex flex-col sm:flex-row justify-between items-center cursor-pointer shadow-lg hover:shadow-2xl mb-5"
    >
        <div
            class="bg-indigo-200 rounded-t sm:rounded-l w-full sm:w-64 h-44 flex justify-center items-center flex-shrink-0"
        >
            <div class="space-y-2 sm:space-y-4 flex flex-col justify-center items-center">
                <h4 class="font-bold text-2xl">
                    <span class="font-sans">₹</span>
                    {{ denom }}
                </h4>
                <div v-if="talk_value" class="bg-sky-50 px-4 py-2 rounded-full text-xs">
                    <span class="font-sans">₹</span>
                    {{ talk_value }} Talktime
                </div>
                <div v-if="!talk_value">{{ validity }} days</div>
            </div>
        </div>
        <div
            class="p-5 grow flex flex-col sm:flex-row sm:justify-between sm:items-center sm:space-x-4 w-full"
        >
            <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <span v-if="talk_value" class="font-sans">₹</span>
                    {{ name }}
                    <span
                        class="text-sm font-medium text-gray-400"
                    >{{ remarks }}</span>
                </h4>
                <div v-if="talk_value">
                    <table class="text-gray-600 text-xs mb-5">
                        <tr>
                            <td class="border px-8">Talk Value</td>
                            <td class="border px-8">
                                <span class="font-sans">₹</span>
                                {{ talk_value }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border px-8">Service Tax</td>
                            <td class="border px-8">
                                <span class="font-sans">₹</span>
                                {{ servicetax }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border px-8">Processing Charge</td>
                            <td class="border px-8">
                                <span class="font-sans">₹</span>
                                {{ processingcharge }}
                            </td>
                        </tr>
                    </table>
                </div>
                <p
                    class="text-gray-600 text-sm pb-5 sm:pb-0"
                    v-else
                >{{ description ?? 'No description available.' }}</p>
            </div>
            <div class="space-y-4 w-full sm:w-40 flex items-center flex-shrink-0">
                <a
                    href="https://portal.bsnl.in/myportal/quickrecharge.do"
                    target="_blank"
                    class="px-6 py-2 w-full rounded bg-green-600 uppercase text-white font-semibold text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 inline-flex mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Recharge
                </a>
            </div>
        </div>
    </div>
</template>