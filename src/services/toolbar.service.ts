import { Subject, Observable } from 'rxjs';

const toolbarChip$ = new Subject<string|null>();

function setToolbarChip(text: string|null) {
    toolbarChip$.next(text);
}

function getToolbarChip(): Observable<string|null> {
    return toolbarChip$.asObservable();
}

//move this function inside the utils folder
function parseLastUpdateDate(lastupdate: string): string {
    const lastUpdateDate = new Date(lastupdate);
    const date = lastUpdateDate.toLocaleDateString();
    const time = lastUpdateDate.toLocaleTimeString().substring(0,5);
    return `${date} at ${time}`;
}

export { setToolbarChip, getToolbarChip, parseLastUpdateDate };