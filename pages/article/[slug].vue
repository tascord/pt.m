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
            <div class="
                mb-4
            ">
                <h1 class="
                    text-2xl font-bold
                    text-purple-400
                ">
                    {{ article.title }}
                </h1>
                <ContentRenderer v-if="article" :value="article" class="markdown" />
            </div>
        </div>
    </div>


</template>