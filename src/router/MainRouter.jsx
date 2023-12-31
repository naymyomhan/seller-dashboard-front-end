/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import Login from '../pages/Login'
import VerifyEmail from '../pages/VerifyEmail'
import CompleteInfo from '../pages/CompleteInfo'
import Master from '../pages/master/Master'

const MainRouter = () => {
    return (
        <Routes>
            <Route path='/register' element={<Register />} exact />
            <Route path='/login' element={<Login />} exact />

            <Route path='/verify-email' element={<VerifyEmail />} exact />
            <Route path='/complete-information' element={<CompleteInfo />} exact />

            <Route path='/' element={<Master />} exact />

            <Route path='/*' element={<NotFound />} />
        </Routes>
    )
}

export default MainRouter
