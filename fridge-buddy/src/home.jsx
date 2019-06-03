import React from 'react';
import './style/home.css';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';

export default function Home({ user }) {
  return (
    <div className="main-box">
      {user.name !== undefined ? (<p>Welcome back, {user.name}</p>) : (<p>Welcome to Fridge Buddy</p>)}
      <div className="slider-container">
      <div id="slider">
        <figure>
          <img src={ img1 } alt="img1"/>
          <img src={ img2 } alt="img2"/>
          <img src={ img3 } alt="img3"/>
          <img src={ img4 } alt="img4"/>
          <img src={ img5 } alt="img5"/>
        </figure>
      </div>
      </div>
    </div>
  );
}