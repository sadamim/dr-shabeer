'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import BariatricBanner from '@/components/BreadcrumbBanner';

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  date?: string;
  excerpt?: string;
  content?: string;
};

type BlogPageProps = {
  initialPosts?: BlogPost[];
};

export default function BlogPage({ initialPosts = [] }: BlogPageProps) {
  const hasInitialPosts = initialPosts.length > 0;
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(!hasInitialPosts);

  useEffect(() => {
    if (hasInitialPosts) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');

        const blogData = Array.isArray(res.data)
          ? res.data
          : res.data.posts || res.data.data || [];

        setPosts(blogData);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [hasInitialPosts]);

  return (
    <>
      <BariatricBanner
        title="Latest Blogs"
        imageSrc="/img/bannerslider/Diarrhea BANNER.webp"
      />

      <div className="container my-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p>Loading blogs...</p>
          </div>
        ) : (
          <div className="row blog-grid-row">
            {posts.length > 0 ? (
              posts.map((post) => {
                const imageUrl = post.imageUrl || '/img/placeholder.jpg';

                return (
                  <div key={post._id || post.slug} className="col-md-4 col-sm-12 mb-4">
                    <div className="blog grid-blog border rounded shadow-sm overflow-hidden h-100">
                      <div className="blog-image">
                        <Link href={`/blogs/${post.slug}`}>
                          <Image
                            src={imageUrl}
                            alt={post.title || 'Blog image'}
                            width={600}
                            height={400}
                            className="img-fluid"
                          />
                        </Link>
                      </div>

                      <div className="blog-content p-3">
                        <ul className="entry-meta meta-item list-inline mb-2 small text-muted">
                          <li className="list-inline-item">
                            <i className="far fa-clock me-1"></i>{' '}
                            {post.date
                              ? new Date(post.date).toLocaleDateString()
                              : 'No date'}
                          </li>
                        </ul>

                        <h3 className="blog-title h5">
                          <Link
                            href={`/blogs/${post.slug}`}
                            className="text-decoration-none text-dark fw-bold"
                          >
                            {post.title}
                          </Link>
                        </h3>

                        <p className="mb-0 text-truncate-2-lines">
                          {post.excerpt ||
                            post.content?.replace(/<[^>]+>/g, '').substring(0, 100) ||
                            'Read our latest health article'}
                          ...
                        </p>

                        <Link
                          href={`/blogs/${post.slug}`}
                          className="btn btn-link mt-2 p-0 text-primary"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <h4 className="text-muted">No blog posts found.</h4>
                <p className="text-secondary">
                  We couldn't find any blog posts at the moment.
                </p>
              </div>
            )}
          </div>
        )}

        {!loading && posts.length > 0 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <span className="page-link">Previous</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Next</span>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
