import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Home from './components/Home'
import Layout from './Layout/Layout'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import { Toaster } from 'sonner'
import ProfilePage from './components/Profile'
import CategoryDetails from './components/Category/CategoryDetails'
import AddCategory from './components/Category/AddCategory'
import EditCategory from './components/Category/EditCategory'
import EditBlog from './components/Blogs/EditBlog'
import AddBlog from './components/Blogs/AddBlog'
import BlogsDetails from './components/Blogs/BlogsDetails'
import BlogDetails from './components/BlogDetails'
import CategoryBlogs from './components/CategoryBlogs'
import SearchResult from './components/SearchResult'
import AllComments from './components/AllComments'
import AllUsers from './components/AllUsers'
import AuthRouteProtection from './components/AuthRouteProtection'
import AdminRouteProtection from './components/AdminRouteProtection'
import PageNotFound from './components/PageNotFound'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      //  Protected Routes
      {
        element: <AuthRouteProtection />,
        children: [
          { path: "user/profile", element: <ProfilePage /> },
          { path: 'category/details', element: <CategoryDetails /> },
          { path: 'category/add', element: <AddCategory /> },
          { path: 'category/edit/:id', element: <EditCategory /> },
          { path: 'blogs/details', element: <BlogsDetails /> },
          { path: 'blog/add', element: <AddBlog /> },
          { path: 'blog/edit/:id', element: <EditBlog /> },
          { path: 'comments/all', element: <AllComments /> },
        ]
      },

      //  Admin-Only Routes
      {
        element: <AdminRouteProtection />,
        children: [
          { path: 'admin/users/all', element: <AllUsers /> },
        ]
      },

      //  Public Routes
      { path: 'blog/:category/:slug', element: <BlogDetails /> },
      { path: "blogs/:category", element: <CategoryBlogs /> },
      { path: "/search", element: <SearchResult /> },

      // Catch-all Not Found route inside layout
      { path: "*", element: <PageNotFound /> },
    ]
  },

  //  Auth Routes
  { path: "/login", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  //  Catch-all Not Found route inside layout
  { path: "*", element: <PageNotFound /> },
]);

const App = () => {

  return (
    <>
      <Toaster/>
    <RouterProvider router={appRouter} />
    </>
  )
}

export default App

