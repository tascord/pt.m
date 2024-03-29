<script setup lang="ts">
import Priority from "~/databank/helpers/Priority";
import { is_city_loop, resolve_colour, resolve_group } from "~/databank/Stations";
import sanitize from "~/helpers/Clean";

const route = useRoute();
const { pending, data: line } = await useAsyncData('lines', () => $fetch(`/api/lines/${route.params.line}`));
const { pending: status_pending, data: status } = await useAsyncData('status', () => $fetch(`/api/lines/extended/${route.params.line}`));
const direction = ref('to_city');

const priority_string = (priority_num: number) => {

    const priority = Priority.from(priority_num);
    let priorities = [];

    if (priority.check('Express, All')) priorities.push('All express services');
    else if (priority.check('Express, Some')) priorities.push('Some express services');

    if (priority.check('Limited, All')) priorities.push('All limited express services');
    else if (priority.check('Limited, Some')) priorities.push('Some limited express services');

    if (priority.check('Local, All')) priorities.push('All regular services');
    else if (priority.check('Local, Some')) priorities.push('Some regular services');


    if (priorities.length > 1) {
        priorities = [priorities[0]].concat(priorities.slice(1).map(p => p.toLowerCase()));
        return priorities.slice(0, -1).join(', ') + ' and ' + priorities.slice(-1) + ' stop here.';
    } else {
        return (priorities[0] ?? 'No services') + ' stop here.';
    }

}

const colour = (rating: number) => {

    const score = Priority.from(rating).rating();
    if (score > 2.5) return 'Service-Most';
    if (score > 0.5) return 'Service-Some';
    return 'Service-Poor';

}

</script>

<template>
    <Loader v-if="pending" />
    <Error v-if="line && line.error" title="Unable to load line information" :description="line.error"
        back_text="Back to lines" back_link="/lines" />

    <div v-if="line && !line.error">
        <div class="heir-h1:text-3xl heir-h1:font-bold">
            <div class="flex items-center space-x-2">
                <Tooltip size="1.5rem" :icon="status_pending ? 'tabler:loader-2' : 'tabler:stethoscope'"
                    :text="status.status?.description ?? 'Service Status Unknown'"
                    :class="{ 'animate-spin': status_pending, [status.status?.description === 'Good Service' ? 'Service-Most' : 'Service-Some']: true }" />
                <h1 :class="{ [resolve_colour(line.stops![0].services.lines)]: true }">
                    {{ line.name }}
                </h1>
            </div>
            <div class="
                    mt-1 dark:opacity-70
                    heir-a:font-semibold heir:m-0
                    flex items-center space-x-2
                ">
                <span class="list">
                    Part of the
                    <NuxtLink v-for="group in line.stops![0].services.groups" :to="`/group/${sanitize(group)}`" :class="{
                        [resolve_colour(resolve_group(group))]: true
                    }">
                        {{ group }}
                    </NuxtLink>
                    {{ line.stops![0].services.groups.length > 1 ? 'groups' : 'group' }}.
                </span>
                <Tooltip v-if="!line.verified" icon="tabler:info-circle"
                    text="Some of this information has yet to be verified." class="mt-1" />
            </div>
        </div>
        <hr class="my-2 border-purple-400 border-opacity-70" />
        <div class="flex justify-around space-x-4 min-h-[100vh]">
            <div class="flex-1">
                <div>
                    <h2>
                        Stops along the {{ line.name }} line
                    </h2>
                    <div class="
                            space-x-4
                            text-xs
                            child:rounded-md
                            child:transition-all child:duration-200 child:ease-in-out
                            child-button:p-2
                            text-black dark:text-white
                        ">
                        <button v-on:click="() => direction = 'to_city'"
                            :class="(direction !== 'to_city' ? 'text-opacity-40' : 'text-white bg-purple-500 text-opacity-100 px-2 shadow-xl') + '  py-[0.15rem]'">
                            <Icon name="tabler:building-skyscraper" /> To the City
                        </button>
                        <button v-on:click="() => direction = 'to_suburbs'"
                            :class="(direction !== 'to_suburbs' ? 'text-opacity-40' : 'text-white bg-purple-500 text-opacity-100 px-2 shadow-xl') + ' py-[0.15rem]'">
                            <Icon name="tabler:building-community" /> To {{ line.name }}
                        </button>
                    </div>

                    <ul class="mt-2">
                        <li v-for="stop in (direction === 'to_suburbs' ? line.stops : [...line.stops!].reverse())"
                            :key="stop.code" class="flex text-lg ">
                            <div class="flex space-x-1 mr-2">
                                <div
                                    :class="{ [`${colour(stop.priority)}`]: true, 'grid': true, 'place-items-center': true }">
                                    <Tooltip :text="priority_string(stop.priority)" icon="tabler:hand-stop" />
                                </div>
                                <Tooltip v-if="is_city_loop(stop)"
                                    :text="stop.code === line.stops![line.stops!.length - 1].code ? 'City loop stop.' : 'City loop stop, skipped on direct services.'"
                                    icon="tabler:repeat" />
                            </div>
                            <NuxtLink :to="`/stations/${stop.code}`" :class="
                                { [resolve_colour(stop.services.lines)]: true, 'font-semibold': true }
                            ">
                                {{ stop.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

            </div>
            <div>
            </div>
        </div>
    </div>
</template>