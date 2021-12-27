<script setup lang="ts">

interface VoucherPrice {
    denom: string,
    description: string,
    name: string,
    planid: string,
    validity: string,
    processingcharge?: string,
    remarks?: string,
    servicetax?: string,
    talk_value?: string
}

defineProps<VoucherPrice>()
</script>

<template>
    <div
        class="bg-white rounded flex justify-between items-center cursor-pointer shadow-lg hover:shadow-2xl mb-5"
    >
        <div
            class="bg-indigo-200 rounded-l w-64 h-40 flex justify-center items-center flex-shrink-0"
        >
            <div class="space-y-4 flex flex-col justify-center items-center">
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
        <div class="p-5 grow flex justify-between items-center space-x-4">
            <div class="space-y-4">
                <h4 class="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <span v-if="talk_value" class="font-sans">₹</span>
                    {{ name }}
                    <span
                        class="text-sm font-medium text-gray-400"
                    >{{ remarks }}</span>
                </h4>
                <div v-if="talk_value">
                    <table class="text-gray-600 text-xs">
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
                    class="text-gray-600 text-sm"
                    v-else
                >{{ description ?? 'No description available.' }}</p>
            </div>
            <div class="space-y-4 w-32 flex items-center flex-shrink-0">
                <button
                    class="px-8 py-2 rounded bg-indigo-700 uppercase text-white font-semibold text-sm"
                >Save</button>
            </div>
        </div>
    </div>
</template>