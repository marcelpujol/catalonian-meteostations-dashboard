import { openSideNav } from '../../utils/shell.utils';
import { useSelector } from 'react-redux';
import './toolbar.component.scss';

export const ToolbarComponent = () => {
    const title = useSelector<any, any>(state => state.toolbar.title);

    function handleClick(): void {
        openSideNav();
    }

    return (
        <div className="toolbar-container">
            <div className="content">
                <span className="open-button material-symbols-outlined" onClick={handleClick}>menu</span>
                <p>{title}</p>
            </div>
        </div>
    )
}