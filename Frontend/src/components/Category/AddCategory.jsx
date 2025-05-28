import { categorySchema } from '@/Schema/authSchema';
import React, { useEffect } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '../ui/card'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import slugify from 'slugify';
import { LuLoader } from 'react-icons/lu';

const AddCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            slug: ""
        },
    })
    const onSubmit = async (values) => {
        try {
            const response = await axios.post(`${API_END_POINT}/category/new`, values, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: 'include'
            });
            if (response.data.success) {
                form.reset();
                toast.success(response.data.message);
                navigate("/category/details")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const categoryName = form.watch('name');
    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true })
            form.setValue('slug', slug);
        }
    })
    return (
        <div className='md:mt-18 mt-16'>
            <Card className={'w-full max-w-screen-md mx-auto p-5'}>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your category" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} placeholder="category slug..." {...field} />
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
                                    {form.formState.isSubmitting ? "Adding..." : "Add Category"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>

            </Card>
        </div>
    )
}

export default AddCategory
