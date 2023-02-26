import { ToolbarState } from './../components/shell/components/toolbar/toolbar.state';
import { Subject, Observable } from 'rxjs';

const toolbarTitle$ = new Subject<string>();
const toolbarBackArrow$ = new Subject<boolean>();
const toolbarChip$ = new Subject<string>();

function setToolbarTitle(toolbarTitle: string) {
    toolbarTitle$.next(toolbarTitle);
}

function getToolbarTitle(): Observable<string> {
    return toolbarTitle$.asObservable();
}

function setToolbarBackArrow(backArrow: boolean) {
    toolbarBackArrow$.next(backArrow);
} 

function getToolbarBackArrow(): Observable<boolean> {
    return toolbarBackArrow$.asObservable();
}

function setToolbarChip(toolbarChip: string) {
    toolbarChip$.next(toolbarChip);
}

function getToolbarChip(): Observable<string> {
    return toolbarChip$.asObservable();
}

function updateToolbar(toolbarState: ToolbarState) {
    setToolbarTitle(toolbarState.title);
    setToolbarBackArrow(toolbarState.backArrow);
    setToolbarChip(toolbarState.chipInfo);
}

//move this function inside the utils folder
function parseLastUpdateDate(lastupdate: string): string {
    const lastUpdateDate = new Date(lastupdate);
    const date = lastUpdateDate.toLocaleDateString();
    const time = lastUpdateDate.toLocaleTimeString().substring(0,5);
    return `${date} at ${time}`;
}

export { 
    getToolbarTitle,
    getToolbarBackArrow,
    setToolbarChip,
    getToolbarChip,
    updateToolbar,
    parseLastUpdateDate 
};