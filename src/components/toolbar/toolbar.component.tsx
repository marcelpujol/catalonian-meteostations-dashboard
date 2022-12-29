import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TOOLBAR_MENU } from '../../constants/constants';
import { ToolbarMenu } from '../../models/toolbar-menu.model';
import { ToolbarMenuItemComponent } from './toolbar-menu-item/toolbar-menu-item.component';
import './toolbar.component.scss';

export const ToolbarComponent = () => {
    const [toolbarMenu, setToolbarMenu] = useState<ToolbarMenu[]>(TOOLBAR_MENU);
    const navigate = useNavigate();

    const handleClick = (id: string, path: string) => {
        const selectedMenuItem = toolbarMenu.find(menu => menu.id === id);
        if (selectedMenuItem) {
            toolbarMenu.map((menu) => menu.isActive = false);
            selectedMenuItem.isActive = true;
            setToolbarMenu([...toolbarMenu]);
            navigate(`/${path}`);
        }
    }

    return (
        <div className="toolbar-container">
            <div className="sections-container">
                { 
                    toolbarMenu.map((menu) => {
                        let props = { menu, onMenuClicked: handleClick }
                        return (
                            <ToolbarMenuItemComponent
                                key={menu.id}
                                {...props}/>
                        );
                    }) 
                }
            </div>
        </div>
    )
}