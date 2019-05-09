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
    equations: string[];

    public constructor(props: IPropsLayoutComponent)
    {
        super(props);
        this.equations = [];
        this.equations.push('tan(90)');
        this.equations.push('\\dfrac{sin(90)}{cos(90)}');
        this.equations.push('\\dfrac{sin(90)}{\\sqrt{1 - sin^2(90)}}');
        this.equations.push('\\dfrac{\\sqrt{1 - cos^2(90)}}{cos(90)}');
        this.equations.push('\\dfrac{1}{\\sqrt{csc^2(90) - 1}}');
        this.equations.push('\\sqrt{sec^2(90) - 1}');
        this.equations.push('\\dfrac{1}{cot(90)}');

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
                        {
                            this.equations[Math.floor(Math.random() * this.equations.length)]
                        }
                    </BlockMath>
                </h1>
            </div>
        );
    }
}
