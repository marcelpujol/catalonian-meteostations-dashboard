import { SelectProps } from "./select.props";

import './select.component.scss';

export const SelectComponent = ({ options, selectChanged }: SelectProps) => {

    function _handleChange(e: React.ChangeEvent): void {
        const value = (e.currentTarget as any).value;
        selectChanged(value);
    }

    return (
        <select className="select-component" onChange={(e) => _handleChange(e)}>
            { options.map(option => <option value={option.value}>{option.name}</option>) }
        </select>
    );
}