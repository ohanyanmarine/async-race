import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCarAction,
  deleteCarAction,
  getCarAction,
  getCarsAction,
  getCurrentStateAction,
  setCarPositionAction,
  setCurrentPageAction,
  setIsRaceStartAction,
  setIsStartAction,
  startEngineAction,
  stopEngineAction,
  updateCarAction,
} from '../../store/actions/GarageActions';
import {
  addWinnerAction,
  deleteWinnerAction,
  getWinnersAction,
  setWinnerAction,
  updateWinnerAction,
} from '../../store/actions/WinnerActions';
import { ICar } from '../../store/reducers/type';
import {
  carsSelector,
  currentStateSelector,
  engineSelector,
  isScreenSetSelector,
  positionsSelector,
} from '../../store/selectors/GarageSelector';
import { selectedWinnerSelector, winnersSelector } from '../../store/selectors/WinnerSelector';

const GarageHook = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);
  const engine = useSelector(engineSelector);
  const winners = useSelector(winnersSelector);
  const selectedWinner = useSelector(selectedWinnerSelector);
  const currentState = useSelector(currentStateSelector);
  const stateCurrentPage = currentState.currentPage;
  const stateIsRaceStart = currentState.isRaceStart;
  const stateIsStart = currentState.isStart || {};

  const [currentPage, setCurrentPage] = useState<number>(1);
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
    dispatch(getCurrentStateAction());
    dispatch(getCarsAction());
    dispatch(getWinnersAction());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageAction(page));
  };

  const createCar = () => {
    if (!carName.trim() || carName.length < 3 || carName.length > 15) {
      alert('Car name must be 3–15 characters and not empty.');
      return;
    }
    dispatch(addCarAction({ name: carName, color: carColor }));
    setCarName('');
    setCarColor('#000000');
  };

  const updateCar = () => {
    if (selectedCarId === null) return;
    if (!selectedCarName.trim() || selectedCarName.length < 3 || selectedCarName.length > 15) {
      alert('Car name must be 3–15 characters and not empty.');
      return;
    }
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
    dispatch(deleteWinnerAction(id));
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

  const carModels = [
    'Model S',
    'Mustang',
    'X5',
    'A4',
    'C-Class',
    'Civic',
    'Corolla',
    'Camaro',
    'Altima',
    '911',
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
    const count = 100;
    for (let i = 0; i < count; i++) {
      const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
      const model = carModels[Math.floor(Math.random() * carModels.length)];
      const color = carColors[Math.floor(Math.random() * carColors.length)];
      dispatch(addCarAction({ name: `${brand} ${model}`, color }));
    }
  };

  const [positions, setPositions] = useState<Record<number, number>>({});
  const [finish, setFinish] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [carDisabled, setCarDisabled] = useState<{ [id: number]: boolean }>({});
  // const [carDisabled, setCarDisabled] = useState<boolean>(false);

  const finishLine = window.innerWidth * 0.65;

  const animationRefs = useRef<{ [key: number]: number }>({});
  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
  }, [engine]);

  const stopEngine = (id: number, resetToStart: boolean) => {
    dispatch(stopEngineAction(id));
    // setCarDisabled((prev) => ({ ...prev, [id]: false }));
    // setCarDisabled(false);
    if (resetToStart) {
      dispatch(setIsStartAction(id, false));
      if (animationRefs.current[id]) {
        cancelAnimationFrame(animationRefs.current[id]);
        delete animationRefs.current[id];
      }
      // const finalPos = resetToStart ? 0 : (positions[id] ?? 0);
      const finalPos = 0;
      setPositions((prev) => ({ ...prev, [id]: finalPos }));
      dispatch(setCarPositionAction(id, finalPos));
    }
  };

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
          stopEngine(id, false);
          cancelAnimationFrame(animationRefs.current[id]);
          delete animationRefs.current[id];
          dispatch(setCarPositionAction(id, positions[id] ?? 0));
          return;
        }

        start += velocity * 0.02;

        if (start >= finishLine) {
          start = finishLine;
          setPositions((prev) => ({ ...prev, [id]: start }));
          if (!finish) {
            setFinish(true);
            // const car = cars.find((c) => c.id === id);
            // if (car) {
            //   setWinner(car);
            setIsModalOpen(true);
            // }
          }
          stopEngine(id, false);
          // cancelAnimationFrame(animationRefs.current[id]);
          // delete animationRefs.current[id];
          return;
        }
        dispatch(setCarPositionAction(id, start));
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

  const startEngine = (id: number) => {
    // setCarDisabled(true);
    dispatch(setIsStartAction(id, true));
    dispatch(startEngineAction(id));
  };

  useEffect(() => {
    cars.forEach((car) => {
      const engineState = engine[car.id];
      if (engineState) {
        const { velocity, status } = engineState;
        if (status === 'started' && velocity > 0) {
          moveCar(car.id);
        }
      }
    });
  }, [engine]);

  const startRace = () => {
    setFinish(false);
    dispatch(setIsRaceStartAction(true));
    cars.forEach((car) => startEngine(car.id));
  };

  useEffect(() => {
    if (finish) {
      cars.forEach((car) => {
        if (positions[car.id] >= finishLine) {
          stopEngine(car.id, false);
        }
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
  }, [finish]);

  const resetRace = () => {
    cars.forEach((car) => stopEngine(car.id, true));
    setFinish(false);
    dispatch(setIsRaceStartAction(false));
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
    stateIsStart,
    startRace,
    getCar,
    resetRace,
    isModalOpen,
    setIsModalOpen,
    selectedWinner,
    stateCurrentPage,
    handlePageChange,
    stateIsRaceStart,
    // carDisabled,
  };
};

export default GarageHook;
