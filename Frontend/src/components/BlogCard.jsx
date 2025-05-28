import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaRegCalendarAlt, FaRegComment, FaRegHeart } from "react-icons/fa";
import userIcon from '../assets/images/user.png'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';
import { useFetch } from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/constant';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';


const BlogCard = ({ blog }) => {
    const [like, setLike] = useState(false);
    const { data: commentCount, loading, error } = useFetch(`${API_END_POINT}/blogs/comments/count/${blog?._id}`, {
            method: 'get',
            credentials: 'include'
    }, []);


    const { user, isLoggedIn } = useSelector(state => state?.user);
    
     const { data: blogLikeCount } = useFetch(`${API_END_POINT}/blogs/${blog?._id}/likes/all`, {
        method: 'get',
        credentials: 'include',
     }, [like]);
    
    const handleLikeClick = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
           toast.error("Please login to like") 
        } else {

            try {
                const res = await axios.get(`${API_END_POINT}/blogs/${blog?._id}/like`, { withCredentials: 'include' });
                if (res.data.success) {
                    setLike(!like);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }
    
    
  return (
      <Link to={`/blog/${blog?.category?.name}/${blog?.slug}`}>
          <Card className={'pt-5 m-1'}>
              <CardContent>
                  <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 justify-between'>
                          <Avatar>
                              <AvatarImage src={blog?.author?.avatar || userIcon}></AvatarImage>
                          </Avatar>
                          <div className='flex flex-col'>
                                  <span>{blog?.author?.name}</span>
                              <span className='text-xs'>{formatDistanceToNow(blog?.createdAt, { addSuffix: true })}</span>
                          </div>
                      </div>
                      <div className='flex gap-1'>
                          <button className='flex gap-1 cursor-pointer items-center justify-between'><FaRegComment />{commentCount?.count}</button>
                          <button onClick={handleLikeClick} className='flex gap-1 cursor-pointer items-center justify-between'><FaRegHeart />{blogLikeCount?.likeCount}</button>
                      </div>
                  </div>
                  <div className='my-2'>
                      <img src={blog?.image} alt="" className='w-full h-full rounded' />
                  </div>
                  <div >
                      <p className='flex items-center gap-2 mb-2'>
                          <FaRegCalendarAlt />
                          <span>{blog?.createdAt.split('T')[0]}</span>
                      </p>
                      <h2 className='text-lg font-semibold line-clamp-2'>{blog?.title}</h2>
                  </div>
              </CardContent>
          </Card>
    </Link>
  )
}

export default BlogCard
