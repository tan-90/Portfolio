import React from 'react';

import { ReactNode } from 'react';

import { Background } from '../Background';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { IStateLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { LayoutStyle } from '../../layout/LayoutStyle';
import { Styles } from '../../layout/Styles';

import Style from '../../style/background/AnimatedBackground.scss';

@Styles(
    new LayoutStyle('background', new Map([
        ['base', { className: Style.background }],
    ]))
)
@ComponentProvider(Background)
export class AnimatedBackground extends LayoutComponent<IPropsLayoutComponent, IStateLayoutComponent>
{
    public constructor(props: IPropsLayoutComponent)
    {
        super(props);

        this.state = {
            activeStyle: 'background'
        };
    }

    public render(): ReactNode
    {
        const style: LayoutStyle = LayoutRegistry.INSTANCE.getStyle(this, this.state.activeStyle);
        const baseClass: string = style.getAtrribute('base').className;

        return (
            <div className={baseClass}>
                I'm an animated background!
            </div>
        );
    }
}
