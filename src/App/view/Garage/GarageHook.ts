import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const carPositions = useSelector(positionsSelector);

  const itemsPerPage = 7;
  const indexOfLastItem = stateCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('#000000');
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCarName, setSelectedCarName] = useState('');
  const [selectedCarColor, setSelectedCarColor] = useState('#000000');

  const [positions, setPositions] = useState<Record<number, number>>({});
  const [finish, setFinish] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const animationRefs = useRef<Record<number, number>>({});
  const engineRef = useRef<Record<number, IEngineState>>(engine);
  const modalShownRef = useRef(false);
  const raceStartedRef = useRef(false);
  const finishedCarsRef = useRef<Set<number>>(new Set());
  const waitersRef = useRef<Record<number, (v?: void) => void>>({});

  // const finishLine = window.innerWidth * 0.65;
  const finishLineRef = useRef<HTMLDivElement | null>(null);
  const raceTrackRef = useRef<HTMLDivElement | null>(null);
  const startLineRef = useRef<HTMLDivElement | null>(null);

  const [finishLine, setFinishLine] = useState(0);

  useLayoutEffect(() => {
    const updateFinishLine = () => {
      if (finishLineRef.current && startLineRef.current && raceTrackRef.current) {
        const finishrect = finishLineRef.current.getBoundingClientRect();
        const rect1 = raceTrackRef.current.getBoundingClientRect();
        const startrect = startLineRef.current.getBoundingClientRect();
        console.log('startrect ', startrect);
        console.log('rect1 ', rect1);
        console.log('finishrect ', finishrect);
        const containerRect = finishLineRef.current.parentElement?.getBoundingClientRect();
        const carWidth = 50;
        if (containerRect) {
          setFinishLine(finishrect.x - startrect.x + carWidth + finishrect.width);
        }
      }
    };

    updateFinishLine();

    window.addEventListener('resize', updateFinishLine);
    return () => window.removeEventListener('resize', updateFinishLine);
  }, [cars]);
  useEffect(() => {
    engineRef.current = engine;
    console.log('finishLineRef.current:', finishLineRef.current);
    console.log('finishLine:', finishLine);
  }, [engine]);

  useEffect(() => {
    dispatch(getCarsAction());
    dispatch(getWinnersAction());
    dispatch(getCurrentStateAction());
  }, []);

  useEffect(() => {
    if (carPositions) setPositions({ ...carPositions });
  }, []);

  const validateCarName = (name: string) => name.trim().length >= 3 && name.trim().length <= 15;

  const resetCarForm = () => {
    setCarName('');
    setCarColor('#000000');
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageAction(page));
  };

  const createCar = () => {
    if (!validateCarName(carName)) {
      alert('Car name must be 3–15 characters and not empty.');
      return;
    }
    dispatch(addCarAction({ name: carName, color: carColor }));
    resetCarForm();
  };

  const updateCar = () => {
    if (selectedCarId === null || !validateCarName(selectedCarName)) {
      alert('Car name must be 3–15 characters and not empty.');
      return;
    }
    dispatch(updateCarAction(selectedCarId, { name: selectedCarName, color: selectedCarColor }));
    resetCarForm();
  };

  const getCar = (id: number) => dispatch(getCarAction(id));

  const removeCar = (id: number) => {
    dispatch(deleteCarAction(id));
    if (winners.find((w: IWinner) => w.id === id)) {
      dispatch(deleteWinnerAction(id));
    }
    const totalItemsAfter = cars.length - 1;
    const totalPages = Math.ceil(totalItemsAfter / itemsPerPage);
    if (stateCurrentPage > totalPages) {
      dispatch(setCurrentPageAction(totalPages || 1));
    }
  };

  const generateRandomCars = () => {
    for (let i = 0; i < 100; i++) {
      const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
      const model = carModels[Math.floor(Math.random() * carModels.length)];
      const color = carColors[Math.floor(Math.random() * carColors.length)];
      dispatch(addCarAction({ name: `${brand} ${model}`, color }));
    }
  };

  const clearAnimations = () => {
    Object.values(animationRefs.current).forEach(cancelAnimationFrame);
    animationRefs.current = {};
  };

  const stopEngine = (id: number, resetToStart: boolean) => {
    const eng = engineRef.current[id];
    if (eng && eng.status !== 'stopped') dispatch(stopEngineAction(id));
    dispatch(setIsStartAction(id, false));
    const pos = resetToStart ? 0 : positions[id] || 0;
    setPositions((prev) => ({ ...prev, [id]: pos }));
    dispatch(setCarPositionAction(id, pos));
  };

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

        start += velocity * 0.05;

        console.log('start: ', start);
        console.log('positions: ', positions[id]);

        if (start >= finishLine) {
          start = finishLine;
          if (!finishedCarsRef.current.has(id)) {
            finishedCarsRef.current.add(id);
            dispatch(stopEngineAction(id));
            setPositions((prev) => ({ ...prev, [id]: start }));
            if (!modalShownRef.current && raceStartedRef.current) {
              modalShownRef.current = true;
              setFinish(true);
              setIsModalOpen(true);
            }
          }
          cancelAnimationFrame(animationRefs.current[id]);
          delete animationRefs.current[id];
          return;
        }

        setPositions((prev) => ({ ...prev, [id]: start }));
        dispatch(setCarPositionAction(id, start));
        animationRefs.current[id] = requestAnimationFrame(animate);
      };
      if (animationRefs.current[id]) cancelAnimationFrame(animationRefs.current[id]);
      animationRefs.current[id] = requestAnimationFrame(animate);
    },
    [cars, positions],
  );

  useEffect(() => {
    Object.entries(engine).forEach(([id, eng]) => {
      const carId = Number(id);
      if (eng.status === 'started' && eng.velocity > 0) {
        const resolve = waitersRef.current[carId];
        if (resolve) {
          resolve();
          delete waitersRef.current[carId];
        }
      }
    });
  }, [engine]);

  const waitForEngineStart = (id: number) =>
    new Promise<void>((resolve) => {
      waitersRef.current[id] = resolve;
    });

  const startEngine = useCallback(
    async (id: number) => {
      dispatch(setIsStartAction(id, true));
      dispatch(startEngineAction(id));
      dispatch(setIsRaceStartAction(true));
      await waitForEngineStart(id);
      moveCar(id);
    },
    [dispatch, moveCar],
  );

  const startRace = useCallback(async () => {
    modalShownRef.current = false;
    raceStartedRef.current = true;
    setFinish(false);
    clearAnimations();

    const promises = cars
      .filter((car: ICar) => !stateIsStart[car.id])
      .map((car: ICar) => {
        dispatch(setIsStartAction(car.id, true));
        dispatch(setIsRaceStartAction(true));
        dispatch(startEngineAction(car.id));
        return waitForEngineStart(car.id);
      });

    await Promise.all(promises);
    cars.forEach((car) => moveCar(car.id));
  }, [cars, stateIsStart, dispatch, moveCar]);

  useEffect(() => {
    if (finish && raceStartedRef.current) {
      Object.entries(positions).forEach(([carId, position]) => {
        dispatch(setCarPositionAction(Number(carId), position));
      });

      const raceResults: RaceResult[] = cars
        .map((car: ICar) => {
          const engineState = engine[car.id];
          if (!engineState || engineState.velocity <= 0) return null;
          const timer = engineState.distance / engineState.velocity / 100;
          return { car, time: parseFloat(timer.toFixed(2)) };
        })
        .filter((r): r is RaceResult => r !== null);

      if (raceResults.length > 0) {
        const win = raceResults.reduce((min, r) => (r.time < min.time ? r : min));
        const existingWinner = winners.find((w: IWinner) => w.id === win.car.id);
        const winCount = existingWinner ? existingWinner.wins + 1 : 1;
        const bestTime = existingWinner ? Math.min(existingWinner.time, win.time) : win.time;

        if (existingWinner) {
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
  }, [finish, positions, cars, engine, winners, dispatch]);

  const resetRace = () => {
    raceStartedRef.current = false;
    modalShownRef.current = false;
    clearAnimations();
    cars.forEach((car: ICar) => stopEngine(car.id, true));
    setFinish(false);
    dispatch(setIsRaceStartAction(false));
  };

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
    finishLineRef,
    raceTrackRef,
    startLineRef,
  };
};

export default GarageHook;
