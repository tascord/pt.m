<script setup lang="ts">
import { resolve_colour, resolve_group, Station, Stop } from '~~/databank/Stations';

const styles = {
    opened: {
        'rotate-90': true,
        'heir:fill-purple-400': true,
        'heir:stroke-purple-400': true,
        'dark:heir:fill-purple-400': true,
        'dark:heir:stroke-purple-400': true,
    },
    default: {
        'heir:fill-zinc-600': true,
        'heir:stroke-zinc-600': true,
        'heir:transition-all': true,
        'transition-transform': true,
    }
}

const {} = defineProps<{
    station: Station|Stop,
    opened: boolean,
    open: () => void,
    close: () => void,
}>();



</script>

<template>
    <div class="
        flex flex-col
    ">
        <div class="
            flex
        ">
            <button @click="opened ? close() : open()" class="
                mr-2
                grid place-items-center
            ">
                <Icon name="tabler:triangle-filled"
                    :class="opened ? { ...styles.default, ...styles.opened } : styles.default" />
            </button>
            <div class="
                flex space-x-2
                items-center
                child-h2:text-xl child-h2:font-semibold
            ">
                <span class="
                    dark:text-opacity-40 text-zinc-800 dark:text-zinc-400
                    font-mono
                    flex
                    select-none
                ">
                    (
                    <span class="
                        text-black dark:text-white dark:text-opacity-75 select-text
                        font-semibold
                    ">
                        {{ station.code }}
                    </span>
                    )
                </span>
                <h2>
                    <NuxtLink :to="`/stations/${station.code}`"
                        :class="{ [resolve_colour(station.services.lines)]: true }">
                        {{ station.name }}
                    </NuxtLink>
                </h2>
            </div>
        </div>
        <div :style="`display: ${!opened ? 'none' : 'flex'}; margin-bottom: ${!opened ? 0 : '1rem'} `" class="
            space-x-4
            child:child-div:flex child:child-div:flex-col
            heir-h2:font-bold heir-h2:text-lg
            child:child-div:font-semibold
            mt-1 lg:ml-[4.75rem]
        ">
            <div>
                <h2>Group{{ station.services.groups.length === 1 ? '' : 's' }}</h2>
                <div>
                    <NuxtLink v-for="group in station.services.groups" :to="`/groups/${group}`" :class="{
                        [resolve_colour(resolve_group(group))]: true
                    }">
                        {{ group }}
                    </NuxtLink>
                </div>
            </div>

            <div>
                <h2>Line{{ station.services.lines.length === 1 ? '' : 's' }}</h2>
                <div>
                    <NuxtLink v-for="line in station.services.lines" :to="`/lines/${line}`" :class="{
                        [resolve_colour([line])]: true
                    }">
                        {{ line }}
                    </NuxtLink>
                </div>
            </div>

            <div>
                <h2>Zone{{ station.zone.length === 1 ? '' : 's' }}</h2>
                <div>
                    <NuxtLink v-for="zone in station.zone" :to="`/zones/${zone}`">
                        {{ zone }}
                    </NuxtLink>
                </div>
            </div>

            <div>
                <h2>Opened</h2>
                <div>
                    {{ new Date(station.opened).toLocaleDateString() }}
                </div>
            </div>
        </div>
    </div>
</template>
