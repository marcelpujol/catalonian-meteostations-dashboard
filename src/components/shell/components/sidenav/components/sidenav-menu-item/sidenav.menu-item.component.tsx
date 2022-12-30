import { SideNavMenuItemProps } from './sidenav.menu-item.props';
import './sidenav.menu-item.component.scss';

export const SidenavMenuItemComponent = (props: SideNavMenuItemProps) => {

    function getSidenavMenuItemContainerClass(isActive: boolean): string {
        const defaultClass = 'sidenav-menu-item-container';
        return isActive ? `${defaultClass} active` : `${defaultClass}`;
    }

    return (
        <div className={getSidenavMenuItemContainerClass(props.menuItem.isActive)}
            onClick={() => props.onMenuClicked(props.menuItem.id, props.menuItem.path)}>
            <span className="material-symbols-outlined">{props.menuItem.icon}</span>
            <p>{props.menuItem.name}</p>
        </div>
    )
}