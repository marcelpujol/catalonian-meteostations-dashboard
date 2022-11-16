import { useEffect } from "react"
import { getTown } from '../../services/town.service';

export const ListComponent = () => {

  useEffect(() => {
    const townId = "082325";
    getTown(townId)
      .then((result) => {
        console.log('town result', result);
        console.log('YEAH!!!');
      })
      .catch(() => {
        console.error('OUCH!!!');
      })
  }, []);

  return (
    <div>
        List of towns
    </div>
  )
}