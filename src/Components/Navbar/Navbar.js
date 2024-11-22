import React, { useContext } from 'react';
import { IoSunny } from "react-icons/io5";
import { AiFillMoon } from "react-icons/ai";
import './Navbar.css';
import { IsDarkMode } from '../../Context/DakMode'; 

const Navbar = () => {
  // theme context
  const { darkMode, setDarkMode } = useContext(IsDarkMode);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
        <h2>Sudoku Game</h2>
        <div onClick={handleDarkMode} className='theme' style={{ cursor: 'pointer' }}>
          {darkMode ? (
            <AiFillMoon style={{ fontSize: 22 }} />
          ) : (
             <IoSunny style={{ fontSize: 22 }} />
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
