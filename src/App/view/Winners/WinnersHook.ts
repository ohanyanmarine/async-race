import { useEffect, useMemo, useState } from 'react';
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

  type SortField = 'wins' | 'time';
  type SortDirection = 'asc' | 'desc';

  const [sortField, setSortField] = useState<SortField>('wins');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedWinners = useMemo(() => {
    const sorted = [...winnerCars].sort((a, b) => {
      if (sortField === 'wins') {
        return sortDirection === 'asc' ? a.wins - b.wins : b.wins - a.wins;
      }
      return sortDirection === 'asc' ? a.bestTime - b.bestTime : b.bestTime - a.bestTime;
    });
    return sorted;
  }, [winnerCars, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedWinners.slice(startIndex, endIndex);

  useEffect(() => {
    const total = Math.ceil(cars.length / itemsPerPage);

    if (currentPage > total && total > 0) {
      setCurrentPage(total);
    }
  }, [cars, currentPage, itemsPerPage]);

  return {
    winners,
    currentItems,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleSort,
  };
};

export default WinnersHook;
