<script setup>
const { slug } = useRoute().params;
const { data: article, error } = await useAsyncData('article', () => queryContent().where({ slug }).findOne());
</script>

<template>

    <Error v-if="error" title="404" description="Unable to find article" back_text="Back to Articles"
        back_link="/articles" />
    <Loader v-else-if="!article && !error" />

    <div v-if="article && !article.error" class="
        w-full 
        flex justify-center
    ">
        <div class="
            w-[70rem] max-w-full
        ">
            <div>
                <h1 class="
                    text-2xl font-bold
                    text-purple-400
                ">
                    {{ article.title }}
                </h1>
                <p>
                    {{ article.description }}
                </p>
                <div class="
                    text-sm
                    flex items-center space-x-2
                    child:flex child:items-center child:space-x-1
                ">
                    <div>
                        <Icon name="tabler:user" />
                        <span>
                            {{ article.author }}
                        </span>
                    </div>

                    <div>
                        <Icon name="tabler:calendar" />
                        <span>
                            {{ new Date(article.date || Date.now()).toLocaleDateString() }}
                        </span>
                    </div>

                    <div>
                        <Icon name="tabler:tag" />
                        <NuxtLink v-for="tag in article.tags" :to="`/articles/tag/${tag}`">
                            {{ tag + (tag !== article.tags[article.tags.length - 1] ? ',' : '') }}
                        </NuxtLink>
                    </div>
                </div>
                <hr class="mt-2 mb-4"/>
                <ContentRenderer v-if="article" :value="article" class="markdown" />
            </div>
        </div>
    </div>


</template>