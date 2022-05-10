import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '@/pages/login'
import Main from '@/pages/main'
export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}
