import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { FaRegTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'sonner'
import { useFetch } from '@/hooks/useFetch'
import Loading from './Loading'
import { API_END_POINT } from '@/utils/constant'

const AllComments = () => {
    const [refresh, setRefresh] = useState(false);
    const { data: comments, loading, error } = useFetch(`${API_END_POINT}/comments/get/all`, {
        method: 'get',
        credentials: 'include'
    },[refresh]);

    const handleDeleteComment = async (id) => {
        const c = confirm("Are you sure to delete this Comment")
        if (c) {
            try {
                const response = await axios.delete(`${API_END_POINT}/comments/${id}`, {
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
        return <Loading />
    }
    return (
        <div className='mt-16 md:mt-18 w-full'>
            <Card className={'w-full'}>
                <CardHeader>
                    <div className='flex items-center gap-3 text-xl font-semibold text-violet-500 border-b pb-3 pl-2 '>
                        <h1>All Comments</h1>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Comments done by Users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Blog</TableHead>
                                <TableHead>Comment By</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comments?.allComments && comments?.allComments?.length > 0 ?
                                comments?.allComments?.map((comment, index) => {
                                    return (
                                        <TableRow key={comment._id + index}>
                                            <TableCell>{comment?.blog?.title}</TableCell>
                                            <TableCell>{comment?.author?.name}</TableCell>
                                            <TableCell >{comment?.comment}</TableCell>
                                            <TableCell className={'flex gap-2'}>
                                                <Button onClick={() => handleDeleteComment(comment?._id)}
                                                    variant={'outline'} className={'cursor-pointer hover:bg-violet-500 hover:text-white transition-colors duration-300'}>
                                                    <FaRegTrashAlt />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) :
                                <TableRow>
                                    <TableCell colSpan="3">
                                        Comments not Found
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default AllComments
