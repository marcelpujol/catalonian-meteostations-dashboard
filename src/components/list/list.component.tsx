import { useEffect, useState } from "react"
import { Town } from "../../models/town.model";
import { getTowns } from '../../services/towns.service';
import { ListItemComponent } from "../list-item/list-item.component";

import './list.component.scss';

export const ListComponent = () => {
  const [page, setPage] = useState(0);
  const [towns, setTowns] = useState<Town[]>([]);

  useEffect(() => {
    const towns = getTowns(page);
    setTowns(towns);
  }, [page]);

  const previousHandler = () => {
    setPage(page - 1);
  }

  const nextHandler = () => {
    setPage(page + 1);
  }

  return (
    <>
      <div className="town-list">
          { towns.map(town => <ListItemComponent key={town.id} town={town}></ListItemComponent>) }
      </div>
      <button onClick={previousHandler}>Previous Page</button>
      <button onClick={nextHandler}>Next Page</button>
    </>
  );
}