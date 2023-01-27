import { useEffect, useState } from 'react';
import { newGuid } from '../../utils/guid.utils';
import './toggle.component.scss';
import { ToggleProps } from './toggle.props';

export const ToggleComponent = ({toggleChanged: onToggleChanged, id, defaultValue}: ToggleProps) => {
    const [state, setState] = useState({ value: defaultValue || false });

    function getId() {
        return id ? id : newGuid();
    }

    function handleChange(e: React.ChangeEvent) {
        const element: any = e.target;
        setState({ value: element.checked });
        onToggleChanged(element.checked, element.id);
    }

    return (
        <label className="switch">
            <input type="checkbox" id={getId()} checked={state.value} onChange={e => handleChange(e)}/>
            <span className="slider round"/>
        </label>
    )
}