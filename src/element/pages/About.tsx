import { ElementProvider } from '../../layout/ElementProvider';
import { LayoutElement } from '../../layout/LayoutElement';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { IPropsLayoutElement } from '../../layout/LayoutElement';

export interface IPropsAboutComponent extends IPropsLayoutComponent
{
    content: string;
}

@ElementProvider()
export class About extends LayoutElement
{
    content: string;

    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        this.content = 'Hi. I need placeholder content. Mauris eget ipsum nec metus euismod vehicula at sed mauris. Morbi tincidunt purus ac erat consectetur, vitae mollis purus mattis. Nullam vestibulum nisl auctor felis sodales consectetur. Nullam finibus erat metus. Nulla quis eleifend augue. Sed nec arcu vel libero tempor imperdiet. Vivamus venenatis efficitur molestie. Nunc bibendum a libero sit amet eleifend. Pellentesque interdum laoreet purus, sed cursus massa consectetur porttitor. Etiam pharetra elit quis nunc sollicitudin, ut bibendum est aliquam. Quisque tincidunt, erat ut tincidunt commodo, ligula tortor dictum dolor, nec egestas magna lacus luctus sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rutrum in risus congue blandit. Curabitur lobortis est eget lacinia molestie. Maecenas consequat non orci vitae laoreet.';

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(About.name)
        };
    }

    public getComponentProps(): IPropsAboutComponent
    {
        return {
            manager: this.props.manager,

            content: this.content
        };
    }
}
