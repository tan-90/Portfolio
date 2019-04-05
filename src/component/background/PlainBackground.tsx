import React from 'react';

import { ReactNode } from 'react';

import { Background } from '../../element/Background';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import Style from '../../style/background/PlainBackground.scss';
import Neon from '../../style/background/PlainBackgroundNeon.scss';

interface IPlainBackgroundStyle extends ILayoutStyle
{
    background: string;
}

@Styles<IPlainBackgroundStyle>(
    { name: 'Plain', data: Style },
    { name: 'Neon', data: Neon }
)
@ComponentProvider(Background, true)
export class PlainBackground extends LayoutComponent<IPropsLayoutComponent>
{
    public constructor(props: IPropsLayoutComponent)
    {
        super(props);

        this.state = {
            activeStyle: 'Plain'
        };
    }

    public render(): ReactNode
    {
        const style: IPlainBackgroundStyle = LayoutRegistry.INSTANCE.getStyle<IPlainBackgroundStyle>(this, this.state.activeStyle);

        return (
            <div className={style.background}>
                I'm a plain background!
            </div>
        );
    }
}
