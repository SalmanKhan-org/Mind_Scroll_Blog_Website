import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from '../Loading'
import { FiEdit } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'sonner'
import { API_END_POINT } from '@/utils/constant'
import { useFetch } from '@/hooks/useFetch'

const BlogsDetails = () => {
    const [refresh, setRefresh] = useState(false);
    const { data: blogData, loading, error } = useFetch(`${API_END_POINT}/blogs/user/get/all`, {
            method: 'get',
            credentials: 'include'
        },[refresh]);

    const handleDeleteBlog = async(id) => {
        const c = confirm("Are you sure to delete this blog")
        if (c) {
            try {
                const response = await axios.delete(`${API_END_POINT}/blogs/${id}`, {
                    withCredentials: true,
                });
                if (response?.data?.success) {
                    toast.success(response?.data?.message);
                    setRefresh(!refresh);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }

    if (loading) {
        return <Loading/>
    }
  return (
      <div className='mt-16 md:mt-18'>
          <Card>
              <CardHeader>
                  <div>
                      <Button><Link to={'/blog/add'}>Add Blog</Link></Button>
                  </div>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableCaption>A list of your Added Blogs</TableCaption>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Author</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Slug</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Action</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {blogData?.allBlogs && blogData?.allBlogs?.length > 0 ?
                              blogData?.allBlogs?.map((blog, index) => {
                                  return (
                                      <TableRow key={blog + index}>
                                      <TableCell>{blog?.author?.name}</TableCell>
                                          <TableCell>{blog?.category?.name}</TableCell>
                                          <TableCell >{blog?.title}</TableCell>
                                          <TableCell >{blog?.slug}</TableCell>
                                          <TableCell>{blog?.createdAt.split('T')[0]}</TableCell>
                                          <TableCell className={'flex gap-2'}>
                                              <Button asChild variant={'outline'} className={'hover:bg-violet-500 hover:text-white transition-colors duration-300'}>
                                                  <Link to={`/blog/edit/${blog?._id}`}><FiEdit /></Link>
                                              </Button>
                                              <Button onClick={() => handleDeleteBlog(blog?._id)}
                                                  variant={'outline'} className={'cursor-pointer hover:bg-violet-500 hover:text-white transition-colors duration-300'}>
                                                  <FaRegTrashAlt />
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  )
                              }) :
                              <TableRow>
                                  <TableCell colSpan="3">
                                      Data not Found
                                  </TableCell>
                              </TableRow>}
                      </TableBody>
                  </Table>

              </CardContent>
          </Card>
      </div>
  )
}

export default BlogsDetails
