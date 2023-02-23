import { ChipProps } from "./chip.props"

import './chip.component.scss';

export const ChipComponent = ({ text }: ChipProps) => {
    return (
        <div className="chip-container">
            { text }
        </div>
    )
}