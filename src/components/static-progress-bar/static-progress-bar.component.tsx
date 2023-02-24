import { useEffect, useState } from 'react';
import { StaticProgressBarProps } from './static-progress-bar.props';
import './static-progress-bar.component.scss';

export const StaticProgressBarComponent = ({ min, max, value }: StaticProgressBarProps) => {
    const [ progressBarValue, setProgressBarValue ] = useState<number>();

    useEffect(() => {
        const scale = max - min;
        const middleValue = (value / scale);
        const valueToDisplay = (middleValue < 1) ? middleValue * 100 : middleValue * 10;
        setProgressBarValue(valueToDisplay);
    }, [min, max, value]);

    return (
        <div className="progress-bar-container">
            <div className="scale-container">
                <span>{min}</span>
                <span>{(max + min) / 2}</span>
                <span>{max}</span>
            </div>
            <div className="all-static-progress-bar">
                <div className="completed-static-progress-bar" style={{ width: `${progressBarValue}%` }}></div>
            </div>
        </div>
    );
}