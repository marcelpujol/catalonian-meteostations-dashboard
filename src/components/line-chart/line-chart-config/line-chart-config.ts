export function getLineChartConfiguration(onProgressCallback: Function = () => {}, onCompleteCallback: Function = () => {}) {
    return {
        events: [],
        animation: {
            onProgress: () => onProgressCallback(),
            onComplete: () => onCompleteCallback()
        },
        scales: {
            x: { grid: { display: true, color: 'rgb(158, 158, 158)' }, ticks: { padding: 0, color: 'rgb(0, 0, 0)', font: { family: 'Helvetica Neue', weight: '400' } } },
            y: { display: false }
        },
        elements: { point: { radius: 0 } },
        plugins: { legend: { display: false } },
        layout: { padding: { top: 50, right: 8, left: 25, bottom: 8 } }
    }
}

