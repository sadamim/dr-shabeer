// Cleans a blog slug typed in the admin form so it is safe to use as a URL segment.
// e.g. " /best-gallbladder-surgeon-in-bangalore/ " -> "best-gallbladder-surgeon-in-bangalore"
// Case is kept as-is because some existing, already-indexed slugs contain capitals.
export const normalizeSlug = (value?: string | null): string =>
    (value || '')
        .trim()
        .replace(/^https?:\/\/[^/]+/i, '') // pasted full URL
        .replace(/^\/*(blogs\/)?/i, '') // leading slashes and "blogs/" prefix
        .replace(/\/+$/, '') // trailing slashes
        .replace(/\s+/g, '-');
