import api from '..';
import { IWinner } from '../../store/reducers/type';

export const getWinnersRequest = async (): Promise<IWinner[]> => {
  try {
    const response = await api.get('/winners');
    return response.data as IWinner[];
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const getWinnerRequest = async (id: number): Promise<IWinner> => {
  try {
    const response = await api.get(`/winners/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addWinnerRequest = async (winner: {
  id: number;
  wins: number;
  time: number;
}): Promise<IWinner> => {
  const response = await api.post('/winners', winner);
  return response.data;
};

export const updateWinnerRequest = async (winner: {
  id: number;
  wins: number;
  time: number;
}): Promise<IWinner> => {
  const response = await api.put(`/winners/${winner.id}`, winner);
  return response.data;
};

export const deleteWinnerRequest = async (id: number): Promise<void> => {
  await api.delete(`/winner/${id}`);
};
