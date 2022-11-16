import { useEffect, useState } from "react"
import { Town } from "../../models/town.model";
import { getTowns } from '../../services/towns.service';
import { ListItemComponent } from "../list-item/list-item.component";

export const ListComponent = () => {
  const [page, setPage] = useState(0);
  const [towns, setTowns] = useState<Town[]>([]);

  useEffect(() => {
    const towns = getTowns(page);
    setTowns(towns);
  }, [page]);

  return (
    <div className="town-list">
        { towns.map(town => <ListItemComponent town={town}></ListItemComponent>) }
    </div>
  );
}