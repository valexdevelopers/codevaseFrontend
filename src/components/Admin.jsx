import React from 'react'
import AdminSideBar from './partials/AdminSideBar'
import AdminContent from './partials/AdminContent'
import '../assets/styles/homepage.styles.css'
import '../assets/styles/custom.css'

function Home() {
    return (
        <div className="home">
            <AdminSideBar />
            <AdminContent />
        </div>
    )
}

export default Home
