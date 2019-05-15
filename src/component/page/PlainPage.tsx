import React from 'react';
// import classNames from 'classnames';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Page, IPropsPageComponent } from '../../element/Page';
import { Styles } from '../../layout/Styles';

import Plain from '../../style/page/PlainPage.scss';

interface IPlainPageStyle extends ILayoutStyle
{
    page: string;
    container: string;
    title: string;
    content: string;
}

@Styles<IPlainPageStyle>(
    { name: 'Plain', data: Plain }
)
@ComponentProvider(Page, true)
export class PlainPage extends LayoutComponent<IPropsPageComponent>
{
    constructor(props: IPropsPageComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(PlainPage.name)
        };
    }

    public render(): ReactNode
    {
        const style: IPlainPageStyle = LayoutRegistry.INSTANCE.getStyle<IPlainPageStyle>(this, this.state.activeStyle);

        return (
            <div className={style.page}>
                <div className={style.container}>
                    <div className={style.title}>
                        <h1>{this.props.name}</h1>
                    </div>

                    <div className={style.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
