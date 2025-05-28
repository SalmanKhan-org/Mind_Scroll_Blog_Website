import { useFetch } from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/constant';
import React from 'react'
import Loading from './Loading';
import { Link } from 'react-router-dom';


const RelatedBlogs = ({ category, blogId }) => {
    const { data: blogData, loading, error } = useFetch(`${API_END_POINT}/blogs/get-related-blogs/${category}`, {
            method: 'get',
            credentials: 'include'
    },[category]);
    
   if(loading) return <Loading/>
    
  return (
    <div className='p-2'>
      {blogData?.blogs && blogData?.blogs?.length > 0 && (<h2 className='text-lg font-semibold '>Related Blogs</h2>)}
          <div className='overflow-y-auto overflow-hidden'>
              {blogData?.blogs && blogData?.blogs?.length > 0 && 
                  blogData?.blogs?.map((blog, index) => blog._id !== blogId ? <Link to={`http://localhost:5173/blog/${blog?.category?.name}/${blog?.slug}`} key={index + blog.__id} className='flex items-center gap-2 '>
                      <img key={"image"} src={blog?.image} alt="blog Image" className='w-28 h-28 object-scale-down rounded'/>
                      <h1 className='line-clamp-2 text-base font-semibold hover:underline'>{blog?.title }</h1>
                  </Link>:<></> )}
          </div>
    </div>
  )
}

export default RelatedBlogs
