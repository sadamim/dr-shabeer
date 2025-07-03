// src/app/api/posts/route.ts
import { connectDB } from '@/lib/connectDB';
import Post from '@/modal/Post';
import { NextRequest } from 'next/server';
import { uploadToCloudinary } from '@/lib/utils/cloudinary';

// GET /api/posts or /api/posts?slug=...
export async function GET(req: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    try {
        let post;

        if (slug) {
            post = await Post.findOne({ slug });
        } else if (id) {
            post = await Post.findById(id);
        } else {
            post = await Post.find().sort({ date: -1 }); // Get all posts
        }

        if (!post) {
            return new Response(
                JSON.stringify({ message: 'Post not found' }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(post), { status: 200 });

    } catch (error) {
        console.error('GET /api/posts error:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}

// POST /api/posts — Create New Blog Post
export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const author = formData.get('author') as string;
        const category = formData.get('category') as string;
        const image = formData.get('image') as File | null;
        const metaTitle = formData.get('metaTitle') as string || '';
        const metaKeywords = formData.get('metaKeywords') as string || '';
        const metaDescription = formData.get('metaDescription') as string || '';

        let imageUrl = '';

        if (image) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const result: any = await uploadToCloudinary(buffer, 'blogs');
            imageUrl = result.secure_url; // Cloudinary se mila URL
        }

        const slug = title.toLowerCase().replace(/\s+/g, '-');

        const newPost = new Post({
            title,
            content,
            author,
            category,
            imageUrl,
            slug,
            metaTitle,
            metaKeywords,
            metaDescription,
        });

        await newPost.save();

        return new Response(JSON.stringify({ success: true, post: newPost }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({ message: 'Failed to create post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// PUT /api/posts — Update Existing Blog Post
export async function PUT(req: NextRequest) {
    await connectDB();

    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const author = formData.get('author') as string;
        const category = formData.get('category') as string;
        const image = formData.get('image') as File | null;
        const metaTitle = formData.get('metaTitle') as string || '';
        const metaKeywords = formData.get('metaKeywords') as string || '';
        const metaDescription = formData.get('metaDescription') as string || '';

        const slug = title.toLowerCase().replace(/\s+/g, '-');

        const updateData: any = {
            title,
            content,
            author,
            category,
            slug,
            metaTitle,
            metaKeywords,
            metaDescription,
        };

        // Agar nayi image upload ki gai hai
        if (image) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const result: any = await uploadToCloudinary(buffer);
            updateData.imageUrl = result.secure_url;
        }

        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPost) {
            return new Response(JSON.stringify({ message: 'Post not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(updatedPost), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('PUT /api/posts error:', error);
        return new Response(JSON.stringify({ message: 'Failed to update post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}