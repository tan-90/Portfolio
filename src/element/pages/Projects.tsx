import { ElementProvider } from '../../layout/ElementProvider';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { IPropsLayoutElement } from '../../layout/LayoutElement';
import { LayoutElement } from '../../layout/LayoutElement';

export interface IPropsProjectsComponent extends IPropsLayoutComponent
{
    content: string;
}

@ElementProvider()
export class Projects extends LayoutElement
{
    content: string;

    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        this.content = 'Here is where I keep my pile of shinny things.';

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Projects.name)
        };
    }

    public getComponentProps(): IPropsProjectsComponent
    {
        return {
            manager: this.props.manager,

            content: this.content
        };
    }
}
