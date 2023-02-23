import { openSideNav } from '../../utils/shell.utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTheme } from '../../../../hooks/useTheme.hook';
import { ToggleComponent } from '../../../toggle/toggle.component';
import { ChipComponent } from '../../../chip/chip.component';
import { useEffect, useState } from 'react';
import { getToolbarChip } from '../../../../services/toolbar.service';
import { Subscription } from 'rxjs';
import './toolbar.component.scss';

export const ToolbarComponent = () => {
    const navigate = useNavigate();
    const { updateTheme } = useTheme();
    const title = useSelector<any, any>(state => state.toolbar.title);
    const backArrow = useSelector<any, any>(state => state.toolbar.backArrow);
    const [chipInfo, setChipInfo] = useState<string|null>();
    let subscription: Subscription;

    useEffect(() => {
        subscription = getToolbarChip().subscribe((text) => {
            setChipInfo(text);
        });

        return () => subscription.unsubscribe();
    }, []);


    function handleMenuClick(): void {
        openSideNav();
    }

    function handleBackClick(): void {
        navigate(-1);
    }

    function onToggleChanged(event: any) {
        updateTheme(event);
    }

    function getToolbarIcon(): any {
        return backArrow 
            ? <span className="material-symbols-outlined" onClick={handleBackClick}>arrow_back</span>
            : <span className="open-button material-symbols-outlined" onClick={handleMenuClick}>menu</span>;
    }

    function displayChipInfo(): any {
        return (
            chipInfo ? <ChipComponent text={chipInfo}></ChipComponent> : null
        )
    }

    function getThemeMode(): any {
        return (
            <div className="theme-container">
                <span className="material-symbols-outlined icon">light_mode</span>
                <ToggleComponent toggleChanged={onToggleChanged}></ToggleComponent>
                <span className="material-symbols-outlined icon">dark_mode</span>
            </div>
        );
    }

    return (
        <div className="toolbar-container">
            <div className="content">
                { getToolbarIcon() }
                <p>{title}</p>
                <span className="spacer"/>
                { displayChipInfo() }
                <span className="spacer"/>
                { getThemeMode() }
            </div>
        </div>
    )
}