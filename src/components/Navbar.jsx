import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  // const [menuActive, setMenuActive] = useState(false);
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  var lsign = "Rayyan Shaikh";
  var fsign = "Portfolio";

  return (
    <motion.nav
      animate={{height: (toggle ? "15em" : "5em")}}
      transition={{duration: 0.75}}
      className={`${styles.paddingX} w-full flex sm:flex-row flex-col items-center py-5 fixed top-0 z-20 bg-gradient-to-r from-primary to-transparent overflow-hidden`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src="/rslogo.png" alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Rayyan Shaikh &nbsp;<span className="sm:block hidden">|&nbsp;Portfolio</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          {/* <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          /> */}
          <motion.div className={`object-contain cursor-pointer h-[28px] flex flex-col ${toggle? "justify-center" : "justify-evenly"} items-center`} onClick={() => setToggle(!toggle)}>
            <motion.hr 
              animate={{rotate: (toggle? -45: 0) }} 
              className="text-white w-[25px]" 
            />
            <motion.hr animate={{opacity: (toggle? 0: 1)}} className="text-white w-[25px]" />
            <motion.hr 
              animate={{rotate: (toggle? 45: 0), translateY: (toggle?'-0.06em': 0) }} 
              className="text-white w-[25px]" 
            />          
          </motion.div>
          
          
        </div>
        
      </div>
      <motion.div
            animate={{opacity: (toggle? 1: 0)}}
            transition={{duration: 1.4}}
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 top-20 right-0 mx-4 my-2 min-w-[140px] z-10 w-full`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle)
                    setActive(link.title)
                  }}
                >
                  <motion.a 
                    href={`#${link.id}`}
                    initial={{translateX: "-5em"}}
                    animate={{translatex: "0"}}
                  >
                    {link.title}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
    </motion.nav>
  );
};

export default Navbar;
