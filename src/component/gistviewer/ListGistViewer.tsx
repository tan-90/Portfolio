import classNames from 'classnames';
import React from 'react';
import ReactMarkdown  from 'react-markdown';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { IPropsGistViewerComponent } from '../../element/GistViewer';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { IStateLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import DefaultListGitHubViewer from '../../style/githubviewer/DefaultListGitHubViewer.scss';
import { GistViewer } from '../../element/GistViewer';

interface IListGistViewerState extends IStateLayoutComponent
{
    visible: boolean[];
}

interface IListGistViewerStyle extends ILayoutStyle
{
    gitHubViewer: string;
    repository: string;
    hidden: string;
    header: string;
    content: string;
}

@Styles<IListGistViewerStyle>(
    { name: 'Default', data: DefaultListGitHubViewer }
)
@ComponentProvider(GistViewer, true)
export class ListGistViewer extends LayoutComponent<IPropsGistViewerComponent, IListGistViewerState>
{
    public constructor(props: IPropsGistViewerComponent)
    {
        super(props);

        const { manager } = this.props;

        let visibleArray: boolean[] = [];
        if (this.props.gists)
        {
            visibleArray = this.props.gists.map(() => false);
        }

        this.state = {
            activeStyle: manager.getActiveStyle(ListGistViewer.name),

            visible: visibleArray
        };
    }

    private handleHeaderClick(index: number): void
    {
        const { visible } = this.state;
        visible[index] = !visible[index];

        this.setState({
            visible
        });
    }

    public render(): ReactNode
    {
        const style: IListGistViewerStyle = LayoutRegistry.INSTANCE.getStyle<IListGistViewerStyle>(this, this.state.activeStyle);

        return (
            <div className={style.gitHubViewer}>
                {
                    (!this.props.error && !this.props.gists) &&
                    <span>Loading ...</span>
                }

                {
                    (this.props.error) &&

                    <span>Oh noes! We have an error ):<br/>Maybe try again later?</span>
                }

                {
                    (this.props.gists) &&
                    this.props.gists.map((gist, index) => {
                        return (
                            <div
                                className={classNames({
                                    [style.repository]: true,
                                    [style.hidden]: !this.state.visible[index]
                                })}
                                key={gist.name}
                            >
                                <div className={style.header} onClick={() => this.handleHeaderClick(index)}>
                                    {
                                        this.state.visible[index] ?
                                        (
                                            <i className={'material-icons'}>keyboard_arrow_down</i>
                                        ) :
                                        (
                                            <i className={'material-icons'}>keyboard_arrow_right</i>
                                        )
                                    }

                                    <h1>{gist.name}</h1>
                                    <h2>{gist.description}</h2>
                                </div>

                                <div className={style.content}>
                                    {
                                        gist.readmeError &&

                                        <span>Oh noes! We have an error ):<br/>Maybe try again later?</span>
                                    }

                                    {
                                        gist.readme &&

                                        <ReactMarkdown
                                            source={gist.readme}
                                            renderers={{
                                                link: props => <a {...props} target={'_blanc'}/>
                                            }}
                                        />
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
