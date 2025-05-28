import { useFetch } from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { toast } from 'sonner';

const CommentCount = ({ blogId }) => {
    const { data: commentCount, loading, error } = useFetch(`${API_END_POINT}/blogs/comments/count/${blogId}`, {
            method: 'get',
            credentials: 'include'
        }, []);

    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    const { user } = useSelector(state => state?.user);

    const { data: blogLikeCount } = useFetch(`${API_END_POINT}/blogs/${blogId}/${user._id}/likes/count`, {
        method: 'get',
        credentials: 'include',
    });

    useEffect(() => {
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likeCount)
            setHasLiked(blogLikeCount.liked)
        }
    }, [blogLikeCount])

    const handleLikeClick = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/blogs/${blogId}/like`, { withCredentials: 'include' });
            if (res.data.success) {
                setLikeCount(res.data.likeCount);
                setHasLiked(!hasLiked)
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

  return (
    <div className='flex items-center gap-2'>
          <button  className='flex gap-1 cursor-pointer items-center justify-between'><FaRegComment />{commentCount?.count}</button>
          <button
              className='flex gap-1 cursor-pointer items-center justify-between'
              onClick={handleLikeClick}
          >
              {!hasLiked ? <FaRegHeart/>:<FaHeart color='red' />}
              {likeCount}
          </button>
    </div>
  )
}

export default CommentCount
