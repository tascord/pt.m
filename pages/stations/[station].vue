<script setup lang="ts">
import { Station } from '~~/databank/Stations';

// TODO: Figure out why this cast is needed
const { pending, data: station } = await useAsyncData<Station>('stations', () => $fetch(`/api/stations/${useRoute().params.station}`));
const { error: article_error, data: articles } = await useAsyncData('articles', () => queryContent().find({ tags: String(useRoute().params.station).toUpperCase() }));
</script>


<template>

    <Error v-if="(station as any).error" title="404" description="Unable to load station information" back_text="Back to Stations"
        back_link="/stations" />

    <Loader v-else-if="(!articles || pending) && !(station as any).error" />

    <div v-if="articles" class="
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
                    {{ station?.name }}
                </h1>
                <p class="
                    text-black dark:text-white
                ">
                    New articles every so often
                </p>
            </div>

            <div class="
                flex flex-wrap
                justify-between items-start
                mt-6 mb-3 space-y-2
                heir-h2:font-semibold heir-h2:text-2xl
                child:flex-1
            ">
                <div>
                    <h2>Raw Data</h2>
                    <pre>
                        {{ station }}
                    </pre>
                </div>
                <div>
                    <h2>Articles</h2>
                    <div v-if="article_error">
                        Unable to load articles.
                    </div>
                    <div v-else-if="articles.length === 0" class="dark:text-zinc-400">
                        No articles about {{ station!.name }} yet.
                    </div>
                    <ul v-else>
                        <li v-for="article in articles">
                            <NuxtLink :to="`/articles/${article.slug}`">
                                {{ article.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>