import { SideNavMenuItem } from "../../../../../../models/menu/sidenav-menu-item.model";

export interface SideNavMenuItemProps {
    menuItem: SideNavMenuItem;
    onMenuClicked: Function;
}