<script setup lang="ts">

let scroll = ref(false);

// Check if #fab-check is in view, if so, set scroll to false
const check = () => {
    const checker = document.getElementById('fab-check');
    if (checker) {
        const rect = checker.getBoundingClientRect();
        scroll.value = rect.bottom < 0;
    }
};

// Apply check on scroll
onMounted(() => {
    window.addEventListener('scroll', check);
});

// Remove check on unmount
onUnmounted(() => {
    window.removeEventListener('scroll', check);
});

// Scroll to top of page
const top = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

</script>

<template>
    <div id="fab-check" class="
        absolute top-0
        block w-4 h-[10vw] bg-transparent 
    "></div>
    <div class="
        fixed bottom-0 right-0 flex
        mr-4 mb-4
        
        child:child:p-2
        child:bg-zinc-900 dark:child:bg-white
        child:rounded-full
        child:min-w-[2.2rem] child:min-h-[2.25rem]
        child:child:w-full child:child:h-full

        hover:child:bg-zinc-700 dark:hover:child:bg-zinc-200
        heir:text-white dark:heir:text-black
        
        heir:grid heir:place-items-center
    ">
        <div :class="{'rounded-lg': scroll, 'rounded-r-none': scroll}">
            <NuxtLink to="/contact">
                <Icon name="tabler:exclamation-mark" />
            </NuxtLink>
        </div>

        <div :class="{'rounded-lg': scroll, 'rounded-l-none': scroll, 'scale-0': !scroll, 'hidden': !scroll}">
            <button v-if="scroll" @click="top">
                <Icon name="tabler:arrow-bar-to-up" />
            </button>
        </div>
    </div>
</template>
