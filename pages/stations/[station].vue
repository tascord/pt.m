<script setup lang="ts">
import { resolve_colour } from '~~/databank/Stations';

const { pending, data: station } = useAsyncData('stations', () => $fetch(`/api/stations/${useRoute().params.station}`));
</script>

<template>
    <Loader v-if="pending" />
    <Error v-if="station && station.error" title="Unable to load station information" :description="station.error" />

    <div v-if="station && !station.error" class="
        w-full 
        flex justify-center
    ">
        <div class="
            w-[70rem] max-w-full
        ">
            <div class="
                mb-4
            ">
                <h1 :class="{
                    [resolve_colour(station.services.lines)]: true,
                    'text-2xl': true,
                    'font-bold': true,
                }">
                    {{ station.name }}
                </h1>
                <p class="
                ">
                <pre>
                        {{ station }}
                    </pre>
                </p>
            </div>
        </div>
    </div>
</template>