import { Component } from 'react';

import { LayoutManager } from './LayoutManager';

export interface IPropsLayoutComponent
{
    manager: LayoutManager;
}

export interface IStateLayoutComponent
{

}

export class LayoutComponent<P extends IPropsLayoutComponent, S extends IStateLayoutComponent> extends Component<P, S>
{

}
