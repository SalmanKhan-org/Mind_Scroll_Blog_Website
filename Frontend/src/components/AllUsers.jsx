import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import userIcon from '../assets/images/user.png'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { FaRegTrashAlt } from 'react-icons/fa'
import { toast } from 'sonner'
import { useFetch } from '@/hooks/useFetch'
import Loading from './Loading'
import { API_END_POINT } from '@/utils/constant'
import { Avatar, AvatarImage } from './ui/avatar'
import axios from 'axios'

const AllUsers = () => {
    const [refresh, setRefresh] = useState(false);
    const { data: users, loading, error } = useFetch(`${API_END_POINT}/users/get/all`, {
        method: 'get',
        credentials: 'include'
    }, [refresh]);

    const handleDeleteUser = async (id) => {
        const c = confirm("Are you sure to delete this User")
        if (c) {
            try {
                const response = await axios.delete(`${API_END_POINT}/users/${id}`, {
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
        <div className='mt-16 md:mt-18'>
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-3 text-xl font-semibold text-violet-500 border-b pb-3 pl-2 '>
                        <h1>All Users</h1>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                      
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role</TableHead>
                                <TableHead>Name </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.allUsers && users?.allUsers?.length > 0 ?
                                users?.allUsers?.map((user, index) => {
                                    return (
                                        <TableRow key={user._id + index}>
                                            <TableCell>{user?.role}</TableCell>
                                            <TableCell>{user?.name}</TableCell>
                                            <TableCell >{user?.email}</TableCell>
                                            <TableCell >
                                                <Avatar>
                                                    <AvatarImage src={user?.avatar || userIcon}></AvatarImage>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell >{user?.createdAt.split('T')[0]}</TableCell>
                                            <TableCell className={'flex gap-2'}>
                                                <Button onClick={() => handleDeleteUser(user?._id)}
                                                    variant={'outline'} className={'cursor-pointer hover:bg-violet-500 hover:text-white transition-colors duration-300'}>
                                                    <FaRegTrashAlt />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) :
                                <TableRow>
                                    <TableCell colSpan="3">
                                        Users not Found
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default AllUsers
