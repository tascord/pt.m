import { serverQueryContent } from "#content/server";

export default defineEventHandler(async event => {
    const docs = await serverQueryContent(event).find();
    return docs.map(d => ({
        slug: d.slug,
        title: d.title,
        description: d.description,
        author: d.author,
        date: d.date,
        tags: d.tags,
    }))
});