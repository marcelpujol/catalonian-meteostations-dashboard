import { useEffect, useState } from 'react';
import { TemperatureProgressBarProps } from './temperature-progress-bar.props';
import './temperature-progress-bar.scss';

interface TemperatureState {
    positiveValue: number;
    negativeValue: number;
}

export const TemperatureProgressBar = ({ value, min, max }: TemperatureProgressBarProps) => {
    const [ state, setState ] = useState<TemperatureState>({ positiveValue: 0, negativeValue: 0});

    useEffect(() => {
        const posValueToDisplay = (Math.abs(value) * 100) / max;
        const negValueToDisplay = (Math.abs(value) * 100 / Math.abs(min));
        value < 0 
            ? setState({...state, negativeValue: negValueToDisplay }) 
            : setState({...state, positiveValue: posValueToDisplay});
    }, [value]);

    return (
        <div className="temperature-progress-bar-container">
            <div className="scale">
                <span>{min}</span>
                <div className="spacer"></div>
                <span>0</span>
                <div className="spacer"></div>
                <span>{max}</span>
            </div>
            <div className="temperature-progress-bar">
                <div className="negative-range">
                    <div className="negative-value" style={{ width: `${state.negativeValue}%` }}></div>
                </div>
                |
                <div className="positive-range">
                    <div className="positive-value" style={{ width: `${state.positiveValue}%` }}></div>
                </div>
            </div>
        </div>
    );
}