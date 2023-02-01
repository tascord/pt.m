<script setup lang="ts">
const submit = (e: Event) => {
    e.preventDefault();
    console.log('submit');
}
</script>

<template>
    <div class="
        w-full h-full
        flex justify-center
    ">
        <div class="
            w-[70rem] max-w-full
        ">
            <div class="
                mb-6
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
                    Something wrong, or missing? Let us know!
                </p>
            </div>
            <div class="
                w-full
                flex justify-center
            ">
                <form @submit="submit" class="
                    flex flex-col
                    w-[50rem] max-w-full
                    shadow-xl rounded-xl
                    p-4
                    space-y-4
                    bg-white dark:bg-zinc-900
                    outline-zinc-400 dark:outline-zinc-500 outline-2 outline

                    child:bg-transparent
                    child:outline-2 child:outline child:outline-offset-2
                    child:rounded-lg 
                    child:transition-all
                    focus-within:child:outline-purple-400 dark:focus-within:child:outline-purple-500
                    child:outline-zinc-300 dark:child:outline-zinc-500
                    child:indent-1

                    child:required:empty:placeholder:text-red-400

                    focus-within:child:outline-none
                ">
                    <input type="text" name="name" placeholder="Name" required autocomplete="off" />
                    <input type="text" name="email" placeholder="Email (For Reply)" autocomplete="off" />
                    <textarea name="content" placeholder="Content" class="resize-none h-[10rem]" required></textarea>
                    <button type="submit" class="bg-purple-500 text-white dark:bg-purple-400">Send</button>
                </form>
            </div>
        </div>
    </div>

</template>