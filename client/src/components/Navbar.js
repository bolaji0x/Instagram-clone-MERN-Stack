import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components'


const Navbar = () => {
  
  return (
    <header className='header'>
      <nav className="nav nav-container">
          <Logo className="nav__logo" />
            
            <ul>
                <Link to='/'><li className="nav__list"><i className='ehbtn bx bxs-home'></i></li></Link> 
                <Link to='/explore' className="nav__link"><li className="nav__list"><i className='ehbtn bx bx-search' ></i></li></Link>
                <Link to='/add-post' className="create-btn nav__link"><li className="nav__list"><i className='ehbtn bx bxs-plus-square'></i></li></Link> 
                
                <Link to='/' className="nav__link"><li className="nav__list"><i className='ehbtn bx bxl-telegram' ></i></li></Link> 
                <Link to={`/profile`} className="nav__link"><li className="nav__list"><i className='ehbtn bx bx-user'></i></li></Link> 
            </ul>
      </nav>
    </header>
        
  )
}

export default Navbar