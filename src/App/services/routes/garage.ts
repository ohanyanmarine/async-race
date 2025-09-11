import api from '..';
import { ICar } from '../../store/reducers/type';

export const getCarsRequest = async (): Promise<ICar[]> => {
  try {
    const response = await api.get('/garage');
    return response.data as ICar[];
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const getCarRequest = async (id: number): Promise<ICar> => {
  try {
    const response = await api.get(`/garage/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCarRequest = async (car: { name: string; color: string }): Promise<ICar> => {
  const response = await api.post('/garage', car);
  return response.data;
};

export const updateCarRequest = async (
  id: number,
  data: { name: string; color: string },
): Promise<ICar> => {
  const response = await api.put(`/garage/${id}`, data);
  return response.data;
};

export const deleteCarRequest = async (id: number): Promise<void> => {
  await api.delete(`/garage/${id}`);
};

export const switchEngineRequest = async (id: number, status: 'started' | 'stopped' | 'drive') => {
  try {
    const response = await api.patch(`/engine?id=${id}&status=${status}`);

    if (response.status === 500) {
      throw new Error(`Car ${id} engine broken`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
