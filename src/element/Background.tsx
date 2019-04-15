import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';

@ElementProvider()
export class Background extends LayoutElement
{
    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Background.name)
        };
    }

    public getComponentProps(): any
    {
        return {
            manager: this.props.manager
        };
    }
}
