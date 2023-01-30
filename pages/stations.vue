<script setup lang="ts">
import type { Station } from '~~/databank/Stations';
const { pending, data } = useAsyncData('stations', () => $fetch(`/api/stations`));

const query = ref("");
const stations = ref([]);

// Filter stations as query changes
watch(query, () => {
    if (query.value.length > 0) {
        const q = query.value.toLowerCase();
        stations.value = (data.value as any).filter((station: Station) => (
            station.name.toLowerCase().includes(q) ||
            station.code.toLowerCase().includes(q) ||
            station.services.lines.some(l => l.toLowerCase().includes(q)) ||
            station.services.groups.some(g => g.toLowerCase().includes(q))
        )).sort((a: Station, b: Station) => (

            // If name exactly matches query, sort to top
            (a.name.toLowerCase().includes(q) ? -1 : 0) +
            (b.name.toLowerCase().includes(q) ? 1 : 0) +

            0

        ));
    } else {
        stations.value = data.value as any;
    }
}, { immediate: true });

</script>

<template>

    <Loader v-if="pending" />
    <Error v-if="data && data.error" title="Unable to load station information" :description="data.error" />

    <div v-if="data && !data.error">

        <div class="
            flex
            justify-between items-end
            mt-6 mb-3
        ">
            <h1 class="
                text-3xl font-bold
                flex-1
            ">
                Station Directory
            </h1>

            <div class="
                flex justify-center
                h-8
            ">
                <form @submit="e => e.preventDefault()" class="
                    px-2
                    w-full max-w-[30rem]
                    flex justify-center items-center space-x-2
                    outline-white outline-2 outline-offset-2 outline
                    rounded-xl shadow-xl
                    focus:ring ring-purple-400
                ">
                    <input type="text" placeholder="Search" v-model="query" class="
                        flex-1
                        bg-transparent
                        text-white
                        focus:outline-none
                    " />
                    <Icon name="tabler:search" />
                </form>
            </div>
        </div>

        <hr class="mb-6" />

        <div class="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        ">
            <div v-for="station in stations">
                <Station :station="station" />
            </div>
        </div>

    </div>

</template>