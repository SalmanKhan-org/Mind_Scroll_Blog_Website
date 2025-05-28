import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_END_POINT } from '@/utils/constant'
import { setLoading, setUser } from '@/redux/userSlice'


const useGetUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchuser = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/user/me`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setUser(res?.data?.user));
                }
            } catch (error) {
                setLoading(false);
            }
        }
        fetchuser();
    }, [])
}

export default useGetUser