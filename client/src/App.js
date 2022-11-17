import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBarCom from './component/NavBarCom'
import Login from './pages/Login'
import Register from './pages/Register'
import TodaysBook from './pages/TodaysBook'
import SearchBook from './pages/SearchBook'

const App = () => {
    return (
    <div>
        <BrowserRouter>
        <NavBarCom />
        <Routes>
            <Route exact path="/"  element={ <Login/> } />
            <Route exact path="/register"  element={ <Register/> } />
            <Route exact path="/book"  element={ <TodaysBook/> } />
            <Route exact path="/search"  element={ <SearchBook/> } />
        </Routes>
        </BrowserRouter>
    </div>
    
)}

export default App