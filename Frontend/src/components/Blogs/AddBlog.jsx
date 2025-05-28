import { blogSchema, categorySchema } from '@/Schema/authSchema';
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
import { Link, useNavigate } from 'react-router-dom'
import axios, { all } from 'axios'
import { API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import slugify from 'slugify';
import { LuLoader } from 'react-icons/lu';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import Dropzone from 'react-dropzone';
import Editor from '../Editor';
import { useFetch } from '@/hooks/useFetch';


const AddBlog = () => {
   
    const { data: categories, loading, error } = useFetch(`${API_END_POINT}/category/get/all`, {
        method: 'get',
        credentials: 'include'
    },[]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            category: "",
            title: "",
            slug: "",
            blogContent: ""
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
            const response = await axios.post(`${API_END_POINT}/blogs/new`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: 'include'
            });
            if (response.data.success) {
                form.reset();
                setFile();
                setPreview();
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
        setPreview(preview)
    }
    return (
        <div className='md:mt-18 mt-16'>
            <Card className={'w-full max-w-screen-md mx-auto p-5'}>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value }>
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories?.allCategories && categories?.allCategories?.length > 0 && categories?.allCategories?.map((category, index) => {
                                                            return <SelectItem key={category + index} value={ category?._id } >{ category?.name}</SelectItem>
                                                        })}
                                                    </SelectContent>
                                                </Select>

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Blog Title" {...field} />
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
                            <div className='mb-3'>
                                <span className='mb-2 block'>Featured Image</span>
                                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className='flex justify-center items-center w-28 h-28 border-2 border-dashed rounded'>
                                                <img src={filePreview} className='w-full h-full object-cover'/>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                            <div className='mb-3 w-full'>
                                <FormField
                                    control={form.control}
                                    name="blogContent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blog Content</FormLabel>
                                            <FormControl>
                                                <Editor  props={{intialData:'', onChange: handleEditorData}} />
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
                                    {form.formState.isSubmitting ? "Adding..." : "Add Blog"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>

            </Card>
        </div>
    )
}

export default AddBlog
