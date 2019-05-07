import { ElementProvider } from '../../layout/ElementProvider';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { IPropsLayoutElement } from '../../layout/LayoutElement';
import { LayoutElement } from '../../layout/LayoutElement';

@ElementProvider()
export class Home extends LayoutElement
{
    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Home.name)
        };
    }

    public getComponentProps(): IPropsLayoutComponent
    {
        return {
            manager: this.props.manager
        };
    }
}
