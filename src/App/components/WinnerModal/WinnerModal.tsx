import React from 'react';
import './WinnerModal.css';
import { IWinnerCar } from '../../store/reducers/type';

type Props = {
  isOpen: boolean;
  winner: IWinnerCar | null;
  onClose: () => void;
};

const WinnerModal: React.FC<Props> = ({ isOpen, winner, onClose }) => {
  if (!isOpen || !winner) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Winner!</h2>
        <p>
          <strong>Car: </strong> {winner.name}
        </p>
        <p>
          <strong>Time: </strong> {winner.bestTime.toFixed(2)} sec
        </p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
