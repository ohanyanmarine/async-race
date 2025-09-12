import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getScreenStateAction, setScreenStateAction } from '../../store/actions/GarageActions';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { isScreenSetSelector } from '../../store/selectors/GarageSelector';
import logo from '../../assets/logo2.png';
// import Garage from '../Garage/Garage';
// import Winners from '../Winners/Winners';
import './Header.css';

const Header: React.FC = () => {
  const navigarte = useNavigate();
  const dispatch = useDispatch();
  const isScreen = useSelector(isScreenSetSelector);

  useEffect(() => {
    dispatch(getScreenStateAction());
  }, [isScreen]);

  return (
    <>
      <div className="content">
        <div className="header">
          <div className="buttonGroup">
            <ButtonComponent
              label="Garage"
              color="blue"
              size="large"
              shape="rect"
              onPress={() => {
                navigarte('/garage');
                dispatch(setScreenStateAction(true));
              }}
              // onPress={() => dispatch(setScreenStateAction(true))}
            />
            <ButtonComponent
              label="Winners"
              color="pink"
              size="large"
              shape="rect"
              onPress={() => {
                navigarte('/winners');
                dispatch(setScreenStateAction(false));
              }}
              // onPress={() => dispatch(setScreenStateAction(false))}
            />
          </div>
          <img src={logo} alt="logo2" className="headerImage" />
        </div>
      </div>
      {/* {isScreen ? <Garage /> : <Winners />} */}
    </>
  );
};
export default Header;
