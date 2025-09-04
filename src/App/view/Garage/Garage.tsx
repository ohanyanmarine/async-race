import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import Header from '../Header/Header';
import RoadComponent from '../../components/RoadComponent/RoadComponent';
import Pagination from '../../components/Pagination/Pagination';
import './Garage.css';
import GarageHook from './GarageHook';
import { ICar } from '../../store/reducers/type';

const Garage: React.FC = () => {
  const {
    cars,
    currentItems,
    currentPage,
    setCurrentPage,
    itemsPerPage,
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
  } = GarageHook();

  return (
    <div>
      <Header />
      <div className="top-content">
        <div>
          <ButtonComponent label="Race" color="green" size="medium" shape="rect" />
          <ButtonComponent label="Reset" color="purple" size="medium" shape="rect" />
        </div>
        <div className="inputs">
          <InputComponent
            type="text"
            placeholder="Type car brand"
            value={carName}
            onChange={setCarName}
          />
          <InputComponent type="color" value={carColor} onChange={setCarColor} />
          <ButtonComponent
            label="Create"
            color="purple"
            size="medium"
            shape="rect"
            onPress={createCar}
          />
        </div>
        <div className="inputs">
          <InputComponent
            type="text"
            placeholder="Type car brand"
            value={selectedCarName}
            onChange={setSelectedCarName}
          />
          <InputComponent type="color" value={selectedCarColor} onChange={setSelectedCarColor} />
          <ButtonComponent
            label="Update"
            color="purple"
            size="medium"
            shape="rect"
            onPress={updateCar}
          />
        </div>
        <div>
          <ButtonComponent
            label="Generate cars"
            color="green"
            size="medium"
            shape="rect"
            onPress={generateRandomCars}
          />
        </div>
      </div>
      <div className="race-track">
        <div className="lanes">
          {currentItems.map((item: ICar) => (
            <RoadComponent
              key={item.id}
              carColor={item.color}
              name={item.name}
              onPressSelect={() => item.id && setSelectedCarId(item.id)}
              onPressRemove={() => item.id && removeCar(item.id)}
            />
          ))}
        </div>
        <div className="start-line">START</div>
        <div className="finish-line">FINISH</div>
      </div>
      <div className="pagination-bar">
        <p>Garage ({cars.length})</p>
        <div className="pagination">
          <p>Page</p>
          <Pagination
            totalItems={cars.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Garage;
