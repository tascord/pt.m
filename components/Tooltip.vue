<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: 'tabler:info-circle'
        },
    }
}
</script>

<template>

    <div class="
            relative group
            grid place-items-center
        ">
        <Icon :name="icon" class="
            child:stroke-white
            group-hover:child:stroke-purple-400
            transition-all duration-200 ease-in-out
            cursor-pointer
            opacity-50 group-hover:opacity-100
        " />
        <span class="
            scale-0 group-hover:scale-100
            origin-top-left transition-all duration-200 ease-in-out
            absolute top-[1.75rem] left-[0.25rem]
            text-xs text-white
            bg-zinc-800
            px-4 py-1
            rounded-md rounded-tl-none
            whitespace-nowrap
            text-left
            z-10
        ">
            <Icon name="tabler:arrow-badge-up" size="1rem" class="
                child:fill-zinc-800 child:stroke-zinc-800
                absolute top-[-0.5rem] left-[-0.25rem]
            " />
            {{ text }}
        </span>
    </div>

</template>