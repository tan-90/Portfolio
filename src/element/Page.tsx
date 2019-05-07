import { ReactNode } from 'react';

import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';
import { IPropsLayoutComponent } from '../layout/LayoutComponent';

export interface IPropsPageComponent extends IPropsLayoutComponent
{
    name: string;
    children: ReactNode;
}

interface IPropsPageElement extends IPropsLayoutElement
{
    name: string;
}

@ElementProvider()
export class Page extends LayoutElement<IPropsPageElement>
{
    constructor(props: IPropsPageElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Page.name)
        };
    }

    public getComponentProps(): IPropsPageComponent
    {
        return {
            manager: this.props.manager,

            name: this.props.name,
            children: this.props.children
        };
    }
}
