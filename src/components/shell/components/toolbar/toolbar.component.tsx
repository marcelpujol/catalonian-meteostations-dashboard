import { openSideNav } from '../../utils/shell.utils';
import './toolbar.component.scss';

export const ToolbarComponent = () => {

    function handleClick(): void {
        openSideNav();
    }

    return (
        <div className="toolbar-container">
            <div className="content">
                <span className="open-button material-symbols-outlined" onClick={handleClick}>menu</span>
                <p>Catalonia Data</p>
            </div>
        </div>
    )
}