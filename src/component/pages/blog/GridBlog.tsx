import React from 'react';

import classNames from 'classnames';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

import { Blog } from '../../../element/pages/Blog';
import { ComponentProvider } from '../../../layout/ComponentProvider';
import { ILayoutStyle } from '../../../layout/LayoutStyle';
import { IPropsBlogComponent } from '../../../element/pages/Blog';
import { LayoutComponent } from '../../../layout/LayoutComponent';
import { LayoutRegistry } from '../../../layout/LayoutRegistry';
import { Styles } from '../../../layout/Styles';

import DefaultGridBlog from '../../../style/pages/blog/DefaultGridBlog.scss';
import { IBlogPost } from '../../../blog/IBlogPost';

interface IGridBlogStyle extends ILayoutStyle
{
    gridBlog: string;
    card: string;
    soon: string;
}

@Styles<IGridBlogStyle>(
    { name: 'Default', data: DefaultGridBlog }
)
@ComponentProvider(Blog, true)
export class GridBlog extends LayoutComponent<IPropsBlogComponent>
{
    public constructor(props: IPropsBlogComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(GridBlog.name)
        };
    }

    private makeCard(post: IBlogPost): ReactNode
    {
        return (
            <Fragment>
                <img src={post.image}/>
                <h1>{post.name}</h1>
                <h2>{post.description}</h2>
                <ul>
                    {
                        post.tags.map(tag => {
                            return (
                                <li
                                    className={tag.color}

                                    key={tag.name}
                                >
                                    {tag.name}
                                </li>
                            );
                        })
                    }
                </ul>
            </Fragment>
        );
    }

    public render(): ReactNode
    {
        const style: IGridBlogStyle = LayoutRegistry.INSTANCE.getStyle<IGridBlogStyle>(this, this.state.activeStyle);

        return (
            <div className={style.gridBlog}>
                {
                    this.props.posts.map(post => {
                        if (post.post)
                        {
                            return (
                                <Link
                                    key={post.name}
                                    className={style.card}

                                    to={`/blog/${post.url}`}
                                >
                                    {this.makeCard(post)}
                                </Link>
                            );
                        }

                        return (
                            <div
                                key={post.name}
                                className={classNames([style.card, style.soon])}
                            >
                                {this.makeCard(post)}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
