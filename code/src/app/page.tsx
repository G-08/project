import React from 'react';
import Button from 'antd';

import './app.css';

function Homepage() {
    const Utente = "Giacomo";
  
    return (
      <>
        <div className="container">
          <img src="./assets/user-icon.jpg" alt="userImage"/>
          <h1>Benvenuto {Utente}</h1>
          {/*Mettere link pagina di allenamento */}
          <button id="button1"> Vai all'allenamento </button>
        </div>
      </>
    )
  }

  export default Homepage;
