import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  carsSelector,
  engineSelector,
  isScreenSetSelector,
  positionsSelector,
} from '../../store/selectors/GarageSelector';
import {
  addCarAction,
  deleteCarAction,
  getCarAction,
  getCarsAction,
  setCarPositionAction,
  startEngineAction,
  stopEngineAction,
  updateCarAction,
} from '../../store/actions/GarageActions';
import { ICar } from '../../store/reducers/type';
import {
  addWinnerAction,
  getWinnersAction,
  setWinnerAction,
  updateWinnerAction,
} from '../../store/actions/WinnerActions';
import { selectedWinnerSelector, winnersSelector } from '../../store/selectors/WinnerSelector';

const GarageHook = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);
  const engine = useSelector(engineSelector);
  const winners = useSelector(winnersSelector);
  const selectedWinner = useSelector(selectedWinnerSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('#000000');

  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCarName, setSelectedCarName] = useState('');
  const [selectedCarColor, setSelectedCarColor] = useState('#000000');

  useEffect(() => {
    dispatch(getCarsAction());
    dispatch(getWinnersAction());
  }, [dispatch]);

  const createCar = () => {
    dispatch(addCarAction({ name: carName, color: carColor }));
    setCarName('');
    setCarColor('#000000');
  };

  const updateCar = () => {
    if (selectedCarId === null) return;
    dispatch(
      updateCarAction(selectedCarId, {
        name: selectedCarName,
        color: selectedCarColor,
      }),
    );
    setCarName('');
    setCarColor('#000000');
  };

  const getCar = (id: number) => {
    dispatch(getCarAction(id));
  };

  const removeCar = (id: number) => {
    dispatch(deleteCarAction(id));
  };

  const carBrands = [
    'Tesla',
    'Ford',
    'BMW',
    'Audi',
    'Mercedes',
    'Honda',
    'Toyota',
    'Chevrolet',
    'Nissan',
    'Porsche',
  ];

  const carColors = [
    'red',
    'blue',
    'green',
    'yellow',
    'black',
    'white',
    'silver',
    'orange',
    'purple',
    'brown',
  ];

  const generateRandomCars = () => {
    for (let i = 0; i < 100; i += 1) {
      const randomCarname = carBrands[Math.floor(Math.random() * carBrands.length)];
      const randomCarColor = carColors[Math.floor(Math.random() * carColors.length)];
      dispatch(addCarAction({ name: randomCarname, color: randomCarColor }));
    }
  };

  const [carDisabled, setCarDisabled] = useState<{ [id: number]: boolean }>({});
  const [positions, setPositions] = useState<Record<number, number>>({});
  const [winner, setWinner] = useState<ICar | null>(null);
  const [finish, setFinish] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const finishLine = window.innerWidth * 0.65;

  const animationRefs = useRef<{ [key: number]: number }>({});
  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
  }, [engine]);

  const moveCar = useCallback(
    (id: number) => {
      const carIndex = cars.findIndex((c) => c.id === id);
      if (carIndex === -1) return;

      let start = positions[id] || 0;

      const animate = () => {
        const carEngine = engineRef.current[id];
        if (!carEngine) return;

        const { velocity, status } = carEngine;

        if (status === 'stopped') {
          cancelAnimationFrame(animationRefs.current[id]);
          delete animationRefs.current[id];
          dispatch(setCarPositionAction(id, positions[id] ?? 0));
          return;
        }

        start += velocity * 0.005;

        if (start >= finishLine) {
          start = finishLine;
          setPositions((prev) => ({ ...prev, [id]: start }));
          if (!finish) {
            setFinish(true);
            const car = cars.find((c) => c.id === id);
            if (car) {
              setWinner(car);
              setIsModalOpen(true);
            }
          }
          cancelAnimationFrame(animationRefs.current[id]);
          delete animationRefs.current[id];
          dispatch(setCarPositionAction(id, start));
          return;
        }

        setPositions((prev) => ({ ...prev, [id]: start }));
        animationRefs.current[id] = requestAnimationFrame(animate);
      };
      if (animationRefs.current[id]) {
        cancelAnimationFrame(animationRefs.current[id]);
      }

      animationRefs.current[id] = requestAnimationFrame(animate);
    },
    [cars, positions, finish, dispatch],
  );

  const stopEngine = (id: number, resetToStart = true) => {
    dispatch(stopEngineAction(id));
    setCarDisabled((prev) => ({ ...prev, [id]: false }));

    if (animationRefs.current[id]) {
      cancelAnimationFrame(animationRefs.current[id]);
      delete animationRefs.current[id];
    }

    const finalPos = resetToStart ? 0 : (positions[id] ?? 0);

    setPositions((prev) => ({ ...prev, [id]: finalPos }));
    dispatch(setCarPositionAction(id, finalPos));
  };

  const startEngine = (id: number) => {
    setCarDisabled((prev) => ({ ...prev, [id]: true }));
    dispatch(startEngineAction(id));
  };

  useEffect(() => {
    cars.forEach((car) => {
      const engineState = engine[car.id];
      if (engineState) {
        const { velocity, status } = engineState;
        if (status === 'started' && velocity > 0 && !finish) {
          moveCar(car.id);
        }
      }
    });
  }, [engine, finish]);

  const startRace = () => {
    setWinner(null);
    setFinish(false);
    cars.forEach((car) => startEngine(car.id));
  };

  useEffect(() => {
    if (winner) {
      cars.forEach((car) => {
        stopEngine(car.id, false);
      });

      const raceResults = cars
        .map((car) => {
          const engineState = engine[car.id];
          if (!engineState || engineState.velocity <= 0) return null;

          const timer = engineState.distance / engineState.velocity / 100;
          const time = parseFloat(timer.toFixed(2));
          return { car, time };
        })
        .filter(Boolean) as { car: ICar; time: number }[];

      if (raceResults.length > 0) {
        const win = raceResults.reduce((min, r) => (r.time < min.time ? r : min));

        const existingWinner = winners.find((w) => w.id === win.car.id);
        let winCount = 1;
        let bestTime = win.time;

        if (existingWinner) {
          winCount = existingWinner.wins + 1;
          bestTime = Math.min(existingWinner.time, win.time);
          dispatch(updateWinnerAction({ id: win.car.id, wins: winCount, time: bestTime }));
        } else {
          dispatch(addWinnerAction({ id: win.car.id, wins: winCount, time: bestTime }));
        }
        dispatch(
          setWinnerAction({
            id: win.car.id,
            name: win.car.name,
            wins: winCount,
            bestTime: win.time,
            color: win.car.color,
          }),
        );
      }
    }
  }, [winner]);

  const resetRace = () => {
    cars.forEach((car) => stopEngine(car.id, true));
    setFinish(false);
    setWinner(null);
  };
  const carPositions = useSelector(positionsSelector);
  const screen = useSelector(isScreenSetSelector);

  useEffect(() => {
    if (!carPositions) return;
    setPositions({ ...carPositions });
  }, [screen]);

  return {
    cars,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    currentItems,
    carName,
    setCarName,
    carColor,
    setCarColor,
    setSelectedCarId,
    selectedCarName,
    setSelectedCarName,
    selectedCarColor,
    setSelectedCarColor,
    createCar,
    updateCar,
    removeCar,
    generateRandomCars,
    positions,
    startEngine,
    stopEngine,
    carDisabled,
    startRace,
    getCar,
    resetRace,
    isModalOpen,
    setIsModalOpen,
    selectedWinner,
  };
};

export default GarageHook;
