import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink to="/" className="navbar-brand">Brand</NavLink>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>About</NavLink>
                        <NavLink to="/services" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Services</NavLink>
                        <NavLink to="/addClient" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Sign up</NavLink>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Sign in</NavLink>
                      
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
