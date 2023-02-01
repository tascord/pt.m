<script setup>
const { tag } = useRoute().params;
const { data: articles, error } = await useAsyncData('articles', () => queryContent().find({ tags: tag.toLowerCase() }));
let tags = ref([]);

watch(articles, () => {
    if (articles) {
        tags.value = [...articles.value].reduce((acc, article) => {
            article.tags.forEach(tag => {
                if (!acc.includes(tag)) {
                    acc.push(tag);
                }
            });
            return acc;
        }, []);
    }
}, { immediate: true });

</script>

<template>

    <Error v-if="error" title="404" description="Unable to find article" back_text="Back to Articles"
        back_link="/articles" />

    <Loader v-else-if="!articles && !error" />

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
                    Articles
                </h1>
                <p class="
                    text-black dark:text-white
                ">
                    New articles every so often
                </p>
            </div>

            <div>
                <h2 class="font-semibold text-2xl">#{{ tag }}</h2>
                <ul>
                    <li v-for="article in articles">
                        <NuxtLink :to="`/articles/${article.slug}`">
                            {{ article.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>