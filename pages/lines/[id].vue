<script setup lang="ts">
import Priority from "~/databank/helpers/Priority";
import { CityLoop, resolve_colour, resolve_name } from "~/databank/Stations";

const route = useRoute();
const { pending, data: line, } = useAsyncData('lines', () => $fetch(`/api/lines/${route.params.id}`));
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
        <div class="child-h1:text-3xl child-h1:text-bold">
            <h1
                :class="{ [resolve_colour(line.stops![0].services.lines)]: true, 'font-semibold': true }">
                {{ line.name }}
            </h1>
            <div class="
                mt-1 dark:opacity-70
                heir-a:font-semibold
            ">
                <h2>
                    Part of the
                    <NuxtLink v-for="group in line.stops![0].services.groups" :to="`/group/${group}`">
                        {{ group }}
                    </NuxtLink>
                    {{ line.stops![0].services.groups.length > 1 ? 'groups' : 'group' }},

                    servicing the
                    <NuxtLink v-for="sub_line in line.stops![0].services.lines" :to="`/line/${sub_line}`" :class="
                        { [resolve_colour(resolve_name(sub_line)!.services.lines)]: true }
                    ">
                        {{ sub_line }}
                    </NuxtLink>
                    {{ line.stops![0].services.lines.length > 1 ? 'lines' : 'line' }}
                </h2>
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
                    ">
                        <button v-on:click="() => direction = 'to_city'"
                            :class="(direction !== 'to_city' ? 'text-opacity-40' : 'bg-purple-500 text-opacity-100 px-2') + '  py-[0.15rem] shadow-xl'">
                            <Icon name="tabler:building-skyscraper" /> To the City
                        </button>
                        <button v-on:click="() => direction = 'to_suburbs'"
                            :class="(direction !== 'to_suburbs' ? 'text-opacity-40' : 'bg-purple-500 text-opacity-100 px-2') + ' py-[0.15rem] shadow-xl'">
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
                                <Tooltip v-if="CityLoop.includes(stop.code)"
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