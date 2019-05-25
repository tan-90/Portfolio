import React from 'react';

import { ReactNode } from 'react';

import { Post } from '../../../element/pages/Post';
import { ComponentProvider } from '../../../layout/ComponentProvider';
import { ILayoutStyle } from '../../../layout/LayoutStyle';
import { IPropsPostComponent } from '../../../element/pages/Post';
import { LayoutComponent } from '../../../layout/LayoutComponent';
import { LayoutRegistry } from '../../../layout/LayoutRegistry';
import { Styles } from '../../../layout/Styles';

import DefaultPlainPost from '../../../style/pages/post/DefaultPlainPost.scss';

interface IPlainPostStyle extends ILayoutStyle
{
    plainPost: string;
}

@Styles<IPlainPostStyle>(
    { name: 'Default', data: DefaultPlainPost }
)
@ComponentProvider(Post, true)
export class PlainPost extends LayoutComponent<IPropsPostComponent>
{
    public constructor(props: IPropsPostComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(PlainPost.name)
        };
    }

    public render(): ReactNode
    {
        const style: IPlainPostStyle = LayoutRegistry.INSTANCE.getStyle<IPlainPostStyle>(this, this.state.activeStyle);

        return (
            <div className={style.plainPost}>
                {this.props.post.post}
            </div>
        );
    }
}
