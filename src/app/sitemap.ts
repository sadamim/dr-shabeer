import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/connectDB';
import Page from '@/modal/Page';
import Post from '@/modal/Post';

export const revalidate = 3600;

const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
const SITE_URL = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configuredSiteUrl)
    ? 'https://drshabeerahmed.in'
    : configuredSiteUrl || 'https://drshabeerahmed.in';

const staticRoutes = [
    '',
    'united-gut-healthcare',
    'robotic-surgeries',
    'rectal-bleeding-treatment',
    'gut-health-specialis-in-bangalore',
    'best-gastroenterologist-in-bangalore',
    'bariatric-surgery-specialist-bangalore',
    'laparoscopic-surgeon-in-bangalore',
    'proctology-specialist-in-bangalore',
    'specialities',
    'weight-loss-surgeon-bangalore',
    'laser-surgery-doctors-in-bangalore',
    'swallowable-balloon',
    'best-doctors-for-endoscopy-in-bangalore',
    'incisional-hernia',
    'inguinal-hernia',
    'fissure',
    'abdominal',
    'reflux',
    'irritable',
    'cancer-treatment-in-bangalore',
    'stemcell-therapy',
    'Gallbladder-Surgery-Bangalore',
    'piles-treatment-in-bangalore',
    'gastroesophageal',
    'providers',
    'contact',
    'aboutus',
    'dr-meghnad',
    'news-updates',
    'blogs',
    'videos-reels-testimonial',
    'symtomatic-checker',
    'quizes',
    'announcements',
    'liver-disease-specialist-in-bangalore',
    'privacy-policy',
    'stomach-ulcer-surgery-in-bangalore',
    'terms-and-conditions',
];

const routeUrl = (route: string) => `${SITE_URL}${route ? `/${route}` : ''}`;

const encodePathSegment = (segment: string) => encodeURIComponent(segment.trim());

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: routeUrl(route),
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === 'blogs' ? 0.8 : 0.7,
    }));

    try {
        await connectDB();

        const [posts, pages] = await Promise.all([
            Post.find({ slug: { $exists: true, $ne: '' } }).select('slug date').lean(),
            Page.find({ slug: { $exists: true, $ne: '' } }).select('slug').lean(),
        ]);

        const existingUrls = new Set(routes.map((route) => route.url));

        pages.forEach((page: any) => {
            const slug = typeof page.slug === 'string' ? page.slug.trim() : '';
            const url = slug ? routeUrl(encodePathSegment(slug)) : '';

            if (url && !existingUrls.has(url)) {
                existingUrls.add(url);
                routes.push({
                    url,
                    lastModified: now,
                    changeFrequency: 'monthly',
                    priority: 0.7,
                });
            }
        });

        posts.forEach((post: any) => {
            const slug = typeof post.slug === 'string' ? post.slug.trim() : '';
            const url = slug ? routeUrl(`blogs/${encodePathSegment(slug)}`) : '';

            if (url && !existingUrls.has(url)) {
                existingUrls.add(url);
                routes.push({
                    url,
                    lastModified: post.date ? new Date(post.date) : now,
                    changeFrequency: 'weekly',
                    priority: 0.8,
                });
            }
        });
    } catch (error) {
        console.error('Failed to load dynamic sitemap entries:', error);
    }

    return routes;
}
