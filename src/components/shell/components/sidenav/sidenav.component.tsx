import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SIDENAV_MENU_ITEMS } from '../../../../constants/menu.constants';
import { SideNavMenuItem } from '../../../../models/menu/sidenav-menu-item.model';
import { updateToolbar } from '../../../../services/toolbar.service';
import { closeSideNav } from '../../utils/shell.utils';
import { SidenavMenuItemComponent } from './components/sidenav-menu-item/sidenav.menu-item.component';
import './sidenav.component.scss';

export const SideNavComponent = () => {
    const [sideNavMenuItems, setSideNavMenuItems] = useState<SideNavMenuItem[]>(SIDENAV_MENU_ITEMS);
    const navigate = useNavigate();

    function handleClick(id: string, path: string) {
        const selectedMenuItem = sideNavMenuItems.find(menuItem => menuItem.id === id);
        if (selectedMenuItem) {
            sideNavMenuItems.map(menuItem => menuItem.isActive = false);
            selectedMenuItem.isActive = true;
            setSideNavMenuItems([...sideNavMenuItems]);
            updateToolbar({ title: selectedMenuItem.name, backArrow: false, chipInfo: null! })
            navigate(`/${path}`);
            closeSideNav();
        }
    }

    function onCloseClick(): void {
        closeSideNav();
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