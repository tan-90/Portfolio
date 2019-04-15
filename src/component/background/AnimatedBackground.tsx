import React from 'react';

import { ReactNode } from 'react';

import { Background } from '../../element/Background';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { Styles } from '../../layout/Styles';

import Style from '../../style/background/AnimatedBackground.scss';

interface IAnimatedBackgroundStyle extends ILayoutStyle
{
    background: string;
}

@Styles<IAnimatedBackgroundStyle>(
    { name: 'Plain', data: Style }
)
@ComponentProvider(Background)
export class AnimatedBackground extends LayoutComponent<IPropsLayoutComponent>
{
    public constructor(props: IPropsLayoutComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(AnimatedBackground.name)
        };
    }

    public render(): ReactNode
    {
        const style: IAnimatedBackgroundStyle = LayoutRegistry.INSTANCE.getStyle<IAnimatedBackgroundStyle>(this, this.state.activeStyle);

        return (
            <div className={style.background}>
                I'm an animated background!

                <ul>
                    <li>Since it's not really animated</li>
                    <li>Here's an incorrect list</li>
                    <li>OR IS IT ANIMATED?</li>
                </ul>
            </div>
        );
    }
}
