import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">

            {/* Custom portfolio logo */}
            <NavLink to="/" className="logo">
                HA
            </NavLink>

            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/education">Education</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>

        </nav>
    )
}

export default Navbar