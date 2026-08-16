import React from 'react'
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className="menu">

            <div className='menu-bg'>

            </div>


            <a className="menu-item" href="/projects">
                <span className="item-index">01</span>
                <span className="item-label">Projects</span>
                <span className="item-end"></span>
            </a>
            <a className="menu-item sans" href="/about">
                <span className="item-index">02</span>
                <span className="item-label">About</span>
                <span className="item-end"></span>
            </a>
            <a className="menu-item" href="/contact">
                <span className="item-index">03</span>
                <span className="item-label">Contact</span>
                <span className="item-end"></span>
            </a>


        </nav>
    )
}

export default Navbar