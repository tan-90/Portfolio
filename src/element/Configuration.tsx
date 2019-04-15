import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutComponent } from '../layout/LayoutComponent';
import { IPropsLayoutElement } from '../layout/LayoutElement';
import { IStateLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';
import { LayoutManager } from '../layout/LayoutManager';
import { LayoutRegistry } from '../layout/LayoutRegistry';
import { LayoutTheme } from '../layout/LayoutTheme';

export interface IPropsConfigurationComponent extends IPropsLayoutComponent
{
    manager: LayoutManager;

    elements: string[];
    components: Map<string, string[]>;
    styles: Map<string, string[]>;

    activeComponents: Map<string, string>;
    activeStyles: Map<string, string>;

    onComponentChange(manager: LayoutManager, element: string, component: string): void;
    onStyleChange(manager: LayoutManager, element: string, style: string): void;
}

interface IStateConfigurationElement extends IStateLayoutElement
{
    activeComponents: Map<string, string>;
    activeStyles: Map<string, string>;
}

@ElementProvider()
export class Configuration extends LayoutElement<IPropsLayoutElement, IStateConfigurationElement>
{
    private elements: string[];
    private components: Map<string, string[]>;
    private styles: Map<string, string[]>;

    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: LayoutRegistry.INSTANCE.getDefaultComponent(Configuration.name),
            activeComponents: manager.getActiveComponents(),
            activeStyles: manager.getActiveStyles()
        };

        this.elements = LayoutRegistry.INSTANCE.getElements();

        this.components = new Map<string, string[]>();
        this.styles = new Map<string, string[]>();

        this.elements.forEach(element => {
            const elementComponents: string[] = LayoutRegistry.INSTANCE.getElementComponents(element);

            this.components.set(element, elementComponents);

            elementComponents.forEach(component => {
                const componentStyles: string[] = LayoutRegistry.INSTANCE.getComponentStyles(component);
                this.styles.set(component, componentStyles);
            });
        });
    }

    private static onComponentChange(manager: LayoutManager, element: string, component: string): void
    {
        manager.getCurrentTheme().changeElementComponent(element, component);
    }

    private static onStyleChange(manager: LayoutManager, element: string, style: string): void
    {
        const component: string = manager.getCurrentTheme().getElementComponent(element);

        manager.getCurrentTheme().changeComponentStyle(component, style);
    }

    public getComponentProps(): IPropsConfigurationComponent
    {
        return {
            manager: this.props.manager,
            elements: this.elements,
            components: this.components,
            styles: this.styles,

            activeComponents: this.state.activeComponents,
            activeStyles: this.state.activeStyles,

            onComponentChange: Configuration.onComponentChange,
            onStyleChange: Configuration.onStyleChange
        };
    }

    public onThemeChange(theme: LayoutTheme): boolean
    {
        this.setState({
            activeComponents: theme.getActiveComponents(),
            activeStyles: theme.getActiveStyles()
        });

        return super.onThemeChange(theme);
    }
}
