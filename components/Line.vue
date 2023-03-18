<script setup lang="ts">
import sanitize from '~~/helpers/Clean';
import { resolve_name, resolve_colour, StationName } from '~~/databank/Stations';

const props = defineProps<{
    line: StationName;
}>();

const line = resolve_name(props.line)!;
const colour = resolve_colour(line.services.lines);

</script>

<template>
    <NuxtLink :to="sanitize(line)" :class="{[colour]: true}">
        {{ line.name }}
    </NuxtLink>
</template>
