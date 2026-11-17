// Some posts have a "Table of Contents" whose links (href="#introduction")
// point to IDs that were never added to the headings, so the links do nothing.
// This adds the missing id to the heading whose text matches the link text.

const decode = (s: string) =>
    s
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

export function linkTocHeadings(html: string): string {
    if (!html || !html.includes('href="#')) return html;

    const existingIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const wanted = new Map<string, string>(); // heading text -> id
    for (const m of html.matchAll(/<a\b[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
        const id = m[1];
        if (!existingIds.has(id)) wanted.set(decode(m[2]), id);
    }
    if (wanted.size === 0) return html;

    return html.replace(/<(h[1-6])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (full, tag: string, attrs = '', inner: string) => {
        if (/\sid="/.test(attrs)) return full;
        const id = wanted.get(decode(inner));
        if (!id) return full;
        wanted.delete(decode(inner)); // first matching heading only
        return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
    });
}
