<script setup>
const { slug } = useRoute().params;
const { data: article, error } = await useAsyncData('article', () => queryContent().where({ slug }).findOne());
</script>

<template>

    <Error v-if="error" title="404" description="Unable to find article" back_text="Back to Articles"
        back_link="/articles" />
    <Loader v-else-if="!article && !error" />

    <ContentRenderer v-if="article" :value="article" class="markdown"/>

</template>