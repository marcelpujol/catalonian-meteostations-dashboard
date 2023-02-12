export function getLineChartConfiguration(onProgressCallback: Function) {
    return {
        events: [],
        animation: {
            onProgress: () => onProgressCallback()
        },
        scales: {
            x: { grid: { display: true, color: 'rgb(158, 158, 158)' }, ticks: { padding: 0, color: 'rgb(0, 0, 0)', font: { family: 'Helvetica Neue', weight: '400' } } },
            y: { display: false }
        },
        elements: { point: { radius: 0 } },
        plugins: { legend: { display: false } },
        layout: {
           autoPadding: true
        }
    }
}

