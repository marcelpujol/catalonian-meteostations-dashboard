import { Town } from "../../models/town.model"

import './list-item.component.scss';

interface TownListParams {
  town: Town;
}

export const ListItemComponent = (params: TownListParams) => {
  return (
    <div className="town-item">
      <img src={params.town.logo} alt="town logo"/>
      <div className="town-info">
        <div className="col">
          <div className="category">
            <p>Nom</p>
            <p>{params.town.name}</p>
          </div>
          <div className="category">
            <p>Altitud</p>
            <p>{params.town.altitude}</p>
          </div>
        </div>
        <div className="col">
          <div className="category">
            <p>Comarca</p>
            <p>{params.town.region.name}</p>
          </div>
          <div className="category">
            <p>Superficie (km2)</p>
            <p>{params.town.area}</p>
          </div>
        </div>
        <div className="col">
          <div className="category">
            <p>Provincia</p>
            <p>{params.town.land.name}</p>
          </div>
          <div className="category">
            <p>Habitants</p>
            <p>{params.town.population}</p>
          </div>
        </div>
      </div>
    </div>
  )
}