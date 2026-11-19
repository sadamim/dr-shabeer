// Makes "Table of Contents" lists in blog posts clickable.
//
// Posts are written in the admin editor, and their tables of contents come in two broken forms:
// 1. Links (href="#introduction") pointing to ids that were never added to the headings.
//    -> add the missing id to the heading whose text matches the link text.
// 2. Plain list items with no links at all (e.g. "Understanding the Gallbladder").
//    -> link each item to the matching section heading that follows the list.

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

// Loose key for matching a TOC entry to its heading:
// "1. What Causes Problems?" and "What Causes Problems" -> "what causes problems";
// "Frequently Asked Questions (FAQs)" -> "frequently asked questions".
const matchKey = (s: string) =>
    decode(s)
        .replace(/^\d+[.)]\s*/, '')
        .replace(/\s*\([^)]*\)\s*$/, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

const slugify = (s: string) => matchKey(s).replace(/\s+/g, '-').slice(0, 80) || 'section';

const TOC_TITLES = new Set(['table of contents', 'contents', 'in this article']);
const HEADING_RE = /<(h[1-6])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi;

function linkPlainTocItems(html: string): string {
    const toc = [...html.matchAll(HEADING_RE)].find((m) => TOC_TITLES.has(matchKey(m[3])));
    if (!toc || toc.index === undefined) return html;

    // The list directly after the "Table of Contents" heading.
    const afterToc = toc.index + toc[0].length;
    const list = /^\s*<(ol|ul)\b[^>]*>([\s\S]*?)<\/\1>/i.exec(html.slice(afterToc));
    if (!list) return html;
    const listStart = afterToc + list[0].indexOf('<');
    const listEnd = afterToc + list[0].length;

    const existingIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

    // Section headings that come after the list.
    const headings = [...html.slice(listEnd).matchAll(HEADING_RE)].map((m) => ({
        start: listEnd + (m.index ?? 0),
        full: m[0],
        tag: m[1],
        attrs: m[2] || '',
        inner: m[3],
        key: matchKey(m[3]),
        id: /\sid="([^"]+)"/.exec(m[2] || '')?.[1] || '',
        used: false,
    }));

    const matches = (headingKey: string, itemKey: string) =>
        headingKey === itemKey ||
        (itemKey.length >= 3 && (headingKey.startsWith(itemKey) || itemKey.startsWith(headingKey)));

    let cursor = 0;
    let linked = 0;
    const newList = list[0].slice(list[0].indexOf('<')).replace(
        /<li\b([^>]*)>([\s\S]*?)<\/li>/gi,
        (full, liAttrs: string, inner: string) => {
            if (/<a\b/i.test(inner)) return full;
            const itemKey = matchKey(inner);
            if (!itemKey) return full;

            // Prefer the next heading in document order, then any unused match.
            let i = headings.findIndex((h, idx) => idx >= cursor && !h.used && matches(h.key, itemKey));
            if (i === -1) i = headings.findIndex((h) => !h.used && matches(h.key, itemKey));
            if (i === -1) return full;

            const heading = headings[i];
            heading.used = true;
            cursor = i + 1;
            if (!heading.id) {
                let id = slugify(heading.inner);
                for (let n = 2; existingIds.has(id); n++) id = `${slugify(heading.inner)}-${n}`;
                existingIds.add(id);
                heading.id = id;
            }
            linked++;

            // Keep any wrapping <p> outside the link: <li><p><a href="#id">text</a></p></li>
            const wrapped = inner.replace(
                /^(\s*(?:<p\b[^>]*>)?)([\s\S]*?)((?:<\/p>)?\s*)$/i,
                (_m, open: string, text: string, close: string) => `${open}<a href="#${heading.id}">${text}</a>${close}`,
            );
            return `<li${liAttrs}>${wrapped}</li>`;
        },
    );
    if (linked === 0) return html;

    // Rebuild: content before the list, the linked list, then headings with their new ids.
    let rest = html.slice(listEnd);
    for (const h of [...headings].reverse()) {
        if (!h.used || /\sid="/.test(h.attrs)) continue;
        const at = h.start - listEnd;
        rest = rest.slice(0, at) + `<${h.tag} id="${h.id}"${h.attrs}>${h.inner}</${h.tag}>` + rest.slice(at + h.full.length);
    }
    return html.slice(0, listStart) + newList + rest;
}

function addMissingAnchorIds(html: string): string {
    if (!html.includes('href="#')) return html;

    const existingIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const wanted = new Map<string, string>(); // heading text -> id
    for (const m of html.matchAll(/<a\b[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
        const id = m[1];
        if (!existingIds.has(id)) wanted.set(decode(m[2]), id);
    }
    if (wanted.size === 0) return html;

    return html.replace(HEADING_RE, (full, tag: string, attrs = '', inner: string) => {
        if (/\sid="/.test(attrs)) return full;
        const id = wanted.get(decode(inner));
        if (!id) return full;
        wanted.delete(decode(inner)); // first matching heading only
        return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
    });
}

export function linkTocHeadings(html: string): string {
    if (!html) return html;
    return addMissingAnchorIds(linkPlainTocItems(html));
}
