// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        'nuxt-icon',
    ],

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Trains in Melbourne',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ]
        }
    },

    content: {
        markdown: {
            remarkPlugins: {},
            rehypePlugins: []
        }
    },

    colorMode: {
        classSuffix: ''
    },

    nitro: {
        prerender: {
            routes: ['/sitemap.xml']
        }
    }

})
