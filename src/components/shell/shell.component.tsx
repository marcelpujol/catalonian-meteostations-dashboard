import { SideNavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import './shell.component.scss';

export const ShellComponent = ({children}: any) => {
    return (
        <div className="wrapper">
            <ToolbarComponent></ToolbarComponent>
            <SideNavComponent></SideNavComponent>
            {children}
        </div>
    )
}