<script setup lang="ts">
import { Line, resolve_colour, resolve_group, Station } from "~/databank/Stations";
import sanitize from "~/helpers/Clean";

// TODO: Figure out why this cast is needed
const { pending, data: station } = await useAsyncData<Station>('stations', () => $fetch(`/api/stations/${useRoute().params.station}`));
const { error: article_error, data: articles } = await useAsyncData('articles', () => queryContent({ tags: String(useRoute().params.station).toUpperCase() }).find());
</script>


<template>
    <Error v-if="(station as any).error" title="404" description="Unable to load station information"
        back_text="Back to Stations" back_link="/stations" />

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
                    <span :class="{[resolve_colour(station!.services.lines)]: true}">
                        {{ station?.name }}
                    </span>
                </h1>
                <span class="list">
                    Part of the
                    <NuxtLink v-for="group in station?.services.groups" :to="`/group/${sanitize(group)}`" :class="{
                        [resolve_colour(resolve_group(group))]: true
                    }">
                        {{ group }}
                    </NuxtLink>
                    {{ station!.services.groups.length > 1 ? 'groups' : 'group' }}.
                </span>
                <span class="list">
                    Servicing the 
                    <NuxtLink v-for="line in station?.services.lines" :to="`/line/${sanitize(line)}`" :class="{
                        [resolve_colour([line])]: true
                    }">
                        {{ line }}
                    </NuxtLink>
                    {{ station!.services.lines.length > 1 ? 'lines' : 'line' }}.
                </span>
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