import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import carsSelector from '../../store/selectors/GarageSelector';
import {
  addCarAction,
  deleteCarAction,
  getCarsAction,
  updateCarAction,
} from '../../store/actions/GarageActions';
import { ICar } from '../../store/reducers/type';

const GarageHook = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cars.slice(startIndex, endIndex);

  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('#000000');

  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCarName, setSelectedCarName] = useState('');
  const [selectedCarColor, setSelectedCarColor] = useState('#000000');

  useEffect(() => {
    dispatch(getCarsAction());
  }, [dispatch]);

  const createCar = () => {
    dispatch(addCarAction({ name: carName, color: carColor }));
    setCarName('');
    setCarColor('#000000');
  };

  const updateCar = () => {
    if (selectedCarId !== null) {
      dispatch(
        updateCarAction(selectedCarId, {
          name: selectedCarName,
          color: selectedCarColor,
        }),
      );
      setCarName('');
      setCarColor('#000000');
    }
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

  return {
    cars,
    currentItems,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    carName,
    setCarName,
    carColor,
    setCarColor,
    selectedCarId,
    setSelectedCarId,
    selectedCarName,
    setSelectedCarName,
    selectedCarColor,
    setSelectedCarColor,
    createCar,
    updateCar,
    removeCar,
    generateRandomCars,
  };
};

export default GarageHook;
