
import React from 'react'
import { useSelector } from 'react-redux';
import Loading from './Loading';
import { Avatar, AvatarImage } from './ui/avatar';
import userIcon from '../assets/images/user.png';
import { useFetch } from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/constant';

const CommentList = ({ blog_id, comment }) => {
    const { user } = useSelector(state => state?.user);
    const { data: comments, loading, error } = useFetch(`${API_END_POINT}/blogs/comments/${blog_id}`, {
        method: 'get',
        credentials: 'include'
    }, []);

    if(loading) return <Loading/>
  return (
    <div> 
          <h4 className='md:text-xl text-lg font-semibold'>{
              comment ? <>{comments?.allComments && comments?.allComments.length + 1}</> :
                  <>{comments?.allComments && comments?.allComments.length}</>
          } Comments</h4>
          <div className='md:mt-5 mt-3'>
              {comment && (
                  <div className='flex gap-2  mt-2'>
                      <Avatar>
                          <AvatarImage src={user?.avatar || userIcon} />
                      </Avatar>
                      <div>
                          <p className='text-base'>{user?.name}</p>
                          <p className='text-xs'>{comment?.createdAt.split('T')[0]}</p>
                          <div className='pt-2'>{comment?.comment}</div>
                      </div>
                  </div>
              ) }
              {comments?.allComments && comments?.allComments?.length > 0 && (
                  comments?.allComments?.map((val, index) => {
                      return (
                          <div key={val._id} className='flex gap-2  mt-2'>
                              <Avatar>
                                  <AvatarImage src={val?.author?.avatar || userIcon} />
                              </Avatar>
                              <div>
                                  <p className='text-base'>{val?.author?.name}</p>
                                  <p className='text-xs'>{val?.createdAt.split('T')[0]}</p>
                                  <div className='pt-2'>{ val?.comment}</div>
                              </div>
                          </div>
                      )
                  })
              )}
          </div>
    </div>
  )
}

export default CommentList
