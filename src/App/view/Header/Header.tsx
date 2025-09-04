import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import logo from '../../assets/logo2.png';
import './Header.css';

const Header: React.FC = () => {
  const navigarte = useNavigate();
  return (
    <div className="content">
      <div className="header">
        <div className="buttonGroup">
          <ButtonComponent
            label="Garage"
            color="blue"
            size="large"
            shape="rect"
            onPress={() => navigarte('/garage')}
          />
          <ButtonComponent
            label="Winners"
            color="pink"
            size="large"
            shape="rect"
            onPress={() => navigarte('/winners')}
          />
        </div>
        <img src={logo} alt="logo2" className="headerImage" />
      </div>
    </div>
  );
};
export default Header;
