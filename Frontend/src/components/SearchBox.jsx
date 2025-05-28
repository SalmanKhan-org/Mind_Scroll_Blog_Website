import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`)
  }
  return (
    <form onSubmit={ handleSubmit} className='w-full'>
          <Input placeholder="Search here" onChange={(e)=>setQuery(e.target.value)} className={'h-9 w-full rounded-full bg-gray-50'}></Input>
    </form>
  )
}

export default SearchBox
