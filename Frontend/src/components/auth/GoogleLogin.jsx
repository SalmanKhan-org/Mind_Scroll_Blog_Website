import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helper/firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        const googleResponse = await signInWithPopup(auth, provider);
        const values = {
            name: googleResponse.user.displayName,
            email: googleResponse.user.email,
            avatar: googleResponse.user.photoURL
        }
        try {
            const response = await axios.post(`${API_END_POINT}/google-login`, values, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: 'include'
            });
            if (response?.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response?.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
      <Button variant={'outline'} className={'w-full rounded-full cursor-pointer'} onClick={handleLogin}>
          <FcGoogle />
          Continue with Google
    </Button>
  )
}

export default GoogleLogin
