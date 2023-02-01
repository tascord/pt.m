<template>
    <div class="
        w-[100vw] min-h-[100vh] pb-4
        bg-white dark:bg-zinc-900
    ">
        <!-- Header -->
        <div class="w-full flex justify-center">
            <div class="
                fixed top-0 z-50
                w-[70rem] max-w-full h-10
                flex items-center justify-between
                px-4
                rounded-[9px] rounded-t-[0]
                shadow-xl
                bg-zinc-700
            ">
                <!-- Branding -->
                <div class="flex items-center justify-center space-x-2">
                    <div class="block sm:hidden">
                        <Theme />
                    </div>
                    <NuxtLink href="/" class="
                        text-white font-bold
                        hover:text-purple-400
                    ">
                        pt.m
                    </NuxtLink>
                </div>

                <!-- Theme -->
                <div class="
                    absolute left-[50%]
                    hidden sm:block
                ">
                    <Theme />
                </div>

                <!-- Navbar -->
                <nav class="
                    flex space-x-2
                    justify-center items-center
                ">
                    <NuxtLink href="/lines">
                        lines
                    </NuxtLink>
                    <NuxtLink href="/stations">
                        stations
                    </NuxtLink>
                    <NuxtLink href="/articles">
                        articles
                    </NuxtLink>
                </nav>
            </div>
        </div>
        <Floating />
        <main class="
            px-[10vw] pt-12
            text-black dark:text-white
        ">
            <slot />
        </main>
    </div>
</template>