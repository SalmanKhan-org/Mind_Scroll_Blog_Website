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


const CategoryDetails = () => {
    const [refresh, setRefresh] = useState(false);
    const { data: categories, loading, error } = useFetch(`${API_END_POINT}/category/get/all`, {
        method: 'get',
        credentials: 'include'
    },[refresh]);

    const handleDeleteCategory = async (id) => {
        const c = confirm("Are you sure to delete this category")
        if (c) {
            try {
                const response = await axios.delete(`${API_END_POINT}/category/${id}`, {
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
                    <div>
                        <Button><Link to={'/category/add'}>Add Category</Link></Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of your Added Categories</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories?.allCategories && categories?.allCategories?.length > 0 ?
                                categories?.allCategories?.map((category, index) => {
                                    return (
                                        <TableRow key={category + index}>
                                            <TableCell>{category?.name}</TableCell>
                                            <TableCell>{category?.slug}</TableCell>
                                            <TableCell className={'flex gap-2'}>
                                                <Button asChild variant={'outline'} className={'hover:bg-violet-500 hover:text-white transition-colors duration-300'}>
                                                    <Link to={`/category/edit/${category?._id}`}><FiEdit /></Link>
                                                </Button>
                                                <Button onClick={() => handleDeleteCategory(category?._id)}
                                                    variant={'outline'} className={'cursor-pointer hover:bg-violet-500 hover:text-white transition-colors duration-300'}>
                                                    <FaRegTrashAlt />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) :
                                <TableRow>
                                    <TableCell colSpan="3">
                                        Categories not Found
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default CategoryDetails
