
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import { getMeteoChartData } from "../../services/meteo-chart-data";
import { LineChartProps } from "./line-chart.props";
import './line-chart.scss';

export const LineChartComponent = ({ variableCode, stationCode }: LineChartProps) => {
    let myLineChart: Chart<any>;
    const divId = 'line-chart';
    
    useEffect(() => {
        if (myLineChart) {
            myLineChart.destroy();
        }
        _getChartData();
    },[variableCode, stationCode]);

    async function _getChartData(): Promise<void> {
        getMeteoChartData(variableCode, stationCode)
            .then((chartData) => _renderLineChart(chartData))
            .catch((err) => console.error('err', err));
    }

    function _renderLineChart(chartData: any) {
        const div = document.getElementById(divId) as HTMLCanvasElement;        
        myLineChart = new Chart(div, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Temperature (ºC)',
                        data: chartData.data,
                        fill: false,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                events: [],
                animation: {
                    onProgress: function() {
                        let ctx = myLineChart.ctx;
                        ctx.fillStyle = 'rgb(158, 158, 158)'; 
                        ctx.textAlign = "center";
                        ctx.textBaseline = "bottom";
                        ctx.font = `400 10pt Helvetica Neue`;
                        myLineChart.getDatasetMeta(0).data.forEach((value, index) => {
                            if (index % 2 === 0) ctx.fillText(myLineChart.data.datasets[0].data[index]?.toString()!, value.x, value.y - 10);
                        });
                    }
                },
                scales: {
                    x: { grid: { display: true }, ticks: { padding: 0, color: 'rgb(158, 158, 158)', font: { family: 'Helvetica Neue', weight: '400' } } },
                    y: { display: false, grid: { display: false } }
                    
                },
                elements: {
                    point: { radius: 1 }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            usePointStyle: true,
                            boxWidth: 150,
                            font: { family: 'Helvetica Neue', weight: '400' },
                            color: 'rgb(158, 158, 158)',
                        },
                        title: {
                            padding: 5
                        }
                    }
                }
            }
        });
    }

    return (
        <div className="chart-container">
            <canvas id={divId}></canvas>
        </div>
    );
}