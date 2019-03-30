import React from 'react';

import { Component } from 'react';
import { ReactNode } from 'react';

import { IThemeListener } from './LayoutTheme';
import { LayoutManager } from './LayoutManager';
import { LayoutRegistry } from './LayoutRegistry';
import { LayoutTheme } from './LayoutTheme';

export interface IPropsLayoutElement
{
    manager: LayoutManager;
}

export interface IStateLayoutElement
{
    activeComponent: String;
}

export abstract class LayoutElement<P extends IPropsLayoutElement, S extends IStateLayoutElement> extends Component<P, S> implements IThemeListener
{
    public constructor(props: P)
    {
        super(props);

        this.onThemeChange = this.onThemeChange.bind(this);
    }

    public render(): ReactNode
    {
        const ComponentName: Function = LayoutRegistry.INSTANCE.getComponent(this, this.state.activeComponent);
        return (
            <div>
                <ComponentName/>
            </div>
        );
    }

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

    public onThemeChange(theme: LayoutTheme): void
    {
        const currentThemeComponent: String = theme.getElementComponent(this.constructor.name);

        if (this.state.activeComponent !== currentThemeComponent)
        {
            this.setState({
                activeComponent: currentThemeComponent
            });
        }
    }
}
