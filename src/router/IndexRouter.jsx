import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '@/pages/login'
import Stock from '@/pages/stock'
import Main from '@/pages/main'
import Register from '@/pages/register'
import CodeLogin from '@/pages/codelogin'
import ForgetPass from '@/pages/forgetPassword'
export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<ForgetPass />} />
        <Route path='/codelogin' element={<CodeLogin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<Stock />} />
      </Routes>
    </BrowserRouter>
  )
}
