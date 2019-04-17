import React from 'react';
import ReactMarkdown  from 'react-markdown';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { GitViewer } from '../../element/GitViewer';
import { IPropsGitViewerComponent } from '../../element/GitViewer';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import Style from '../../style/background/PlainBackground.scss';
import Neon from '../../style/background/PlainBackgroundNeon.scss';

interface IPlainBackgroundStyle extends ILayoutStyle
{
    background: string;
}

@Styles<IPlainBackgroundStyle>(
    { name: 'Plain', data: Style },
    { name: 'Neon', data: Neon }
)
@ComponentProvider(GitViewer, true)
export class PlainGitViewer extends LayoutComponent<IPropsGitViewerComponent>
{
    public constructor(props: IPropsGitViewerComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(PlainGitViewer.name)
        };
    }

    public render(): ReactNode
    {
        console.log('Did you just @render me');
        const style: IPlainBackgroundStyle = LayoutRegistry.INSTANCE.getStyle<IPlainBackgroundStyle>(this, this.state.activeStyle);

        return (
            <div className={style.background}>
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
