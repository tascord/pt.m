<script setup lang="ts">
defineProps<{
    text: string;
    icon: string;
    position?: 'left' | 'center';
    size?: string;
}>();
</script>

<template>

    <div class="
            relative group
            grid place-items-center
        ">
        <Icon :size="size ?? '1rem'" :name="icon" class="
            child:stroke-black dark:child:stroke-white
            group-hover:child:stroke-purple-400
            transition-all duration-200 ease-in-out
            cursor-pointer
            opacity-50 group-hover:opacity-100
        " />
        <span v-if="position !== 'center'" class="
            scale-0 group-hover:scale-100
            origin-top-left transition-all duration-200 ease-in-out
            absolute top-[1.75rem] left-[0.25rem]
            text-xs text-black dark:text-white
            bg-zinc-100 dark:bg-zinc-800
            px-4 py-1
            rounded-md rounded-tl-none
            shadow-xl
            whitespace-nowrap
            text-left
            z-10
        ">
            <Icon name="tabler:arrow-badge-up" size="1rem" class="
                dark:child:fill-zinc-800 dark:child:stroke-zinc-800
                child:fill-zinc-100 child:stroke-zinc-100
                absolute top-[-0.5rem] left-[-0.25rem]
            " />
            {{ text }}
        </span>

        <span v-else class="
            scale-0 group-hover:scale-100
            origin-top transition-all duration-200 ease-in-out
            absolute top-[1.75rem] mx-auto
            text-xs text-black dark:text-white
            bg-white dark:bg-zinc-800
            px-4 py-1
            rounded-md rounded-tl-none
            shadow-xl
            whitespace-nowrap
            text-center
            z-10
        ">
            <Icon name="tabler:arrow-badge-up" size="1rem" class="
                dark:child:fill-zinc-800 dark:child:stroke-zinc-800
                child:fill-white child:stroke-white
                absolute top-[-0.5rem] mx-auto left-0 right-0
            " />
            {{ text }}
        </span>
    </div>

</template>