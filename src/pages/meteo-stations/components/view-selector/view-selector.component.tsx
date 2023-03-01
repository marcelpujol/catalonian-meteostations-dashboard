import { ToggleComponent } from "../../../../components/toggle/toggle.component";
import './view-selector.component.scss';
import { ViewSelectorProps } from "./view-selector.props";

export const ViewSelectorComponent = ({ viewSelectorChanged }: ViewSelectorProps) => {
    
    function onToggleChanged(status: boolean, id: string) {
        viewSelectorChanged(status, id);
    }

    return (
        <div className="view-selector-container">
            <span className="material-symbols-outlined">list</span>
            <ToggleComponent 
                toggleChanged={onToggleChanged} 
                id="view-selector-toggle"
                defaultValue={false}/>
            <span className="material-symbols-outlined">map</span>
        </div>
    )
}