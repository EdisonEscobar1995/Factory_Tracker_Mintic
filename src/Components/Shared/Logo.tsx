import React from 'react';
import logo from '../../img/store.png';

const Logo: React.FC = () => (
  <div className="custom-logo-container">
    <img className="custom-logo" src={logo} alt="Factory Tracker" />
  </div>
);

export default Logo;