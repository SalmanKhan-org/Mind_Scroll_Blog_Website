import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { signinSchema } from '@/Schema/authSchema'
import { Card } from '../ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'
import GoogleLogin from './GoogleLogin'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice'
import logo from '../../assets/images/logo-white.png';
import { LuLoader } from 'react-icons/lu'

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password:""
        },
    })

    //2. Define a form Handler
    const onSubmit = async(values) => {
        try {
            const response = await axios.post(`${API_END_POINT}/login`, values, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: 'include'
            });
            if (response?.data.success) {
                dispatch(setUser(response?.data?.user))
                toast.success(response?.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className={'w-full max-w-md p-5'}>
                <div className='flex flex-col items-center gap-2'>
                    <div className='md:h-14 md:w-36 h-12 w-30'>
                        <Link to={'/'}><img src={logo} alt="Logo" className='w-full h-full object-cover' /></Link>
                    </div>
                    <h1 className='md:text-2xl text-xl md:font-bold font-semibold text-center'>Login into your Account</h1>
                </div>
                
                <div>
                    <GoogleLogin />
                    <div className='border my-5 flex items-center justify-center'>
                        <span className='absolute text-slate-500 bg-white px-2'>Or with email and password</span>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={"password"} placeholder="Enter your password" {...field} />
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
                                    {form.formState.isSubmitting ? "Logging In..." : "Login"}
                                </Button>        
                            <div className='text-sm mt-3 flex justify-center items-center gap-2'>
                                <p>Don&apos;t have account?</p>
                                <Link className='text-blue-500 hover:underline' to={"/signup"}>Sign up</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Signin
