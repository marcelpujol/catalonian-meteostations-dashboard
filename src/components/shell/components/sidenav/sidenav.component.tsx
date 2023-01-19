import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SIDENAV_MENU_ITEMS } from '../../../../constants/menu.constants';
import { SideNavMenuItem } from '../../../../models/menu/sidenav-menu-item.model';
import { closeSideNav } from '../../utils/shell.utils';
import { SidenavMenuItemComponent } from './components/sidenav-menu-item/sidenav.menu-item.component';
import { useToolbar } from '../../../../hooks/useUpdateToolbar.hook';
import './sidenav.component.scss';

export const SideNavComponent = () => {
    const [sideNavMenuItems, setSideNavMenuItems] = useState<SideNavMenuItem[]>(SIDENAV_MENU_ITEMS);
    const navigate = useNavigate();
    const { updateToolbar } = useToolbar();

    function handleClick(id: string, path: string) {
        const selectedMenuItem = sideNavMenuItems.find(menuItem => menuItem.id === id);
        if (selectedMenuItem) {
            sideNavMenuItems.map(menuItem => menuItem.isActive = false);
            selectedMenuItem.isActive = true;
            setSideNavMenuItems([...sideNavMenuItems]);
            updateToolbarTitle(selectedMenuItem);
            navigate(`/${path}`);
            closeSideNav();
        }
    }

    function onCloseClick(): void {
        closeSideNav();
    }

    function updateToolbarTitle(selectedMenuItem: SideNavMenuItem): void {
        const title = selectedMenuItem.name;
        updateToolbar(title, false);
    }

    return (
        <div className="sidenav-container">
            <div className="button-container">
                <button className="close-button" onClick={onCloseClick}>
                    <span className="material-symbols-outlined">close</span>  
                </button>
            </div>
            {
                sideNavMenuItems.map((menuItem) => {
                    let props = { menuItem, onMenuClicked: handleClick }
                    return (
                        <SidenavMenuItemComponent
                            key={menuItem.id}
                            {...props} />
                    );
                })
            }
        </div>
    )
}