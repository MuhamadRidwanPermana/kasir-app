import React from 'react'
import './App.css'
import { Home, Sukses, Pesanan, DaftarMenus, Categories } from './pages'
import { NavbarComponent } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sukses" element={<Sukses />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/daftar-menu" element={<DaftarMenus />} />
        <Route path="/category" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  )
}
