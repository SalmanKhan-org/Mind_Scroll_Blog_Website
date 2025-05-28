import React, { useState } from 'react'
import { FaComment } from 'react-icons/fa'
import {  commentSchema } from '@/Schema/authSchema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,    FormMessage,
} from "@/components/ui/form"
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { LuLoader } from 'react-icons/lu';
import { Textarea } from './ui/textarea';
import { useDispatch } from 'react-redux';
import CommentList from './CommentList';

const Comment = ({ blog }) => {
    const [newComment, setNewComment] = useState();
    const dispatch = useDispatch();
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: ""
        },
    })
    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append('comment', values?.comment);
        formData.append('blogId', blog?._id);
        try {
            const response = await axios.post(`${API_END_POINT}/blogs/comments/new`, formData, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: 'include'
            });
            if (response?.data.success) {
                setNewComment(response.data?.comment);
                form.reset();
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
  return (
    <div>
          <h4 className='flex items-center gap-2 text-xl font-semibold'> <FaComment className='text-violet-500' /> Comment  </h4>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                  <div className='mb-3'>
                      <FormField
                          control={form.control}
                          name="comment"
                          render={({ field }) => (
                              <FormItem>
                                  <FormControl>
                                      <Textarea placeholder="Enter your comment" {...field} />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                  </div>
                  <div className='mt-5'>
                      <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? (
                              <LuLoader className="animate-spin mr-2 h-4 w-4" />
                          ) : null}
                          {form.formState.isSubmitting ? "Adding..." : "Add Comment"}
                      </Button>
                  </div>
              </form>
          </Form>
          <div className='border-t mt-5 pt-5'><CommentList blog_id = {blog._id} comment={newComment} /></div>
    </div>
  )
}

export default Comment
