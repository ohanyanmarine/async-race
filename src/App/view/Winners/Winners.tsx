import React from 'react';
import CarTopIcon from '../../assets/CarTopIcon';
import Pagination from '../../components/Pagination/Pagination';
import useWinnersHook from './WinnersHook';
import './Winners.css';
import { IWinnerCar } from '../../store/reducers/type';

const Winners: React.FC = () => {
  const { winners, currentPage, setCurrentPage, itemsPerPage, currentItems, handleSort } =
    useWinnersHook();
  return (
    <div>
      <h1>WINNERS</h1>
      <div className="table-container">
        <table className="winners-table">
          <thead>
            <tr>
              <th>No</th>
              <th>CAR</th>
              <th>NAME</th>
              <th>
                <div className="sortable">
                  <span>WINS</span>
                  <div className="arrows">
                    <button type="button" onClick={() => handleSort('wins', 'asc')}>
                      ↑
                    </button>
                    <button type="button" onClick={() => handleSort('wins', 'desc')}>
                      ↓
                    </button>
                  </div>
                </div>
              </th>
              <th>
                <div className="sortable">
                  <span>BEST TIME (SECONDS)</span>
                  <div className="arrows">
                    <button type="button" onClick={() => handleSort('time', 'asc')}>
                      ↑
                    </button>
                    <button type="button" onClick={() => handleSort('time', 'desc')}>
                      ↓
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((winner: IWinnerCar) => {
              return (
                <tr key={winner.id}>
                  <td>{winner.id}</td>
                  <td>
                    <CarTopIcon color={winner.color} />
                  </td>
                  <td>{winner.name}</td>
                  <td>{winner.wins}</td>
                  <td>{winner.bestTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-bar">
        <div className="pagination">
          <Pagination
            totalItems={winners.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Winners;
