<script setup lang="ts">
const { id } = useRoute().params;
const { pending, data } = useAsyncData('stations', () => $fetch(`/api/stations/${id}`));
</script>

<template>
    <Loader v-if="pending" />
    <Error v-if="data && data.error" title="Unable to load station information" :description="data.error" />

    <div v-if="data && !data.error" class="
        w-full 
        flex justify-center
    ">
        <div class="
            w-[70rem] max-w-full
        ">
            <div class="
                mb-4
            ">
                <h1 class="
                    text-black dark:text-white text-2xl font-bold
                ">
                    Trains in Melbourne
                </h1>
                <p class="
                ">
                    {{ 'a' }}
                </p>
            </div>
        </div>
    </div>
</template>