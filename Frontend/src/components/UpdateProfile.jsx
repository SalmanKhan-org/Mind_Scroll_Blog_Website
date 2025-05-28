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
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUser } from '@/Schema/authSchema'
import { Card } from './ui/card'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from './ui/textarea'
import { IoMdClose } from "react-icons/io";
import { LuLoader } from "react-icons/lu";
import { Loader2 } from 'lucide-react'

const UpdateProfile = ({ onClose }) => {
    const { user } = useSelector(state => state?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(updateUser),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            bio: user?.bio || "",
            avatar: ""
        },
    });
    

    //2. Define a form Handler
    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("bio", values.bio);
            if (values.avatar) {
                formData.append("avatar", values.avatar);
            }

            const response = await axios.put(`${API_END_POINT}/update/profile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (response?.data?.success) {
                toast.success(response.data.message);
                onClose()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    
    const closeOnOutsideClick = (e) => {
        if (e.target.id === "overlay") {
            onClose();
        }
    };

  

  return (
      <div id="overlay"
          onClick={closeOnOutsideClick}
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
            
          
          <Card className={'w-full max-w-md p-5 '}>
              <div className='flex justify-between items-center'>
                  <h1 className='md:text-2xl text-xl md:font-bold font-semibold text-center'>Edit Your Profile</h1>
                  <IoMdClose onClick={onClose} className='text-xl'/>
              </div>
              
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className='mb-3'>
                          <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel >Username</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Enter your name" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      <div className='mb-3'>
                          <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                          <Input type={'email'} placeholder="Enter your email address" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>

                      <div className='mb-3'>
                          <FormField
                              control={form.control}
                              name="bio"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Introduction</FormLabel>
                                      <FormControl>
                                          <Textarea className={'line-clamp-3'} type={"text"} placeholder="Write About yourself.." {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      <div className='mb-3'>
                          <FormField
                              control={form.control}
                              name="avatar"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Avatar</FormLabel>
                                      <FormControl>
                                          <Input
                                              type="file"
                                              accept="image/*"
                                              onChange={(e) => field.onChange(e.target.files[0])}
                                          // DO NOT spread `field` or `...rest` here
                                          />
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
                              {form.formState.isSubmitting ? "Saving..." : "Edit"}
                          </Button>

                      </div>
                  </form>
              </Form>
          </Card>
    </div>
  )
}

export default UpdateProfile
