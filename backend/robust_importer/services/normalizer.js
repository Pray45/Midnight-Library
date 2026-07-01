export function normalizeBook(item) {

    const volume = item.volumeInfo ?? {};

    return {
        source: "google-books",

        sourceId: item.id ?? null,

        title: volume.title?.trim() || null,

        subtitle: volume.subtitle?.trim() || "",

        authors: volume.authors ?? [],

        cover:
            volume.imageLinks?.thumbnail?.replace("http://", "https://") ?? null,

        smallCover:
            volume.imageLinks?.smallThumbnail?.replace("http://", "https://") ?? null,

        description: volume.description ?? "",

        all_genres: volume.categories ?? [],

        publishYear: Number.parseInt(volume.publishedDate) || null,

        languages: volume.language ? [volume.language] : [],

        pageCount: volume.pageCount ?? null,

        series: null,

        seriesPosition: null,
    };
}