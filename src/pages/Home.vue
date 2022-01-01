<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useGlobal } from '@/stores/global.store';
import Checkbox from '@/components/forms/Checkbox.vue';
import { useRouter } from 'vue-router';

const globalStore = useGlobal()
const router = useRouter()

globalStore.getCircles()

const form: any = reactive({
    circle: '',
    circleCode: computed(() => globalStore.circles!.find(circle => circle.CIRCLE_CODE === form.circle)?.CIRCLE_ID ?? ''),
    zoneCode: computed(() => globalStore.circles!.find(circle => circle.CIRCLE_CODE === form.circle)?.ZONE_CODE ?? ''),
    taste: [] as any[],
    errors: [] as any
})

const wizard = reactive({
    step: 1,
    totalSteps: 2,
    nextStep() {
        if (this.checkValidations()) {
            this.step++
        }
    },
    previousStep() {
        this.step--
    },
    checkValidations(): boolean {
        form.errors = [] // resetting form errors
        if (this.step === 1) {

            if (form.circle === '') {
                form.errors[0] = "Please select your circle."
                return false
            }
        }
        else if (this.step === 2) {

            if (!form.taste.length) {
                form.errors[1] = "Please select your taste."
                return false
            }
        }
        return true
    }
})

const submitPreference = () => {
    router.push({
        name: 'AllPlansList',
        query: {
            circleId: form.circleCode,
            circleCode: form.circle,
            zoneCode: form.zoneCode,
            taste: form.taste
        }
    })
}

</script>
    
<template>
    <div
        class="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-500 to-indigo-600"
    >
        <div>
            <div class="flex justify-center mb-10">
                <img
                    src="https://upload.wikimedia.org/wikipedia/en/9/97/BSNL_Logo.svg"
                    alt="BSNL Logo"
                    class="w-20 sm:w-28"
                />
            </div>
            <div class="space-y-10 bg-indigo-400/75 rounded-lg p-10 m-5">
                <section v-if="wizard.step === 1" class="space-y-5">
                    <div class="max-w-3xl text-center space-y-2">
                        <h4
                            class="text-xl sm:text-3xl font-semibold sm:font-black"
                        >Choose your state</h4>
                        <p>We know you are from India country, but where do you live inside india?.</p>
                    </div>
                    <div class="space-y-1">
                        <div class="text-red-800" v-if="form.errors[0]">{{ form.errors[0] }}</div>
                        <select
                            class="px-4 py-2 rounded w-full outline-none border-2 border-indigo-600"
                            v-model="form.circle"
                            @change="wizard.checkValidations"
                        >
                            <option value>-Select State-</option>
                            <option
                                v-for="circle in globalStore.circles"
                                :key="circle.CIRCLE_CODE"
                                :value="circle.CIRCLE_CODE"
                            >{{ circle.CIRCLE_NAME }}</option>
                        </select>
                    </div>
                </section>
                <section v-if="wizard.step === 2" class="space-y-10">
                    <div class="max-w-3xl text-center space-y-2">
                        <h4
                            class="text-xl sm:text-3xl font-semibold sm:font-black"
                        >Just, Choose Your Primary Usage</h4>
                        <p>Just choose your primary usage and we will suggest the plan accordingly. Do note that, all plans are from official BSNL website.</p>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Checkbox
                            v-for="voucher in globalStore.getAllVouchers"
                            :key="voucher.id"
                            :text="voucher.name"
                            :color="voucher.color"
                            :icon="voucher.icon"
                            v-model:names="form.taste"
                            :value="voucher.name"
                        />
                        <div class="text-red-800" v-if="form.errors[1]">{{ form.errors[1] }}</div>
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
                            @click="submitPreference"
                            v-if="wizard.step === wizard.totalSteps"
                        >Find my plan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute bottom-10 right-20 hidden sm:block">
        <p class="text-center text-white">
            Don't have time?
            <router-link :to="{ name: 'Plans' }" class="text-indigo-400">View all packages here</router-link>
        </p>
    </div>
</template>
