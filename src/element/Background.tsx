import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';
import { LayoutRegistry } from '../layout/LayoutRegistry';

@ElementProvider()
export class Background extends LayoutElement
{
    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        this.state = {
            activeComponent: LayoutRegistry.INSTANCE.getDefaultComponent(Background.name)
        };
    }
}
