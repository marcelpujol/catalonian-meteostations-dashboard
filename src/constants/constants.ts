import { ToolbarMenu } from './../models/toolbar-menu.model';

//toolbar constants
export const TOOLBAR_MENU: ToolbarMenu[] = [
    { id: 'towns-menu-item', icon: 'location_city', name: 'Towns', path: 'towns', isActive: true },
    { id: 'stations-menu-item', icon: 'sensors', name: 'Meteostations', path: 'meteostations', isActive: false },
    { id: 'about-menu-item', icon: 'info', name: 'About', path: 'about', isActive: false }
];