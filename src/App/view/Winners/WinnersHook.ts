import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { winnersSelector } from '../../store/selectors/WinnerSelector';
import { getWinnersAction } from '../../store/actions/WinnerActions';
import { carsSelector } from '../../store/selectors/GarageSelector';
import { IWinner, IWinnerCar, ICar } from '../../store/reducers/type';

type SortField = 'wins' | 'time';
type SortDirection = 'asc' | 'desc';

const WinnersHook = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);
  const winners = useSelector(winnersSelector);

  useEffect(() => {
    dispatch(getWinnersAction());
  }, [dispatch]);

  const winnerCars: IWinnerCar[] = winners
    .map((winner: IWinner) => {
      const winnerCar = cars.find((car: ICar) => car.id === winner.id);
      if (!winnerCar) return null;

      return {
        id: winnerCar.id,
        name: winnerCar.name,
        color: winnerCar.color,
        wins: winner.wins,
        bestTime: winner.time,
      };
    })
    .filter((wc: IWinnerCar | null): wc is IWinnerCar => wc !== null);

  const [sortField, setSortField] = useState<SortField>('wins');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedWinners = useMemo(() => {
    const sorted = [...winnerCars].sort((a: IWinnerCar, b: IWinnerCar) => {
      if (sortField === 'wins') {
        return sortDirection === 'asc' ? a.wins - b.wins : b.wins - a.wins;
      }
      return sortDirection === 'asc' ? a.bestTime - b.bestTime : b.bestTime - a.bestTime;
    });
    return sorted;
  }, [winnerCars, sortField, sortDirection]);

  const handleSort = (field: SortField, order: SortDirection) => {
    if (field === sortField) {
      setSortDirection(order);
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedWinners.slice(startIndex, endIndex);

  useEffect(() => {
    const totalPages = Math.ceil(winnerCars.length / itemsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [winnerCars, currentPage, itemsPerPage]);

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
