import { connectDB } from '@/lib/connectDB';
import Post from '@/modal/Post';
import { normalizeSlug } from '@/lib/utils/slug';

export type LibraryPost = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  date: string;
  category: string;
  excerpt: string;
  readingMinutes: number | null;
};

const stripHtml = (html?: string) =>
  (html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** Latest blog posts for the homepage Gut Health Library (server only). */
export async function getFeaturedPosts(limit = 24): Promise<LibraryPost[]> {
  try {
    await connectDB();
    const posts = await Post.find({ slug: { $exists: true, $ne: '' } })
      .select('title slug imageUrl date category content metaDescription')
      .sort({ date: -1, _id: -1 })
      .limit(limit)
      .lean();

    return (posts as any[]).map((post) => {
      const text = stripHtml(post.content);
      const words = text ? text.split(' ').length : 0;
      return {
        id: post._id?.toString() || post.slug,
        title: post.title || '',
        slug: normalizeSlug(post.slug),
        imageUrl: post.imageUrl || '',
        date: post.date ? new Date(post.date).toISOString() : '',
        category: (post.category || '').trim(),
        excerpt: (post.metaDescription || text).substring(0, 160),
        readingMinutes: words > 0 ? Math.max(1, Math.round(words / 200)) : null,
      };
    });
  } catch (error) {
    console.error('Failed to load posts for the Gut Health Library:', error);
    return [];
  }
}
