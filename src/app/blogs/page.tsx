import BlogPage from "./blogs";
import type { BlogPost } from "./blogs";
import { connectDB } from '@/lib/connectDB';
import Post from '@/modal/Post';

const excerptFromContent = (content?: string) =>
  content?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().substring(0, 100) || '';

export const metadata = {
  title: 'Latest Health Blogs And Medical Information | Dr Shabeer Ahmed',
  description:
    'Latest Health Blogs & Medical Info | Get expert insights and medical updates from Dr. Shabeer Ahmed to stay informed and improve your health and wellness effectively.',
  keywords:
    'Liver Cancer Surgery Specialist Bangalore, Liver Disease Specialist in Bangalore, Liver Surgery Specialist Bangalore',
  alternates: {
    canonical: 'https://drshabeerahmed.in/blogs',
  },
  openGraph: {
    title: 'Latest Health Blogs And Medical Information | Dr Shabeer Ahmed',
    description:
      'Latest Health Blogs & Medical Info | Get expert insights and medical updates from Dr. Shabeer Ahmed to stay informed and improve your health and wellness effectively.',
    url: 'https://drshabeerahmed.in/blogs',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default async function Page() {
  let posts: BlogPost[] = [];

  try {
    await connectDB();

    const blogPosts = await Post.find({ slug: { $exists: true, $ne: '' } })
      .select('title slug imageUrl date excerpt content')
      .sort({ createdAt: -1, date: -1 })
      .lean();

    posts = blogPosts.map((post: any) => ({
      _id: post._id?.toString() || post.slug,
      title: post.title || '',
      slug: post.slug || '',
      imageUrl: post.imageUrl || '',
      date: post.date ? new Date(post.date).toISOString() : '',
      excerpt: post.excerpt || excerptFromContent(post.content),
    }));
  } catch (error) {
    console.error('Failed to load blog posts for /blogs:', error);
  }

  return <BlogPage initialPosts={posts} />;
}
