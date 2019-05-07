import React from 'react';
import ReactMarkdown  from 'react-markdown';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { GitHubViewer } from '../../element/GitHubViewer';
import { IPropsGitHubViewerComponent } from '../../element/GitHubViewer';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import DefaultListGitHubViewer from '../../style/githubviewer/DefaultListGitHubViewer.scss';

interface IListGitHubViewerStyle extends ILayoutStyle
{
    gitHubViewer: string;
}

@Styles<IListGitHubViewerStyle>(
    { name: 'Default', data: DefaultListGitHubViewer }
)
@ComponentProvider(GitHubViewer, true)
export class ListGitHubViewer extends LayoutComponent<IPropsGitHubViewerComponent>
{
    public constructor(props: IPropsGitHubViewerComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(ListGitHubViewer.name)
        };
    }

    public render(): ReactNode
    {
        const style: IListGitHubViewerStyle = LayoutRegistry.INSTANCE.getStyle<IListGitHubViewerStyle>(this, this.state.activeStyle);

        return (
            <div className={style.gitHubViewer}>
                {
                    (!this.props.error && !this.props.repositories) &&
                    <span>Loading...</span>
                }

                {
                    (this.props.error) &&

                    <span>Oh noes! We have an error ):</span>
                }

                {
                    (this.props.repositories) &&
                    <ul>
                        {
                            this.props.repositories.map(repository => {
                                return (
                                    <li key={repository.name}>
                                        <h1>{repository.name}</h1>
                                        <h2>{repository.description}</h2>

                                        <ReactMarkdown source={repository.readme}/>
                                    </li>
                                );
                            })
                        }
                    </ul>
                }
            </div>
        );
    }
}
