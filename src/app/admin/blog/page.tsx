'use client'

import React, { useEffect, useState } from 'react';
import BariatricBanner from '@/components/BreadcrumbBanner';
import Link from 'next/link';
import axios from 'axios';

interface Blog {
    _id: string;
    title: string;
    author: string;
    category: string;
}

export default function BlogListPage() {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [search, setSearch] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    // =========================
    // FETCH BLOGS
    // =========================
    const fetchBlogs = async () => {

        try {

            const res = await axios.get('/api/posts');

            // IMPORTANT FIX
            const posts = res.data.data;

            setBlogs(posts || []);
            setFilteredBlogs(posts || []);

        } catch (err) {

            console.error('Failed to fetch blogs:', err);

        } finally {

            setLoading(false);
        }
    };

    // =========================
    // FETCH ON MOUNT
    // =========================
    useEffect(() => {
        fetchBlogs();
    }, []);

    // =========================
    // SEARCH FILTER
    // =========================
    useEffect(() => {

        const filtered = blogs.filter((blog) =>
            blog.title?.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredBlogs(filtered);

    }, [search, blogs]);

    // =========================
    // DELETE BLOG
    // =========================
    const handleDelete = async (id: string) => {

        const confirmDelete = confirm(
            'Are you sure you want to delete this blog?'
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(`/api/posts/${id}`);

            alert('Blog deleted successfully');

            fetchBlogs();

        } catch (err) {

            console.error('Delete error:', err);

            alert('Failed to delete blog.');
        }
    };

    return (
        <>
            <BariatricBanner
                title="Blog List"
                imageSrc="/img/bannerslider/Surgery For Reflux 2.webp"
            />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="mb-0">
                        Blog Posts
                    </h2>

                    <Link
                        href="/admin/blog/blog-form"
                        className="btn btn-success"
                    >
                        + Add Blog
                    </Link>

                </div>

                {/* SEARCH */}
                <div className="mb-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* LOADING */}
                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <p className="mt-2">
                            Loading blogs...
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        {/* COUNT */}
                        <div className="mb-3 text-muted">

                            Showing {filteredBlogs.length} of {blogs.length} Blogs

                        </div>

                        <table className="table table-hover table-striped table-bordered">

                            <thead className="table-dark">

                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th style={{ width: '160px' }}>
                                        Actions
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredBlogs.length > 0 ? (

                                    filteredBlogs.map((post) => (

                                        <tr key={post._id}>

                                            <td>{post.title}</td>

                                            <td>{post.author}</td>

                                            <td>{post.category}</td>

                                            <td>

                                                <div
                                                    className="btn-group"
                                                    role="group"
                                                >

                                                    <Link
                                                        href={`/admin/blog/blog-form?id=${post._id}`}
                                                        className="btn btn-sm btn-warning me-2"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(post._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="text-center text-muted"
                                        >
                                            No blogs found.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>
                )}
            </div>
        </>
    );
}