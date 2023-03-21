import { ToggleComponent } from "../../../../components/toggle/toggle.component";
import { VIEW_PREFERENCE_KEY } from "../../../../constants/storage.constants";
import { ViewOption } from "../../../../enums/view-options.enum";
import { setStoragePreference } from "../../../../services/storage.service";
import './view-selector.component.scss';
import { ViewSelectorProps } from "./view-selector.props";

export const ViewSelectorComponent = ({ viewSelectorChanged, defaultValue }: ViewSelectorProps) => {
    
    function onToggleChanged(status: boolean, id: string) {
        viewSelectorChanged(status, id);
        setViewPreference(status);
    }
    
    function setViewPreference(status: boolean) {
        const selectedViewOption = status ? ViewOption.MAP : ViewOption.GRID;
        setStoragePreference(VIEW_PREFERENCE_KEY, selectedViewOption);
    }

    return (
        <div className="view-selector-container">
            <span className="material-symbols-outlined">list</span>
            <ToggleComponent 
                toggleChanged={onToggleChanged} 
                id="view-selector-toggle"
                defaultValue={defaultValue}/>
            <span className="material-symbols-outlined">map</span>
        </div>
    )
}