import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Lines } from '~~/databank/Lines';
import { resolve_code, Stations } from '~~/databank/Stations';

export default defineEventHandler(async (event) => {

    const sitemap = new SitemapStream({
        hostname: 'https://tam.florais.gay',
    });

    // Pages
    const pages = [
        '/',
        '/stations',
        '/lines',
        '/contact'
    ];

    for (const page of pages) {
        sitemap.write({
            url: page,
            changefreq: 'monthly',
        })
    }

    // Stations
    const stations = Stations;

    for (const station of stations) {
        sitemap.write({
            url: '/stations/' + station.code,
            changefreq: 'monthly',
        })
    }

    // Lines
    const lines = Lines;

    for (const line of lines) {
        sitemap.write({
            url: '/lines/' + resolve_code(line.stops[0].code)!.name,
            changefreq: 'monthly',
        })
    }

    // Articles
    const articles = await serverQueryContent(event).find();

    for (const article of articles) {
        const date = new Date(article.date || Date.now());
        sitemap.write({
            url: '/articles/' + article.slug,
            changefreq: 'monthly',
            news: {
                publication: {
                    name: 'Trains around Melbourne',
                    language: 'en'
                },
                genres: 'Blog',
                publication_date: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
                title: article.title ?? 'Untitled',
                keywords: article.tags.join(', ')
            }
        });
    }

    sitemap.end();
    return streamToPromise(sitemap);
})
