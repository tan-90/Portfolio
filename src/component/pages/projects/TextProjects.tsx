import React from 'react';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../../layout/ComponentProvider';
import { GitHubViewer } from '../../../element/GitHubViewer';
import { ILayoutStyle } from '../../../layout/LayoutStyle';
import { IPropsProjectsComponent } from '../../../element/pages/Projects';
import { LayoutComponent } from '../../../layout/LayoutComponent';
import { LayoutRegistry } from '../../../layout/LayoutRegistry';
import { Projects } from '../../../element/pages/Projects';
import { Styles } from '../../../layout/Styles';

import DefaultTextProjects from '../../../style/pages/projects/DefaultTextProjects.scss';

interface ITextProjectsStyle extends ILayoutStyle
{
    textProjects: string;
}

@Styles<ITextProjectsStyle>(
    { name: 'Bold', data: DefaultTextProjects }
)
@ComponentProvider(Projects, true)
export class TextProjects extends LayoutComponent<IPropsProjectsComponent>
{
    public constructor(props: IPropsProjectsComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(TextProjects.name)
        };
    }

    public render(): ReactNode
    {
        const { manager } = this.props;
        const style: ITextProjectsStyle = LayoutRegistry.INSTANCE.getStyle<ITextProjectsStyle>(this, this.state.activeStyle);

        return (
            <div className={style.textProjects}>
                <p>
                    {
                        this.props.content
                    }
                </p>

                <GitHubViewer manager={manager} user={'tan-90'}/>
            </div>
        );
    }
}
