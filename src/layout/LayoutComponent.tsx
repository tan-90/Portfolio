import { Component } from 'react';

import { IThemeListener } from './LayoutTheme';
import { LayoutManager } from './LayoutManager';
import { LayoutTheme } from './LayoutTheme';

export interface IPropsLayoutComponent
{
    manager: LayoutManager;
}

export interface IStateLayoutComponent
{
    activeStyle: string;
}

export abstract class LayoutComponent<P extends IPropsLayoutComponent = IPropsLayoutComponent, S extends IStateLayoutComponent = IStateLayoutComponent> extends Component<P, S> implements IThemeListener
{
    public componentDidMount()
    {
        const { manager } = this.props;

        manager.registerThemeListener(this);
    }

    public componentWillUnmount()
    {
        const { manager } = this.props;

        manager.unregisterThemeListener(this);
    }

    public onThemeChange(theme: LayoutTheme): boolean
    {
        const currentThemeStyle: string = theme.getComponentStyle(this.constructor.name);

        if (this.state.activeStyle !== currentThemeStyle)
        {
            this.setState({
                activeStyle: currentThemeStyle
            });

            return true;
        }

        return false;
    }
}
