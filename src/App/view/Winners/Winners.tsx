import React from 'react';
import CarTopIcon from '../../assets/CarTopIcon';
import Pagination from '../../components/Pagination/Pagination';
import WinnersHook from './WinnersHook';
import './Winners.css';

const Winners: React.FC = () => {
  const { winners, winnerCars, currentPage, setCurrentPage, itemsPerPage, currentItems } =
    WinnersHook();
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
              <th>WINS</th>
              <th>BEST TIME (SECONDS)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((winner) => {
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
