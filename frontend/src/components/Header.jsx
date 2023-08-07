import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../index";


// for toggle
import Hamburger from 'hamburger-react'

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);


    // for toggle

    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMenuActive, setMenuActive] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const toggleNav = () => {
      setToggleMenu((prevState) => !prevState);
      setMenuActive(!isMenuActive);
    };

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
     window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    //--------------------


  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (

    <nav className="header">
      <h2>Task Management App</h2>

{(toggleMenu || screenWidth > 600) && (  
<ul className="list">
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
     

      </ul>
   )}  

   <div className="hamburger-menu" onClick={toggleNav}>
     <Hamburger toggled={isOpen} toggle={setOpen} />
     </div>
     

    </nav>
  );
};

export default Header;
