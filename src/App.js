import React from 'react';
import styles from './App.css';
import logo from '../assets/img/eulers_infinity_sign.svg';

function App () {
  return (
    <div>
      <h1>Hello World!</h1>
      <div className={styles.container}>
        <img
          src={logo}
          width='185'
          height='106'
          className={styles.logo}
          alt='logo'
        />
      </div>
    </div>
  );
}

export default App;
