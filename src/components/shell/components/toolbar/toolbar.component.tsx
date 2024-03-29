import { openSideNav } from '../../utils/shell.utils';
import { useNavigate } from 'react-router';
import { useTheme } from '../../../../hooks/useTheme.hook';
import { ToggleComponent } from '../../../toggle/toggle.component';
import { ChipComponent } from '../../../chip/chip.component';
import { useEffect, useState } from 'react';
import { getToolbarBackArrow, getToolbarChip, getToolbarTitle } from '../../../../services/toolbar.service';
import { Subscription } from 'rxjs';
import './toolbar.component.scss';

export const ToolbarComponent = () => {
    const navigate = useNavigate();
    const { updateTheme } = useTheme();
    const [ title, setTitle ] = useState<string>();
    const [ backArrow, setBackArrow ] = useState<boolean>();
    const [ chipInfo, setChipInfo ] = useState<string>();
    const subscriptions: Subscription[] = [];

    useEffect(() => {
        const toolbarTitleSubscription = getToolbarTitle().subscribe((title) => {
            setTitle(title);
        });
        subscriptions.push(toolbarTitleSubscription);

        const toolbarBackArrowSubscription = getToolbarBackArrow().subscribe((backArrow) => {
            setBackArrow(backArrow);
        });
        subscriptions.push(toolbarBackArrowSubscription);

        const toolbarChipSubscription = getToolbarChip().subscribe((chipInfo) => {
            setChipInfo(chipInfo);
        });
        subscriptions.push(toolbarChipSubscription);

        return () => {
            subscriptions.map((subscription) => subscription.unsubscribe());
        }
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