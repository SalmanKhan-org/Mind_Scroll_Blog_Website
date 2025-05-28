import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_END_POINT } from '@/utils/constant'
import { setLoading, setSingleBlog } from '@/redux/blogSlice'


const useSingleBlogById = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchblog = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${API_END_POINT}/blogs/${id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleBlog(res.data.blog))
                }
            } catch (error) {
                dispatch(setLoading(false));
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchblog();
    }, [])
}

export default useSingleBlogById