import React from 'react';
import "./home.css"
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';

const Home = () => {
  return (
    <>
      <NavBar/>
      <ul className="list-group" id="list">
      <div className="center">
      <li className="list-group-item" aria-disabled="true">
      <h1 className='text-center'>What is Your Role?</h1>
    </li>
    <li className="list-group-item">
      <NavLink to="/manager" className="text-decoration-none text">
      <button className="button1">Manager</button>
      </NavLink>
      <NavLink to="/participants" className="text-decoration-none text">
      <button className="button1">Participants</button>
      </NavLink>
      </li>
      </div>
    </ul>
  </>
  )
}

export default Home;
