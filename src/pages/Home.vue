<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useGlobal } from '@/stores/global.store';
import CheckboxV2 from '@/components/forms/CheckboxV2.vue';

const globalStore = useGlobal()

const form = reactive({
    circle: '',
    taste: [],
})

const wizard = reactive({
    step: 1,
    totalSteps: 3,
    nextStep() {
        this.step++
    },
    previousStep() {
        this.step--
    }
})

</script>
    
<template>
    <div
        class="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-500 to-indigo-600"
    >
        <div class="space-y-10 bg-indigo-400/75 rounded-lg p-10">
            <section v-if="wizard.step === 1" class="space-y-5">
                <div class="max-w-3xl text-center space-y-2">
                    <h4 class="text-3xl font-black">Choose your state</h4>
                    <p>We know you are from India country, but where do you live inside india?.</p>
                </div>
                <select class="px-4 py-2 rounded w-full" v-model="form.circle">
                    <option value>-Select State-</option>
                    <option
                        :value="circle.CIRCLE_ID"
                        v-for="circle in globalStore.circles"
                        :key="circle.CIRCLE_ID"
                    >{{ circle.CIRCLE_NAME }}</option>
                </select>
            </section>
            <section v-if="wizard.step === 2" class="space-y-10">
                <div class="max-w-3xl text-center space-y-2">
                    <h4 class="text-3xl font-black">Just, Choose Your Primary Usage</h4>
                    <p>Just choose your primary usage and we will suggest the plan accordingly. Do note that, all plans are from official BSNL website.</p>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <!-- <Checkbox
                        v-for="voucher in globalStore.getAllVouchers"
                        :key="voucher.id"
                        :text="voucher.name"
                        :color="`hsla(${~~(360 * Math.random())},70%,20%,1)`"
                        v-model="form.taste"
                        :value="voucher.name"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                        </svg>
                    </Checkbox>-->

                    <CheckboxV2
                        v-for="voucher in globalStore.getAllVouchers"
                        :key="voucher.id"
                        :text="voucher.name"
                        :color="voucher.color"
                        :icon="voucher.icon"
                        v-model:names="form.taste"
                        :value="voucher.name"
                    ></CheckboxV2>
                </div>
            </section>
            <section v-if="wizard.step === 3">
                <div class="max-w-3xl text-center space-y-2">
                    <h4 class="text-3xl font-black">Step #3</h4>
                    <p>Just choose your primary usage and we will suggest the plan accordingly. Do note that, all plans are from official BSNL website.</p>
                </div>
                <div class="grid grid-cols-3 gap-4">Step 3 form</div>
            </section>
            <div class="flex justify-between items-center">
                <div>
                    <button
                        class="px-4 py-2 rounded font-bold uppercase tracking-wider text-sm"
                        v-if="wizard.step !== 1"
                        @click="wizard.previousStep"
                    >Previous</button>
                </div>
                <div>
                    <button
                        class="px-4 py-2 bg-orange-400 hover:bg-orange-600 rounded font-bold uppercase tracking-wider shadow-lg"
                        @click="wizard.nextStep"
                        v-if="wizard.step != wizard.totalSteps"
                    >Next</button>
                    <button
                        class="px-4 py-2 bg-orange-400 hover:bg-orange-600 rounded font-bold uppercase tracking-wider shadow-lg"
                        @click="alert('sd')"
                        v-if="wizard.step === wizard.totalSteps"
                    >Find my plan</button>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute bottom-20 right-20">
        <p class="text-center text-white">
            Don't have time?
            <router-link :to="{ name: 'Plans' }" class="text-indigo-400">View all packages here</router-link>
        </p>
    </div>
</template>
