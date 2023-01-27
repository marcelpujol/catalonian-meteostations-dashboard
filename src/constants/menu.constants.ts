import { SideNavMenuItem } from "../models/menu/sidenav-menu-item.model";

export const SIDENAV_MENU_ITEMS: SideNavMenuItem[] = [
    { id: 'towns-menu-item', icon: 'location_city', name: 'Towns', path: 'towns', isActive: true },
    { id: 'stations-menu-item', icon: 'sensors', name: 'Meteostations', path: 'meteostations', isActive: false },
    { id: 'settings-menu-item', icon: 'settings', name: 'Settings', path: 'settings', isActive: false },
    { id: 'about-menu-item', icon: 'info', name: 'About', path: 'about', isActive: false },
]