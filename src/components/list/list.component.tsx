import { useCallback, useEffect, useRef, useState } from "react"
import { Town } from "../../models/town.model";
import { getTowns } from '../../services/towns.service';
import { ListItemComponent } from "../list-item/list-item.component";
import { SearchComponent } from "../search/search.component";

import './list.component.scss';

export const ListComponent = () => {
  const [page, setPage] = useState(0);
  const [towns, setTowns] = useState<Town[]>([]);
  const [displayedTowns, setDisplayedTowns] = useState<Town[]>([]);

  const observer: any = useRef();
  const lastTownElementRef = useCallback((node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(page => page + 1);
      }
    });
    if (node) observer.current.observe(node);
  },[]);

  const onSearchTermChanged = (searchTerm: string) => {
    const searchedTowns = towns.filter(town => town.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setDisplayedTowns(searchedTowns);
  }

  useEffect(() => {
    let ignoreCall = false;
    setTimeout(() => {
      const towns = getTowns(page);
      if (!ignoreCall) {
        setTowns(prev => [...prev, ...towns]);
        setDisplayedTowns(prev => [...prev, ...towns]);
      }
    }, 0);
    return () => { ignoreCall = true };
  }, [page]);

  const getTownItem = (town: Town, index: number) => {
    const isLastElement = towns.length === index + 1;
    return isLastElement
      ? <div ref={lastTownElementRef} key={town.id}></div>
      : <ListItemComponent key={town.id} town={town}></ListItemComponent>
  }

  return (
    <>
      <SearchComponent placeholder={"Type something here..."} searchTermChanged={onSearchTermChanged} ></SearchComponent>
      <div className="town-list">
          { 
            displayedTowns.map((town, index) => getTownItem(town, index))
          }
      </div>
    </>
  );
}