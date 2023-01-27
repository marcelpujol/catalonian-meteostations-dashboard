import { newGuid } from '../../utils/guid.utils';
import './toggle.component.scss';
import { ToggleProps } from './toggle.props';

export const ToggleComponent = ({toggleChanged: onToggleChanged, id, defaultValue}: ToggleProps) => {

    function getId() {
        return id ? id : newGuid();
    }

    function handleChange(e: React.ChangeEvent) {
        const element: any = e.target;
        onToggleChanged(element.checked, element.id);
    }

    return (
        <label className="switch">
            <input type="checkbox" id={getId()} checked={defaultValue} onChange={e => handleChange(e)}/>
            <span className="slider round"/>
        </label>
    )
}