// src/app/api/posts/route.ts

import { connectDB } from '@/lib/connectDB';
import Post from '@/modal/Post';
import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/utils/cloudinary';

// =========================
// GET POSTS
// =========================
export async function GET(req: NextRequest) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get('slug');
        const id = searchParams.get('id');

        let post;

        // Get by slug
        if (slug) {
            post = await Post.findOne({ slug });
        }

        // Get by id
        else if (id) {
            post = await Post.findById(id);
        }

        // Get all posts
        else {
            post = await Post.find().sort({ createdAt: -1 });
        }

        if (!post) {
            return NextResponse.json(
                { success: false, message: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: post },
            { status: 200 }
        );

    } catch (error) {
        console.error('GET /api/posts error:', error);

        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// =========================
// CREATE POST
// =========================
export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;

        const content = formData.get('content') as string;
        const author = formData.get('author') as string;
        const category = formData.get('category') as string;

        const image = formData.get('image') as File | null;

        const metaTitle = (formData.get('metaTitle') as string) || '';
        const metaKeywords = (formData.get('metaKeywords') as string) || '';
        const metaDescription = (formData.get('metaDescription') as string) || '';

        // Validation
        if (!title || !content || !category) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Title, content and category are required',
                },
                { status: 400 }
            );
        }

        // Check existing slug
        const existingPost = await Post.findOne({ slug });

        if (existingPost) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Slug already exists',
                },
                { status: 400 }
            );
        }

        let imageUrl = '';

        // Upload image
        if (image && image.size > 0) {
            const buffer = Buffer.from(await image.arrayBuffer());

            const result = await uploadToCloudinary(buffer, 'blogs');

            imageUrl = result.secure_url;
        }

        // Create new post
        const newPost = new Post({
            title,
            slug,
            // content,
            author,
            category,
            imageUrl,
            metaTitle,
            metaKeywords,
            metaDescription,
        });

        await newPost.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Post created successfully',
                post: newPost,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('POST /api/posts error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create post',
            },
            { status: 500 }
        );
    }
}

// =========================
// UPDATE POST
// =========================
export async function PUT(req: NextRequest) {
    await connectDB();

    try {
        const formData = await req.formData();

        const id = formData.get('id') as string;

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;

        const content = formData.get('content') as string;
        const author = formData.get('author') as string;
        const category = formData.get('category') as string;

        const image = formData.get('image') as File | null;

        const metaTitle = (formData.get('metaTitle') as string) || '';
        const metaKeywords = (formData.get('metaKeywords') as string) || '';
        const metaDescription = (formData.get('metaDescription') as string) || '';

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Post ID is required',
                },
                { status: 400 }
            );
        }

        const updateData: any = {
            title,
            slug,
            content,
            author,
            category,
            metaTitle,
            metaKeywords,
            metaDescription,
        };

        // Upload new image
        if (image && image.size > 0) {
            const buffer = Buffer.from(await image.arrayBuffer());

            const result = await uploadToCloudinary(buffer, 'blogs');

            updateData.imageUrl = result.secure_url;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
            }
        );

        if (!updatedPost) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Post not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Post updated successfully',
                post: updatedPost,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('PUT /api/posts error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update post',
            },
            { status: 500 }
        );
    }
}