import React from 'react';

import { ReactNode } from 'react';

import { About } from '../../../element/pages/About';
import { ComponentProvider } from '../../../layout/ComponentProvider';
import { ILayoutStyle } from '../../../layout/LayoutStyle';
import { IPropsAboutComponent } from '../../../element/pages/About';
import { LayoutComponent } from '../../../layout/LayoutComponent';
import { LayoutRegistry } from '../../../layout/LayoutRegistry';
import { Styles } from '../../../layout/Styles';

import DefaultTextAbout from '../../../style/pages/about/DefaultTextAbout.scss';

interface ITextAboutStyle extends ILayoutStyle
{
    textAbout: string;
}

@Styles<ITextAboutStyle>(
    { name: 'Default', data: DefaultTextAbout }
)
@ComponentProvider(About, true)
export class TextAbout extends LayoutComponent<IPropsAboutComponent>
{
    public constructor(props: IPropsAboutComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(TextAbout.name)
        };
    }

    public render(): ReactNode
    {
        const style: ITextAboutStyle = LayoutRegistry.INSTANCE.getStyle<ITextAboutStyle>(this, this.state.activeStyle);

        return (
            <div className={style.textAbout}>
                <p>
                    {
                        this.props.content
                    }
                </p>
            </div>
        );
    }
}
