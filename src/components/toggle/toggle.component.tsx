import { useEffect, useState } from 'react';
import { newGuid } from '../../utils/guid.utils';
import { ToggleProps } from './toggle.props';
import './toggle.component.scss';

export const ToggleComponent = ({toggleChanged: onToggleChanged, id, defaultValue}: ToggleProps) => {
    const [value, setValue] = useState<boolean>(false);

    useEffect(() => {
        setValue(defaultValue || false);
    }, [defaultValue]);

    function getId() {
        return id ? id : newGuid();
    }

    function handleChange(e: React.ChangeEvent) {
        const element: any = e.target;
        setValue(element.value);
        onToggleChanged(element.checked, element.id);
    }

    return (
        <label className="switch">
            <input type="checkbox" id={getId()} checked={value} onChange={e => handleChange(e)}/>
            <span className="slider round"/>
        </label>
    )
}