import './toggle.component.scss';
import { ToggleProps } from './toggle.props';

export const ToggleComponent = ({toggleChanged: onToggleChanged}: ToggleProps) => {
    function handleChange(e: React.ChangeEvent) {
        const element: any = e.target;
        onToggleChanged(element.checked);
    }

    return (
        <label className="switch">
            <input type="checkbox" onChange={e => handleChange(e)}/>
            <span className="slider round"/>
        </label>
    )
}