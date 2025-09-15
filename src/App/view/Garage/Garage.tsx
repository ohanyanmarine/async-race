import React from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import Pagination from '../../components/Pagination/Pagination';
import RoadComponent from '../../components/RoadComponent/RoadComponent';
import WinnerModal from '../../components/WinnerModal/WinnerModal';
import { ICar } from '../../store/reducers/type';
import './Garage.css';
import GarageHook from './GarageHook';

const Garage: React.FC = () => {
  const {
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
    startRace,
    getCar,
    resetRace,
    isModalOpen,
    setIsModalOpen,
    selectedWinner,
    stateCurrentPage,
    handlePageChange,
    stateIsRaceStart,
    stateIsStart,
  } = GarageHook();
  return (
    <div className="main-content">
      <div className="header">
        <div className="inpurs">
          <ButtonComponent
            label="Race"
            color="green"
            size="medium"
            shape="rect"
            onPress={startRace}
            disabled={stateIsRaceStart}
          />
          <ButtonComponent
            label="Reset"
            color="purple"
            size="medium"
            shape="rect"
            onPress={resetRace}
            disabled={!stateIsRaceStart}
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
            disabled={stateIsRaceStart}
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
            disabled={stateIsRaceStart}
          />
        </div>
        <ButtonComponent
          label="Generate cars"
          color="green"
          size="medium"
          shape="rect"
          onPress={generateRandomCars}
          disabled={stateIsRaceStart}
        />
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
                  onPressB={() => stopEngine(item.id, true)}
                  disabledA={stateIsStart[item.id]}
                  disabledB={!stateIsStart[item.id]}
                  isRace={stateIsRaceStart}
                />
              ))}
            </div>
            <div className="start-line">START</div>
            <div className="finish-line">FINISH</div>
          </div>
          <div className="footer">
            <div className="pagination-bar">
              <p className="no-cars">Garage ({cars.length})</p>
              <div className="pagination">
                <Pagination
                  totalItems={cars.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={stateCurrentPage}
                  onPageChange={handlePageChange}
                  isRace={stateIsRaceStart}
                />
              </div>
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
