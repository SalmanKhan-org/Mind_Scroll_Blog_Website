import { z } from "zod"

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,'Password must be atleast 8 character long')
})


export const signupSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 character long'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be atleast 8 character long'),
    confirmPassword: z.string().refine(data => data.password === data.confirmPassword, "Password doesn't match")
});

export const updateUser = z.object({
    name: z.string().min(3, 'Name must be atleast 3 character long'),
    email: z.string().email(),
    bio: z.string().min(8, 'Introduction is required'),
    avatar: z.any().optional()
});

export const categorySchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 character long'),
    slug: z.string().min(3, 'Slug must be atleast 3 character long')
})

export const blogSchema = z.object({
    category: z.string().min(3, 'Category is required'),
    title: z.string().min(3, 'Title must be atleast 3 character long'),
    slug: z.string().min(3, 'Slug must be atleast 3 character long'),
    blogContent: z.string().min(10, 'Slug must be atleast 10 character long'),
})

export const commentSchema = z.object({
    comment: z.string().min(3, 'Comment is required')
})