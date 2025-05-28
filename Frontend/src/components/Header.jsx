import React, { useState } from 'react';
import logo from '../assets/images/logo-white.png';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogin, MdSearch, MdArrowBack } from 'react-icons/md';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import userIcon from '../assets/images/user.png'
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { toast } from 'sonner';
import axios from 'axios';
import { API_END_POINT } from '@/utils/constant';
import { removeUser } from '@/redux/userSlice';
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';


const Header = () => {
    const { toggleSidebar } = useSidebar()
    const [showSearch, setShowSearch] = useState(false);
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${API_END_POINT}/logout`);
            if (response?.data.success) {
                dispatch(removeUser(null))
                toast.success(response?.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='flex justify-between items-center md:h-16 h-14 fixed w-full z-20 bg-white px-5 border-b'>

            {/* Back button and Search input on mobile */}
            {showSearch ? (
                <div className='flex items-center w-full'>
                    {/* Back Button */}
                    <button
                        className='md:hidden text-xl mr-3'
                        onClick={() => setShowSearch(false)}
                    >
                        <MdArrowBack />
                    </button>
                    {/* Search Box */}
                    <div className='flex-1'>
                        <SearchBox />
                    </div>
                </div>
            ) : (
                    <>
                    {/* Logo */}
                        <div className='md:h-14 md:w-36 h-12 w-30 flex gap-2 items-center'>
                            {/* Sidebar logo */}
                            <button onClick={toggleSidebar} className='md:hidden flex'>
                                <AiOutlineMenu/>
                            </button>
                        <img src={logo} alt="Logo" className='w-full h-full object-cover' />
                    </div>

                    {/* Search bar for medium and up */}
                    <div className='hidden w-[500px] md:flex'>
                        <SearchBox />
                    </div>

                    {/* Right side controls */}
                    <div className='flex items-center gap-3'>
                        {/* Search icon on mobile */}
                        <button
                            className='md:hidden text-xl'
                            onClick={() => setShowSearch(true)}
                        >
                            <MdSearch />
                        </button>

                        {!user?.isLoggedIn ? (
                            <>{/* Login button */}
                                < Button asChild className='rounded-full  flex'>
                                    <Link to="/login">
                                        <MdLogin className='mr-1' />
                                        Sign In
                                    </Link>
                                </Button></>
                        ) : (
                            <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Avatar>
                                                    <AvatarImage src={user?.user?.avatar || userIcon} />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    <div className='flex items-center space-x-1'>
                                                        <Avatar>
                                                            <AvatarImage src={user?.user?.avatar || userIcon} />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p>{user?.user?.name}</p>
                                                            <p className='text-sm text-gray-500'>{user?.user?.email}</p>
                                                        </div>
                                                    </div>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link to={"/user/profile"}>
                                                        <FaRegUser />
                                                        Profile</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link to={'blog/add'}>
                                                        <FaPlus />
                                                        Create Blog
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Button variant={"outline"} className={'w-full'} onClick={handleLogout}>
                                                        <CiLogout />
                                                        Logout
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                            </>
                        )}
                    </div>
                </>
            )
            }
        </div >
    );
};

export default Header;

