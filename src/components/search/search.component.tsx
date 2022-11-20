import { ChangeEvent } from "react";

interface SearchParams {
  placeholder: string;
  searchTermChanged: Function;
}

export const SearchComponent = (params: SearchParams) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    params.searchTermChanged(event.target.value);
  }

  return (
    <>
      <div>
        <input type="text" placeholder={params.placeholder} onChange={(e) => handleChange(e)}></input>
      </div>
    </>
  );
}