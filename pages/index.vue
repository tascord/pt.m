<script setup>

const phrases = [
    `A """definitive""" guide`,
    `A good place to start`,
    `Learn something, probably`
]

const phrase = ref(phrases[Math.random() * phrases.length | 0]);

</script>

<template>
    <div class="
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
                    Trains in Melbourne
                </h1>
                <p class="
                    text-black dark:text-white
                ">
                    {{ phrase }}
                </p>
            </div>
        </div>
    </div>
</template>