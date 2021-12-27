<script setup lang="ts">
withDefaults(
    defineProps<{
        text: string,
        color?: string
    }>(), {
    color: 'red'
})
</script>

<template>
    <label class="option_item">
        <input type="checkbox" class="checkbox hidden" />
        <div
            class="option_inner relative bg-white rounded-md text-center h-32 border-4 border-transparent cursor-pointer hover:shadow-2xl"
        >
            <div class="tickmark"></div>

            <div class="h-full flex flex-col justify-center items-center space-y-3">
                <slot></slot>

                <h4 class="font-medium">{{ text }}</h4>
            </div>
        </div>
    </label>
</template>

<style scoped>
.option_item .checkbox:checked ~ .option_inner {
    border-color: v-bind(color);
    color: v-bind(color);
}

.option_item .option_inner .tickmark {
    position: absolute;
    top: 0;
    left: 0;
    border: 20px solid;
    border-color: #000 transparent transparent #000;
    display: none;
}

.tickmark:before {
    content: "";
    position: absolute;
    top: -18px;
    left: -15px;
    width: 15px;
    height: 10px;
    border: 3px solid;
    border-color: transparent transparent #fff #fff;
    transform: rotate(-45deg);
}

.option_item .checkbox:checked ~ .option_inner .tickmark {
    display: block;
}

.option_item .option_inner .tickmark {
    border-color: v-bind(color) transparent transparent v-bind(color);
}
</style>