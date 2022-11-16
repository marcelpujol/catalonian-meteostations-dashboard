import data from '../data/data.json';
import { Town } from '../models/town.model';
import { mapToTown } from './town.service';

export const getTowns = (currentPage: number = 0, pageSize: number = 10) => {
  const result: any = data;
  const firstIndex = currentPage * pageSize;
  const secondIndex = firstIndex + pageSize;

  const dataSubset = result.elements.slice(firstIndex, secondIndex);
  console.log('dataSubset', dataSubset);
  const towns: Town[] = [];
  for (const data of dataSubset) {
    towns.push(mapToTown(data));
  }
}

