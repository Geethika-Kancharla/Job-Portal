import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useFirebase } from '../context/Firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ]

  const handleLogout = async () => {
    try {
      await firebase.handleLogout();
      console.log(logout);
      navigate("/");
    }
    catch (err) {
      console.log("error:", err);
    }

  }

  return (
    <header className=' max-w-screen-2xl container mx-auto xl:px-24 px-4 fixed top-0'>
      <nav className='flex justify-between items-center py-6' >
        <a href='/' className='flex items-center gap-2 text-2xl'>
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#357562" fillOpacity="0.4" />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobPortal</span>
        </a>
        {/*navitems for large devices */}
        <ul className='hidden md:flex gap-12'>{navItems.map(({ path, title }) => (
          <li key={path} className='text-base text-primary'>
            <NavLink to={path} className={({ isActive }) =>

              isActive ? "active" : ""} >{title}</NavLink>

          </li>))
        }
        </ul>
        {/*sign up and login */}
        <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>{
          firebase.isLoggedIn &&
          <button className='border border-black p-2 rounded-md mb-10' type='submit' onClick={handleLogout}>Log out</button>
        }
          {/* <Link to="/Sign Up" className='py-2 px-5 border rounded bg-blue text-white'>Sign Up</Link> */}
        </div>
        {/* mobile menu */}
        <div className='md:hidden block'>
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />}

          </button>
        </div>
      </nav>
      {/*nav items for mobile */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>{navItems.map(({ path, title }) => (
          <li key={path} className='text-base text-white first:text-white py-1'>
            <NavLink to={path} className={({ isActive }) =>

              isActive ? "active" : ""} >{title}</NavLink>

          </li>))
        }
          <Link><button className='bg-green-500 p-2 rounded-md mb-10' type='submit' onClick={handleLogout}>Log out</button></Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
