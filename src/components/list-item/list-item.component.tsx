import { Town } from "../../models/town.model"

interface TownListParams {
  town: Town;
}

export const ListItemComponent = (params: TownListParams) => {
  return (
    <div className="town-item">
      <p>{params.town.name}</p>
      <img src={params.town.logo}/>
    </div>
  )
}