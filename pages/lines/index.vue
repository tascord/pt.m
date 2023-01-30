<script setup>
const { pending, data: trains, } = useAsyncData('lines', () => $fetch('/api/lines'));
</script>

<template>
    <div>

        <Loader v-if="pending" />

        <ul>
            <li v-for="train in trains">
                <nuxt-link :to="`/lines/${train}`" class="text-purple-400">
                    {{ train }}
                </nuxt-link>
            </li>
        </ul>

    </div>
</template>