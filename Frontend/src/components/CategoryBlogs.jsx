
import React, { useState, useEffect, useRef } from 'react';
import Loading from './Loading';
import BlogCard from './BlogCard';
import Masonry from 'react-masonry-css';
import { useFetch } from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 1
};

const ITEMS_PER_LOAD = 6;

const CategoryBlogs = () => {
    const { category } = useParams();
    const { data: blogData, loading, error } = useFetch(`${API_END_POINT}/blogs/get-related-blogs/${category}`, {
        method: 'get',
        credentials: 'include'
    },[category]); 

    const [visibleBlogs, setVisibleBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);

    // Load visible blogs when blogData or page changes
    useEffect(() => {
        if (blogData?.blogs) {
            const nextBlogs = blogData.blogs.slice(0, page * ITEMS_PER_LOAD);
            setVisibleBlogs(nextBlogs);
        }
    }, [page, blogData]);

    // Observe the loader after blogData is loaded
    useEffect(() => {
        if (!blogData?.blogs) return;

        const observer = new IntersectionObserver(
            entries => {
                if (
                    entries[0].isIntersecting &&
                    blogData.blogs.length > visibleBlogs.length
                ) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) observer.observe(currentLoader);

        return () => {
            if (currentLoader) observer.unobserve(currentLoader);
        };
    }, [blogData, visibleBlogs]);

    if (loading) return <Loading />;
    if (error) return <div>Error loading blogs</div>;

    return (
        <div className="md:mt-18 mt-16">
        
            {visibleBlogs.length > 0 ? (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {visibleBlogs.map((blog, index) => (
                        <BlogCard key={blog._id || index} blog={blog} />
                    ))}
                </Masonry>
            ) : (
                <div>No Blogs Uploaded</div>
            )}
            {visibleBlogs.length < blogData?.blogs?.length && (
                <div ref={loaderRef} className="text-center py-6">
                    Loading more...
                </div>
            )}
        </div>
    );
};

export default CategoryBlogs;

