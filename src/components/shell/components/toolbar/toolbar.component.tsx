import { openSideNav } from '../../utils/shell.utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './toolbar.component.scss';

export const ToolbarComponent = () => {
    const navigate = useNavigate();
    const title = useSelector<any, any>(state => state.toolbar.title);
    const backArrow = useSelector<any, any>(state => state.toolbar.backArrow);

    function handleMenuClick(): void {
        openSideNav();
    }

    function handleBackClick(): void {
        navigate(-1);
    }

    function getToolbarIcon(): any {
        return backArrow 
            ? <span className="material-symbols-outlined" onClick={handleBackClick}>arrow_back</span>
            : <span className="open-button material-symbols-outlined" onClick={handleMenuClick}>menu</span>;
    }

    return (
        <div className="toolbar-container">
            <div className="content">
                { getToolbarIcon() }
                <p>{title}</p>
            </div>
        </div>
    )
}