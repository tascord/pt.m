<template>
    <div class="
        w-[100vw] min-h-[100vh] pb-4
        bg-zinc-900
    ">
        <!-- Header -->
        <div class="
            w-full h-10
            flex items-center justify-between
            px-[10vw]
        ">
            <!-- Branding -->
            <NuxtLink href="/" class="
                text-white font-bold
                hover:text-purple-400
            ">
                pt.m
            </NuxtLink>
            <!-- Navbar -->
            <nav class="
                flex space-x-2
                text-white
            ">
                <NuxtLink  href="/trains">
                    trains
                </NuxtLink>
                <NuxtLink  href="/lines">
                    lines
                </NuxtLink>
                <NuxtLink href="/stations">
                    stations
                </NuxtLink>
                <NuxtLink  href="/infrastructure">
                    infrastructure
                </NuxtLink>
            </nav>
        </div>
        <main class="
            px-[10vw]
            text-white
        ">
            <slot />
        </main>
    </div>
</template>