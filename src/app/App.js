import React from 'react';
import injectSheet from 'react-jss';
import logo from '../assets/img/eulers_infinity_sign.svg';

const styles = {
  '@global': {
    h1: {
      fontSize: 56,
      textAlign: 'center'
    }
  },
  logoContainer: {
    margin: '40px auto',
    textAlign: 'center'
  },
  logo: {
    display: 'inline-block'
  }
};

function App ({classes}) {
  return (
    <div>
      <h1>Hello World!</h1>
      <div className={classes.logoContainer}>
        <img src={logo} width='185' height='106' className={classes.logo} />
      </div>
    </div>
  );
}

export default injectSheet(styles)(App);
