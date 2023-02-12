
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import { getMeteoChartData } from "../../services/meteo-chart-data";
import { getLineChartConfiguration } from "./line-chart-config/line-chart-config";
import { LineChartProps } from "./line-chart.props";
import './line-chart.scss';

export const LineChartComponent = ({ variableCode, stationCode }: LineChartProps) => {
    let lineChart: any = null;
    const divId = 'line-chart';
    
    useEffect(() => {
        _getChartData();
        return () => lineChart?.destroy();
    },[variableCode, stationCode]);

    async function _getChartData(): Promise<void> {
        if (!lineChart) {
            getMeteoChartData(variableCode, stationCode)
                .then((chartData) => _renderLineChart(chartData))
                .catch((err) => console.error('err', err));
        }
    }

    function _renderLineChart(chartData: any) {
        const div = document.getElementById(divId) as HTMLCanvasElement;        
        lineChart = new Chart(div, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Temperature (ºC)',
                        data: chartData.data,
                        fill: true,
                        borderWidth: 3,
                        borderColor: 'rgb(76,124,221)',
                        backgroundColor: 'rgba(76,124,221, 0.8)'
                    }
                ]
            },
            options: getLineChartConfiguration(_showValuesOnChart)
        });
    }

    function _showValuesOnChart() {
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

    return (
        <div className="chart-container">
            <canvas id={divId}></canvas>
        </div>
    );
}