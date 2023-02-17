
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { METEO_CHART_OPTIONS } from "../../constants/meteo-chart-options.constants";
import { getMeteoChartData, getMeteoChartTitleByVariableCode } from "../../services/meteo-chart-data";
import { SelectComponent } from "../select/select.components";
import { getLineChartConfiguration } from "./line-chart-config/line-chart-config";
import { LineChartProps } from "./line-chart.props";
import './line-chart.scss';

export const LineChartComponent = ({ variableCode, stationCode, title }: LineChartProps) => {
    let lineChart: any = null;
    const divId = 'line-chart';
    const [chartState, setChartState] = useState<any>({ variableCode, stationCode, title });
    const [chartLoaded, setChartLoaded] = useState<boolean>(false);
    
    useEffect(() => {
        _getChartData();
        return () => lineChart?.destroy();
    },[chartState]);

    async function _getChartData(): Promise<void> {
        if (!lineChart) {
            getMeteoChartData(chartState.variableCode, chartState.stationCode)
                .then((chartData) => _renderLineChart(chartData))
                .catch((err) => console.error('err', err))
                .finally(() => setChartLoaded(true));
        }
    }

    function _renderLineChart(chartData: any): void {
        const div = document.getElementById(divId) as HTMLCanvasElement;        
        lineChart = new Chart(div, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        data: chartData.data,
                        fill: true,
                        borderWidth: 3,
                        borderColor: 'rgb(80,151,231)',
                        backgroundColor: 'rgba(80,151,231,0.9)'
                    }
                ]
            },
            options: getLineChartConfiguration(_onProgressChartCallback, _onCompleteChartCallback)
        });
    }

    function _onProgressChartCallback() { _showValuesOnChart() }
    function _onCompleteChartCallback() { _isVisibleCanvas() }

    function _showValuesOnChart(): void {
        const ctx = lineChart.ctx;
        ctx.fillStyle = 'rgb(0, 0, 0)'; 
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = `400 10pt Helvetica Neue`;
        lineChart.getDatasetMeta(0).data.forEach((value: any, index: number) => {
            if (index % 2 === 0) {
                ctx.fillText(lineChart.data.datasets[0].data[index]?.toString()!, value.x, value.y - 5);
            }
        });
    }

    function _isVisibleCanvas() : string {
        return (chartLoaded) ? 'visible' : '';
    }

    function _onSelectedChanged(selectedVariableCode: string): void {
        setChartState({ ...chartState, variableCode: selectedVariableCode, title: getMeteoChartTitleByVariableCode(selectedVariableCode) });
    }

    return (
        <div className="chart-container">
            <div className="chart-content">
                <div className="chart-header">
                    <div className="image-container">
                        <span className="material-symbols-outlined">equalizer</span>
                    </div>
                    <div className="spacer"></div>
                    <span>Historical {chartState.title}</span>
                    <div className="spacer"></div>
                    <SelectComponent options={METEO_CHART_OPTIONS} selectChanged={_onSelectedChanged}></SelectComponent>
                </div>
                <canvas id={divId} className={_isVisibleCanvas()}></canvas>
            </div>
        </div>
    );
}