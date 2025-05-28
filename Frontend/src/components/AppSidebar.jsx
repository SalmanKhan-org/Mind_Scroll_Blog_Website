import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '../assets/images/logo-white.png'
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GoDot } from "react-icons/go";
import { API_END_POINT } from "@/utils/constant";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const { data: blogData, loading, error } = useFetch(`${API_END_POINT}/category/get/all`, {
        method: 'get',
        credentials: 'include'
    }, []);
    
    const { user } = useSelector(state => state?.user);
  return (
      <Sidebar>
          <SidebarHeader className={'bg-white'}>
              <img src={logo} alt=""  width={120}/>
          </SidebarHeader >
          <SidebarContent className='bg-white'>
              <SidebarGroup >
                  <SidebarMenu>
                      <SidebarMenuItem>
                          <SidebarMenuButton>
                              <IoHomeOutline/>
                              <Link to={'/'}>Home</Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                          <SidebarMenuButton>
                              <GrBlog />
                              <Link to={'/blogs/details'}>Blogs</Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                          <SidebarMenuButton>
                              <FaRegComments />
                              <Link to={"/comments/all"}>Comments</Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                      {user && user?.role === 'admin' && (
                          <>
                              <SidebarMenuItem>
                                  <SidebarMenuButton>
                                      <BiCategoryAlt />
                                      <Link to={'/category/details'}>Categories</Link>
                                  </SidebarMenuButton>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                                  <SidebarMenuButton>
                                      <FiUsers />
                                      <Link to={'/admin/users/all'}>Users</Link>
                                  </SidebarMenuButton>
                              </SidebarMenuItem>
                          </>
                      )}
                  </SidebarMenu>
              </SidebarGroup>



              <SidebarGroup >
                  <SidebarGroupLabel>
                      Categories
                  </SidebarGroupLabel>
                  <SidebarMenu>
                      {blogData?.allCategories && blogData?.allCategories?.length > 0 && blogData?.allCategories?.map((category, index) => {
                          return (
                              <SidebarMenuItem key={index+category}>
                                  <SidebarMenuButton>
                                      <GoDot />
                                      <Link to={`/blogs/${category._id}`}>{category?.name}</Link>
                                  </SidebarMenuButton>
                              </SidebarMenuItem>
                          )
                      })}
              
                  </SidebarMenu>
              </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
      </Sidebar>
  )
}

export default AppSidebar
