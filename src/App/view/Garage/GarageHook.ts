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
import { ICar, IEngineState, IWinner } from '../../store/reducers/type';
import {
  carsSelector,
  currentStateSelector,
  engineSelector,
  positionsSelector,
} from '../../store/selectors/GarageSelector';
import { selectedWinnerSelector, winnersSelector } from '../../store/selectors/WinnerSelector';

interface RaceResult {
  car: ICar;
  time: number;
}

const GarageHook = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);
  const engine = useSelector(engineSelector);
  const winners = useSelector(winnersSelector);
  const selectedWinner = useSelector(selectedWinnerSelector);
  const currentState = useSelector(currentStateSelector);
  const stateCurrentPage = currentState.currentPage;
  const stateIsRaceStart = currentState.isRaceStart;
  const stateIsStart: Record<number, boolean> = currentState.isStart || {};

  const itemsPerPage = 7;

  const indexOfLastItem = stateCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

  const [carName, setCarName] = useState<string>('');
  const [carColor, setCarColor] = useState<string>('#000000');

  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCarName, setSelectedCarName] = useState<string>('');
  const [selectedCarColor, setSelectedCarColor] = useState<string>('#000000');

  useEffect(() => {
    dispatch(getCarsAction());
  }, []);

  useEffect(() => {
    dispatch(getCurrentStateAction());
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
    const existingWinner = winners.find((w: IWinner) => w.id === id);
    if (existingWinner) {
      dispatch(deleteWinnerAction(id));
      const totalItemsAfter = cars.length - 1;
      const totalPages = Math.ceil(totalItemsAfter / itemsPerPage);

      if (stateCurrentPage > totalPages) {
        dispatch(setCurrentPageAction(totalPages || 1));
      }
    }
  };

  const carBrands: string[] = [
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

  const carModels: string[] = [
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

  const carColors: string[] = [
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

  const finishLine = window.innerWidth * 0.65;

  const animationRefs = useRef<Record<number, number>>({});
  const engineRef = useRef<Record<number, IEngineState>>(engine);
  const modalShownRef = useRef<boolean>(false);
  const raceStartedRef = useRef<boolean>(false);

  useEffect(() => {
    engineRef.current = engine;
  }, [engine]);

  const stopEngine = useCallback(
    (id: number, resetToStart: boolean) => {
      dispatch(stopEngineAction(id));
      if (resetToStart) {
        dispatch(setIsStartAction(id, false));
        setPositions((prev) => ({ ...prev, [id]: 0 }));
        dispatch(setCarPositionAction(id, 0));
      } else {
        dispatch(setIsStartAction(id, false));
      }
    },
    [dispatch],
  );

  const moveCar = useCallback(
    (id: number) => {
      const carIndex = cars.findIndex((c: ICar) => c.id === id);
      if (carIndex === -1) return;

      let start = positions[id] || 0;

      const animate = () => {
        const carEngine = engineRef.current[id];
        if (!carEngine) return;

        const { velocity, status } = carEngine;

        if (status === 'stopped') {
          cancelAnimationFrame(animationRefs.current[id]);
          delete animationRefs.current[id];
          return;
        }

        start += velocity * 0.02;

        if (start >= finishLine) {
          start = finishLine;
          dispatch(stopEngineAction(id));
          setPositions((prev) => ({ ...prev, [id]: start }));
          dispatch(setCarPositionAction(id, start));
          if (!modalShownRef.current && raceStartedRef.current) {
            modalShownRef.current = true;
            setFinish(true);
            setIsModalOpen(true);
          }
          cancelAnimationFrame(animationRefs.current[id]);
          delete animationRefs.current[id];
          return;
        }

        setPositions((prev) => ({ ...prev, [id]: start }));
        dispatch(setCarPositionAction(id, start));
        animationRefs.current[id] = requestAnimationFrame(animate);
      };
      if (animationRefs.current[id]) {
        cancelAnimationFrame(animationRefs.current[id]);
      }
      animationRefs.current[id] = requestAnimationFrame(animate);
    },
    [cars, positions, dispatch],
  );

  const startEngine = useCallback(
    (id: number) => {
      dispatch(setIsStartAction(id, true));
      dispatch(startEngineAction(id));
      dispatch(setIsRaceStartAction(true));
    },
    [dispatch],
  );

  useEffect(() => {
    Object.entries(engine).forEach(([id, engineState]) => {
      const carId = Number(id);
      const { velocity, status } = engineState;

      if (status === 'started' && velocity > 0 && !animationRefs.current[carId]) {
        moveCar(carId);
      }
    });
  }, [engine, moveCar]);

  const startRace = useCallback(() => {
    modalShownRef.current = false;
    raceStartedRef.current = true;
    setFinish(false);

    Object.values(animationRefs.current).forEach((animationId) => {
      cancelAnimationFrame(animationId);
    });
    animationRefs.current = {};

    cars.forEach((car: ICar) => {
      if (!stateIsStart[car.id]) {
        startEngine(car.id);
      }
    });
  }, [cars, startEngine, stateIsStart]);

  useEffect(() => {
    if (finish && raceStartedRef.current) {
      const raceResults: RaceResult[] = cars
        .map((car: ICar) => {
          const engineState = engine[car.id];
          if (!engineState || engineState.velocity <= 0) return null;

          const timer = engineState.distance / engineState.velocity / 100;
          const time = parseFloat(timer.toFixed(2));
          return { car, time };
        })
        .filter((result): result is RaceResult => result !== null);

      if (raceResults.length > 0) {
        const win = raceResults.reduce((min, r) => (r.time < min.time ? r : min));

        const existingWinner = winners.find((w: IWinner) => w.id === win.car.id);
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
      raceStartedRef.current = false;
    }
  }, [finish, cars, engine, winners, dispatch]);

  const resetRace = useCallback(() => {
    raceStartedRef.current = false;
    modalShownRef.current = false;

    Object.values(animationRefs.current).forEach((animationId) => {
      cancelAnimationFrame(animationId);
    });
    animationRefs.current = {};

    cars.forEach((car: ICar) => {
      dispatch(stopEngineAction(car.id));
      setPositions((prev) => ({ ...prev, [car.id]: 0 }));
      dispatch(setCarPositionAction(car.id, 0));
      dispatch(setIsStartAction(car.id, false));
    });
    setFinish(false);
    dispatch(setIsRaceStartAction(false));
  }, [cars, dispatch]);
  const carPositions = useSelector(positionsSelector);

  useEffect(() => {
    if (carPositions) {
      setPositions({ ...carPositions });
    }
  }, [carPositions]);

  return {
    cars,
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
  };
};

export default GarageHook;
