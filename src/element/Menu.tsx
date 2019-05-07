import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutComponent } from '../layout/LayoutComponent';
import { IPropsLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';
import { LayoutManager } from '../layout/LayoutManager';

export interface IPropsMenuComponent extends IPropsLayoutComponent
{
    manager: LayoutManager;

    links: string[];
    selectedLink: string;

    onLinkClick(link: string): boolean;
}

interface IPropsMenuElement extends IPropsLayoutElement
{
    links: string[];
    defaultLink: string;
    selectedLink: string;

    onLinkClick(link: string): boolean;
}

@ElementProvider()
export class Menu extends LayoutElement<IPropsMenuElement>
{
    public constructor(props: IPropsMenuElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Menu.name)
        };
    }

    public getComponentProps(): IPropsMenuComponent
    {
        return {
            manager: this.props.manager,

            links: this.props.links,
            selectedLink: this.props.selectedLink,

            onLinkClick: this.props.onLinkClick
        };
    }
}
