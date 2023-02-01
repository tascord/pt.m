<script setup>
const { data: articles, error } = await useAsyncData('articles', () => queryContent().find());
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

            <div class="
                flex flex-wrap
                justify-between items-start
                mt-6 mb-3 space-y-2
                heir-h2:font-semibold heir-h2:text-2xl
                child:flex-1
            ">
                <div>
                    <h2>All articles</h2>
                    <ul>
                        <li v-for="article in articles">
                            <NuxtLink :to="`/articles/${article.slug}`">
                                {{ article.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>By tag</h2>
                    <ul>
                        <li v-for="tag in tags">
                            <NuxtLink :to="`/articles/tag/${tag}`">
                                #{{ tag }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>