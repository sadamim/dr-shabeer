// src/app/blogs/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { linkTocHeadings } from '@/lib/utils/linkTocHeadings';
import { getPostBySlug } from '@/lib/getPostBySlug';
import { Metadata } from 'next';
import BariatricBanner from '@/components/BreadcrumbBanner';
import { normalizeSlug } from '@/lib/utils/slug';

export type BlogPostProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post: any = await getPostBySlug(slug);

        if (!post) {
            return {
                title: "Blog Post Not Found",
                description: "The requested blog post could not be found.",
            };
        }

        return {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.content.substring(0, 160),
            openGraph: {
                title: post.metaTitle || post.title,
                description: post.metaDescription || post.content.substring(0, 160),
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${normalizeSlug(post.slug)}`,
                siteName: "Dr. Shabeer Ahmed | Gastroenterologist",
                images: [
                    {
                        url: post.imageUrl.startsWith('http')
                            ? post.imageUrl
                            : `${process.env.NEXT_PUBLIC_SITE_URL}${post.imageUrl}`,
                        width: 800,
                        height: 600,
                        alt: post.title,
                    },
                ],
                locale: 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: post.metaTitle || post.title,
                description: post.metaDescription || post.content.substring(0, 160),
                images: [post.imageUrl],
            },
            keywords: post.metaKeywords?.split(',') || ['health', 'gastro', 'blog'],
            // ✅ Add canonical URL here
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${normalizeSlug(post.slug)}`,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        return {
            title: "Blog Post Not Found",
            description: "The requested blog post could not be found."
        };
    }
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;

    try {
        const post: any = await getPostBySlug(slug);

        if (!post) return notFound();

        return (
            <>
                <BariatricBanner
                    title={post.title}
                    imageSrc="/img/bannerslider/Diarrhea BANNER.webp"
                />
                <div className="container my-5">
                   
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full rounded"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        {new Date(post.date).toLocaleDateString()}
                    </p>
                    <div className='mt-4 ds-blog-content' dangerouslySetInnerHTML={{ __html: linkTocHeadings(post.content || '') }} />
                </div>
            </>

        );
    } catch (error) {
        console.error('Error fetching post:', error);
        return notFound();
    }
}
