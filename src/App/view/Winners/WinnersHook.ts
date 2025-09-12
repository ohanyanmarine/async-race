import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { winnersSelector } from '../../store/selectors/WinnerSelector';
import { getWinnersAction } from '../../store/actions/WinnerActions';
import { carsSelector } from '../../store/selectors/GarageSelector';
import { IWinner, IWinnerCar } from '../../store/reducers/type';

const WinnersHook = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);
  const winners = useSelector(winnersSelector);

  useEffect(() => {
    dispatch(getWinnersAction());
  }, [dispatch]);

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

  useEffect(() => {
    const total = Math.ceil(cars.length / itemsPerPage);

    if (currentPage > total && total > 0) {
      setCurrentPage(total);
    }
  }, [cars, currentPage, itemsPerPage]);

  return { winners, currentItems, currentPage, setCurrentPage, itemsPerPage };
};

export default WinnersHook;
