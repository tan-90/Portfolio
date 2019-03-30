import React from 'react';

import { ReactNode } from 'react';

import { Background } from '../Background';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { IStateLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';

@ComponentProvider(Background, true)
export class PlainBackground extends LayoutComponent<IPropsLayoutComponent, IStateLayoutComponent>
{
    public render(): ReactNode
    {
        return (
            <div>
                I'm a plain background!
            </div>
        );
    }
}
