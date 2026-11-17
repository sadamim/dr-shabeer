import { connectDB } from '@/lib/connectDB';
import Post from '@/modal/Post';
import { normalizeSlug } from '@/lib/utils/slug';

// Finds a post by slug, also matching slugs saved with stray slashes (e.g. "/my-post/").
export async function getPostBySlug(rawSlug?: string | null) {
    const slug = normalizeSlug(rawSlug);
    if (!slug) return null;

    await connectDB();

    return (
        (await Post.findOne({ slug }).lean()) ||
        (await Post.findOne({ slug: { $in: [`/${slug}`, `${slug}/`, `/${slug}/`] } }).lean())
    );
}
