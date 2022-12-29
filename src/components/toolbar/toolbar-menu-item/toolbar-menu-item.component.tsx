import { ToolbarMenu } from '../../../models/toolbar-menu.model';
import './toolbar-menu-item.component.scss';

export type ToolbarMenuItemProps = {
    menu: ToolbarMenu;
    onMenuClicked: any;
}

const getToolbarMenuItemContainerClass = (isActive: boolean): string => {
    const defaultClass = 'toolbar-menu-item-container';
    return isActive ? `${defaultClass} active` : `${defaultClass}`;
}

export const ToolbarMenuItemComponent = (props: ToolbarMenuItemProps) => {
    return (
        <div className={getToolbarMenuItemContainerClass(props.menu.isActive)} 
            onClick={() => props.onMenuClicked(props.menu.id, props.menu.path)}>
            <span className="material-symbols-outlined">{props.menu.icon}</span>
            <p>{props.menu.name}</p>
        </div>
    );
}