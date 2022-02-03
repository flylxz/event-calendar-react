import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'

export const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.authReducer)

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    // )
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
