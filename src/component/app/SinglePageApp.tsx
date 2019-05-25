import React from 'react';
// import classNames from 'classnames';

import { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { IStateLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import { Configuration } from '../../element/Configuration';
import { Menu } from '../../element/Menu';

import Style from '../../style/app/SinglePageApp.scss';
import { App } from '../../element/App';
import { BlogRegistry } from '../../blog/BlogRegistry';
import { IPropsAppComponent } from '../../element/App';
import { Page } from '../../element/Page';
import { LayoutElement } from '../../layout/LayoutElement';
import { Class } from '../../Types';
import { Background } from '../../element/Background';
import { Post } from '../../element/pages/Post';

interface IStateSinglePageApp extends IStateLayoutComponent
{
    currentPage: string;
}

interface ISinglePageAppStyle extends ILayoutStyle
{
    singlePageApp: string;
    pageHolder: string;
}

@Styles<ISinglePageAppStyle>(
    { name: 'Plain', data: Style }
)
@ComponentProvider(App, true)
export class SinglePageApp extends LayoutComponent<IPropsAppComponent, IStateSinglePageApp>
{
    constructor(props: IPropsAppComponent)
    {
        super(props);

        const { manager } = this.props;
        const { location } = this.props.routerProps;

        const route: string = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.length);

        this.state = {
            activeStyle: manager.getActiveStyle(SinglePageApp.name),

            currentPage: route.length > 0 ? route : 'home'
        };

        this.onMenuLinkClick = this.onMenuLinkClick.bind(this);
    }

    private onMenuLinkClick(link: string): boolean
    {
        if (link !== this.state.currentPage)
        {
            this.setState({
                currentPage: link
            });

            const { history } = this.props.routerProps;
            history.push(link === 'home' ? '/' : `/${link}`);

            return true;
        }

        return false;
    }

    public render(): ReactNode
    {
        const { manager } = this.props;
        const style: ISinglePageAppStyle = LayoutRegistry.INSTANCE.getStyle<ISinglePageAppStyle>(this, this.state.activeStyle);

        return (
            <div className={style.singlePageApp}>
                <Background manager={manager}/>
                <Configuration manager={manager}/>
                <Menu
                    manager={manager}

                    links={this.props.pages.map(page => page.name)}
                    defaultLink={'Home'}
                    selectedLink={this.state.currentPage}

                    onLinkClick={this.onMenuLinkClick}
                />
                <div className={style.pageHolder}>
                    <Switch>
                        {
                            this.props.pages.map(page => {
                                /*
                                 * React only renders a component from a variable if it starts uppercase.
                                 * Since the element to be rendered is stored in the page, it needs to be reassigned first.
                                 */
                                const PageElement: Class<LayoutElement> = page.element;

                                return (
                                    <Route
                                        key={page.name}

                                        exact
                                        path={page.route}
                                        render={_ =>
                                            page.useContainer ? (
                                                <Page manager={manager} name={page.name}>
                                                    <PageElement manager={manager}/>
                                                </Page>
                                            ) : (
                                                <PageElement manager={manager}/>
                                            )
                                        }
                                    />
                                );
                            })
                        }
                        {
                            BlogRegistry.INSTANCE.posts
                            .filter(post => post.post)
                            .map(post => {
                                return (
                                    <Route
                                        key={post.url}

                                        exact
                                        path={`/blog/${post.url}`}
                                        render={_ =>
                                            <Page manager={manager} name={'Blog'}>
                                                <Post manager={manager} post={post}/>
                                            </Page>
                                        }
                                    />
                                );
                            })
                        }
                        <Route
                            render={_ => <h1>OH NOES! IT'S A 404.</h1>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}
