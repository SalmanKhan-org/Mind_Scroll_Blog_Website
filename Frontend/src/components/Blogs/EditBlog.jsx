import { blogSchema } from '@/Schema/authSchema';
import React, { useEffect, useState } from 'react'
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
import {  useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import slugify from 'slugify';
import { LuLoader } from 'react-icons/lu';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import Dropzone from 'react-dropzone';
import Editor from '../Editor';
import { decode } from 'entities';
import Loading from '../Loading';
import { useFetch } from '@/hooks/useFetch';


const EditBlog = () => {
    const { id } = useParams();
    const { data: blog, loading, error } = useFetch(`${API_END_POINT}/blogs/${id}`, {
                method: 'get',
                credentials: 'include'
    }, [id]);
    const { data: categories } = useFetch(`${API_END_POINT}/category/get/all`, {
            method: 'get',
            credentials: 'include'
        },[]);

    const navigate = useNavigate();
    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            category: "",
            title:  "",
            slug:  "",
            blogContent:""
        },
    });

    const handleEditorData = (event, editor) => {
        const data = editor.getData();
        form.setValue('blogContent',data)
    }
    const onSubmit = async (values) => {
        let formData = new FormData();
        formData.append('category', values.category);
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('blogContent', values.blogContent);
        formData.append('image', file);
        try {
            const response = await axios.put(`${API_END_POINT}/blogs/${id}`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: 'include'
            });
            if (response.data.success) {
                form.reset();
                setFile();
                setFilePreview();
                toast.success(response.data.message);
                navigate("/blogs/details")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const titleName = form.watch('title');
    useEffect(() => {
        if (titleName) {
            const slug = slugify(titleName, { lower: true })
            form.setValue('slug', slug);
        }
    });

    const handleFileSelection = (files) => {
        const file = files[0];
        const preview = URL.createObjectURL(file)
        setFile(file)
        setFilePreview(preview)
    }

    useEffect(() => {
        if (blog?.blog) {
            setFilePreview(blog?.blog?.image)
            form.setValue('category', blog?.blog?.category?.name);
            form.setValue('title', blog?.blog?.title);
            form.setValue('slug', blog?.blog?.slug);
            form.setValue('blogContent', decode(blog?.blog?.blogContent));
        }
    }, [blog?.blog]);

    if (loading) {
        return <Loading/>
    }
    return (
        <div className='mt-16 md:mt-18 px-4'>
            <Card className='w-full  mx-auto p-5'>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            {/* Category Field */}
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories?.allCategories?.length > 0 && categories.allCategories.map((category, index) => (
                                                            <SelectItem key={category._id} value={category._id}>
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Title Field */}
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Blog Title" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Slug Field */}
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="category slug..." {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Featured Image Upload */}
                            <div className='mb-3'>
                                <span className='mb-2 block'>Featured Image</span>
                                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()} className="w-full">
                                            <input {...getInputProps()} />
                                            <div className='flex justify-center items-center  w-28 h-28 border-2 border-dashed rounded'>
                                                <img src={filePreview} className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>

                            {/* Blog Content Editor */}
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="blogContent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blog Content</FormLabel>
                                            <FormControl>
                                                <Editor
                                                    props={{
                                                        initialData: decode(field?.value || ""),
                                                        onChange: handleEditorData
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className='mt-5'>
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting && (
                                        <LuLoader className="animate-spin mr-2 h-4 w-4" />
                                    )}
                                    {form.formState.isSubmitting ? "Editting..." : "Edit Blog"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}

export default EditBlog
