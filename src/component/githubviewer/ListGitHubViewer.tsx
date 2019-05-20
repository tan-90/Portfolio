import classNames from 'classnames';
import React from 'react';
import ReactMarkdown  from 'react-markdown';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { GitHubViewer } from '../../element/GitHubViewer';
import { IPropsGitHubViewerComponent } from '../../element/GitHubViewer';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { IStateLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import DefaultListGitHubViewer from '../../style/githubviewer/DefaultListGitHubViewer.scss';

interface IListGitHubViewerState extends IStateLayoutComponent
{
    visible: boolean[];
}

interface IListGitHubViewerStyle extends ILayoutStyle
{
    gitHubViewer: string;
    repository: string;
    hidden: string;
    header: string;
    content: string;
}

@Styles<IListGitHubViewerStyle>(
    { name: 'Default', data: DefaultListGitHubViewer }
)
@ComponentProvider(GitHubViewer, true)
export class ListGitHubViewer extends LayoutComponent<IPropsGitHubViewerComponent, IListGitHubViewerState>
{
    public constructor(props: IPropsGitHubViewerComponent)
    {
        super(props);

        const { manager } = this.props;

        let visibleArray: boolean[] = [];
        if (this.props.repositories)
        {
            visibleArray = this.props.repositories.map(() => false);
        }

        this.state = {
            activeStyle: manager.getActiveStyle(ListGitHubViewer.name),

            visible: visibleArray
        };

        this.handleHeaderClick = this.handleHeaderClick.bind(this);
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
        const style: IListGitHubViewerStyle = LayoutRegistry.INSTANCE.getStyle<IListGitHubViewerStyle>(this, this.state.activeStyle);

        return (
            <div className={style.gitHubViewer}>
                {
                    (!this.props.error && !this.props.repositories) &&
                    <span>Loading ...</span>
                }

                {
                    (this.props.error) &&

                    <span>Oh noes! We have an error ):<br/>Maybe try again later?</span>
                }

                {
                    (this.props.repositories) &&
                    this.props.repositories.map((repository, index) => {
                        return (
                            <div
                                className={classNames({
                                    [style.repository]: true,
                                    [style.hidden]: !this.state.visible[index]
                                })}
                                key={repository.name}
                            >
                                {/* UNDO UNTIL THIS DISSAPEARS */}
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

                                    <h1>{repository.name}</h1>
                                    <h2>{repository.description}</h2>
                                </div>

                                <div className={style.content}>
                                    <ReactMarkdown
                                        source={repository.readme}
                                        renderers={{
                                            link: props => <a {...props} target={'_blanc'}/>
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
