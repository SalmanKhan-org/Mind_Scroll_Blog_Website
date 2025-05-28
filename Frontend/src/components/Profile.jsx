import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import UpdateProfile from './UpdateProfile'
import useGetUser from '@/hooks/useGetUser'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    useGetUser();
    const { user } = useSelector(state => state?.user);
    return (
        <div className="max-w-3xl mx-auto px-4 mt-16 md:mt-20">
            <Card className="shadow-md">
                <CardHeader className="flex flex-col items-center text-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user?.avatar || "https://i.pravatar.cc/300" } alt="User Avatar" />
                        <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl md:text-2xl font-semibold md:font-bold">{ user?.name || "Jane Doe"}</CardTitle>
                    <p className="text-gray-500 text-xs md:text-sm">{user?.email || "jane.doe@example.com"}</p>
                </CardHeader>

                <CardContent className="text-center">
                    <p className="text-gray-700 mb-4 text-sm md:text-base">
                        {user?.bio || "Passionate writer and tech enthusiast. I love sharing thoughts on lifestyle, technology, and everything in between." }
                    </p>
                    <Button variant="default" onClick={()=>setShowUpdateForm(true)}>Edit Profile</Button>
                </CardContent>
            </Card>
            {showUpdateForm && <UpdateProfile onClose={()=>setShowUpdateForm(false)} />}
        </div>
    )
}

export default ProfilePage

