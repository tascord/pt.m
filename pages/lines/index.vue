<script setup>
import sanitize from "~/helpers/Clean";
const { pending, data: lines } = useAsyncData('lines', () => $fetch('/api/lines'));
</script>

<template>
    <div>

        <Loader v-if="pending" />

        <div v-if="lines" class="
            w-full
            flex justify-center
        ">
            <div class="
                w-[70rem] max-w-full
            ">
                <div class="
                    mb-4
                ">
                    <h1 class="
                        text-black dark:text-white
                        text-2xl font-bold
                    ">
                        Train Lines
                    </h1>
                    <p class="
                        text-black dark:text-white
                    ">
                        Service information for all metro lines
                    </p>
                </div>

                <ul>
                    <li v-for="line in lines">
                        <NuxtLink :to="`/lines/${sanitize(line)}`">
                            {{ line }}
                        </NuxtLink>
                    </li>
                </ul>

            </div>
        </div>


    </div>
</template>