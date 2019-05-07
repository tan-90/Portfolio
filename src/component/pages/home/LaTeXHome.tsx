import React from 'react';

import { BlockMath } from 'react-katex';
import { ReactNode } from 'react';

import { ComponentProvider } from '../../../layout/ComponentProvider';
import { Home } from '../../../element/pages/Home';
import { ILayoutStyle } from '../../../layout/LayoutStyle';
import { IPropsLayoutComponent } from '../../../layout/LayoutComponent';
import { LayoutComponent } from '../../../layout/LayoutComponent';
import { LayoutRegistry } from '../../../layout/LayoutRegistry';
import { Styles } from '../../../layout/Styles';

import DefaultLaTeXHome from '../../../style/pages/home/DefaultLaTeXHome.scss';

interface ILaTeXHomeStyle extends ILayoutStyle
{
    latexHome: string;
    title: string;
}

@Styles<ILaTeXHomeStyle>(
    { name: 'Default', data: DefaultLaTeXHome }
)
@ComponentProvider(Home, true)
export class LaTeXHome extends LayoutComponent
{
    public constructor(props: IPropsLayoutComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(LaTeXHome.name)
        };
    }

    public render(): ReactNode
    {
        const style: ILaTeXHomeStyle = LayoutRegistry.INSTANCE.getStyle<ILaTeXHomeStyle>(this, this.state.activeStyle);

        return (
            <div className={style.latexHome}>
                <h1 className={style.title}>
                    <BlockMath>
                        {'tan(90)'}
                    </BlockMath>
                </h1>
            </div>
        );
    }
}
