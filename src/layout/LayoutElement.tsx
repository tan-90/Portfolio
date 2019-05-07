import React from 'react';

import { Component } from 'react';
import { Fragment } from 'react';
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
    activeComponent: string;
}

export abstract class LayoutElement<P extends IPropsLayoutElement = IPropsLayoutElement, S extends IStateLayoutElement = IStateLayoutElement> extends Component<P, S> implements IThemeListener
{
    public constructor(props: P)
    {
        super(props);
    }

    /*
     *   TypeScript is being bitchy about making this generic.
     *   So I'll type it later when I figure out what's happening.
     */
    public abstract getComponentProps(): any;

    public render(): ReactNode
    {
        const ComponentName: Function = LayoutRegistry.INSTANCE.getComponent(this, this.state.activeComponent);
        return (
            <Fragment>
                <ComponentName {...this.getComponentProps()}/>
            </Fragment>
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

    public onThemeChange(theme: LayoutTheme): boolean
    {
        const currentThemeComponent: string = theme.getElementComponent(this.constructor.name);

        if (this.state.activeComponent !== currentThemeComponent)
        {
            this.setState({
                activeComponent: currentThemeComponent
            });

            return true;
        }

        return false;
    }
}
