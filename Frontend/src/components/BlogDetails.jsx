
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading';
import userIcon from '../assets/images/user.png';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { decode } from 'entities';
import Comment from './Comment';
import CommentCount from './CommentCount';
import RelatedBlogs from './RelatedBlogs';
import { useFetch } from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/constant';

const BlogDetails = () => {
    const { slug } = useParams();
    const { data: blogData, loading, error } = useFetch(`${API_END_POINT}/blogs/get/${slug}`, {
                method: 'get',
                credentials: 'include'
    }, [slug]);
    if (loading) {
        return <Loading/>
    }
  return (
      <div className='flex flex-col md:flex-row justify-between gap-5 mt-14 md:mt-18 '>
          {blogData?.singleBlog && (
              <div className='border md:ml-2 rounded md:w-[70%] w-full p-5'>
                  <h1 className='text-xl font-semibold mb-5'>{blogData?.singleBlog?.title}</h1>
                  <div className='flex items-center justify-between'>
                      <div className='flex items-start gap-2 justify-between'>
                          <Avatar className='w-16 h-16'>
                              <AvatarImage src={blogData?.singleBlog?.author?.avatar || userIcon} className='w-full h-full rounded-full'></AvatarImage>
                          </Avatar>
                          <div>
                              <span className='font-semibold'>{blogData?.singleBlog?.author?.name}</span>
                              <p className='text-xs'>{blogData?.singleBlog.createdAt.split('T')[0] }</p>
                          </div>
                      </div>
                      <div className='flex items-start gap-2 justify-between'>
                          <CommentCount blogId={blogData?.singleBlog?._id} />
                       </div>
                  </div>
                  <div className='my-5'>
                      <img src={blogData?.singleBlog?.image} alt="" className='rounded w-full'/>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: decode(blogData?.singleBlog?.blogContent) || ''} } className='bg-white'>
                      
                  </div>
                  <div className='border-t mt-5 pt-5'><Comment blog={blogData?.singleBlog } /></div>
              </div>
          )}
          
          <div className='border rounded md:w-[30%] w-full mr-2'>
              <RelatedBlogs category={blogData?.singleBlog?.category?._id} blogId={blogData?.singleBlog?._id} />
          </div>
    </div>
  )
}

export default BlogDetails
