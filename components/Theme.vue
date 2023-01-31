<template>
    <!-- @click="() => $colorMode.preference = ($colorMode.preference === 'light' ? 'dark' : $colorMode.preference === 'dark' ? 'system' : 'light')" -->
    <button @click="() => $colorMode.preference = ($colorMode.preference === 'light' ? 'dark' : 'light')"
        style="left: calc(50% - 0.5rem)" class="
            grid place-items-center
            heir:stroke-white heir:stroke-2
            opacity-50 hover:opacity-100
        ">
        <!-- <Tooltip v-if="$colorMode.preference === 'system'" icon="tabler:browser"
                        text="Theme determined by system" position="center" /> -->
        <Tooltip v-if="$colorMode.value === 'light'" icon="tabler:sun" text="Light theme" position="center" />
        <Tooltip v-else="$colorMode.value === 'dark'" icon="tabler:moon" text="Dark theme" position="center" />
    </button>
</template>