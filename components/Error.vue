<script>

export default {
    props: {
        title: {
            type: String,
            default: 'Error'
        },
        description: {
            type: String,
            default: 'An error has occurred'
        },
        back_text: {
            type: String,
            default: 'Go Back'
        },
        back_link: {
            type: String,
            default: '/'
        }
    }
}

</script>

<template>
    <div class="
            w-screen h-screen
            fixed top-0 left-0
            flex justify-center items-center flex-row
            bg-white dark:bg-zinc-900
        ">
        <Icon name="tabler:alert-octagon" size="4rem" class="child:stroke-purple-400" />
        <div class="p-2 w-[30rem] max-w-[90vw]">
            <h1 class="
                text-3xl text-bold text-purple-400
            ">
                {{title}}
            </h1>
            <hr class="
                my-2 w-full
                border-black dark:border-white
            " />
            <div class="
                flex justify-between w-full space-x-4
            ">
                <p class="
                    text-black dark:text-white
                ">
                    {{ description }}
                </p>

                <NuxtLink :href="back_link">
                    <Icon name="tabler:arrow-badge-left" />
                    {{back_text}}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>