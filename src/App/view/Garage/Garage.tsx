import React from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import RoadComponent from '../../components/RoadComponent/RoadComponent';
import Pagination from '../../components/Pagination/Pagination';
import WinnerModal from '../../components/WinnerModal/WinnerModal';
import { ICar } from '../../store/reducers/type';
import GarageHook from './GarageHook';
import './Garage.css';

const Garage: React.FC = () => {
  const {
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
  } = GarageHook();
  return (
    <div>
      <div className="top-content">
        <div>
          <ButtonComponent
            label="Race"
            color="green"
            size="medium"
            shape="rect"
            onPress={startRace}
          />
          <ButtonComponent
            label="Reset"
            color="purple"
            size="medium"
            shape="rect"
            onPress={resetRace}
          />
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
      {cars.length !== 0 ? (
        <>
          <div className="race-track">
            <div className="lanes">
              {currentItems.map((item: ICar) => (
                <RoadComponent
                  key={item.id}
                  carColor={item.color}
                  name={item.name}
                  position={positions[item.id] ?? 0}
                  onPressSelect={() => {
                    getCar(item.id);
                    setSelectedCarId(item.id);
                  }}
                  onPressRemove={() => removeCar(item.id)}
                  onPressA={() => startEngine(item.id)}
                  onPressB={() => stopEngine(item.id)}
                  disabledA={carDisabled[item.id] ?? false}
                  disabledB={!(carDisabled[item.id] ?? false)}
                />
              ))}
            </div>
            <div className="start-line">START</div>
            <div className="finish-line">FINISH</div>
          </div>
          <div className="pagination-bar">
            <p className="no-cars">Garage ({cars.length})</p>
            <div className="pagination">
              <Pagination
                totalItems={cars.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="no-cars">No Cars</p>
        </div>
      )}
      <WinnerModal
        isOpen={isModalOpen}
        winner={selectedWinner}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Garage;
