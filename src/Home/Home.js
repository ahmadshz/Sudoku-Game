import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { IsDarkMode } from '../Context/DakMode'
const Home = () => {
 const {darkMode} = useContext(IsDarkMode)

    return (
        <div>
            <div className="App" style={{backgroundColor : darkMode ? 'black' : '',color: darkMode ? 'white' : ''}}>
                <h1>Sudoku Game</h1>
                <Link to='/suduko' className='play'>Play Game</Link>
            </div>
        </div>
    )
}

export default Home
