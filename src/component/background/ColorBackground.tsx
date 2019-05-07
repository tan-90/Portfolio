import React from 'react';

import { ReactNode } from 'react';

import { Background } from '../../element/Background';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

/*
 * Maybe this shows that a new class isn't always required.
 * I should have an annotation that allows setting custom properties for each element/component.
 * That would make it cleaner than having different styles that differ only by a single value for example.
 */
import GrayColorBackground from '../../style/background/GrayColorBackground.scss';
import BlueColorBackground from '../../style/background/BlueColorBackground.scss';

interface IColorBackgroundStyle extends ILayoutStyle
{
    background: string;
}

@Styles<IColorBackgroundStyle>(
    { name: 'Gray', data: GrayColorBackground },
    { name: 'Blue', data: BlueColorBackground }
)
@ComponentProvider(Background, true)
export class PlainBackground extends LayoutComponent<IPropsLayoutComponent>
{
    public constructor(props: IPropsLayoutComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(PlainBackground.name)
        };
    }

    public render(): ReactNode
    {
        const style: IColorBackgroundStyle = LayoutRegistry.INSTANCE.getStyle<IColorBackgroundStyle>(this, this.state.activeStyle);

        return (
            <div className={style.background}/>
        );
    }
}
