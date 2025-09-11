import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { winnersSelector } from '../../store/selectors/WinnerSelector';
import {
  deleteWinnerAction,
  getWinnerAction,
  getWinnersAction,
} from '../../store/actions/WinnerActions';
import { carsSelector } from '../../store/selectors/GarageSelector';
import { IWinner, IWinnerCar } from '../../store/reducers/type';

const WinnersHook = () => {
  const dispatch = useDispatch();
  const winners = useSelector(winnersSelector);

  useEffect(() => {
    dispatch(getWinnersAction());
  }, [dispatch]);

  const getWinner = (id: number) => {
    dispatch(getWinnerAction(id));
  };

  const removeWinner = (id: number) => {
    dispatch(deleteWinnerAction(id));
  };

  const cars = useSelector(carsSelector);

  const winnerCars: IWinnerCar[] = winners
    .map((winner: IWinner) => {
      const winnerCar = cars.find((car) => car.id === winner.id);
      if (!winnerCar) return null;

      return {
        id: winnerCar.id,
        name: winnerCar.name,
        color: winnerCar.color,
        wins: winner.wins,
        bestTime: winner.time,
      };
    })
    .filter((wc): wc is IWinnerCar => wc !== null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = winnerCars.slice(startIndex, endIndex);

  return { winners, winnerCars, currentItems, currentPage, setCurrentPage, itemsPerPage };
};

export default WinnersHook;
