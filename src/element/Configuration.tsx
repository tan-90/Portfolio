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

            /*
             * Elements that only have one component don't need a component selector.
             */
            if (elementComponents.length > 1)
            {
                this.components.set(element, elementComponents);
            }

            elementComponents.forEach(component => {
                const componentStyles: string[] = LayoutRegistry.INSTANCE.getComponentStyles(component);

                /*
                 * Components that only have one style don't need a style selector.
                 */
                if (componentStyles.length > 1)
                {
                    this.styles.set(component, componentStyles);
                }
            });
        });

        /*
         * An element needs a configuration entry if:
         * It has more than one component
         * OR
         * It has only one component but that component has more than one style
         * Despite only having one component, using a .map followed by a .every looks cleaner.
         */
        this.elements = this.elements.filter(e => (
            this.components.get(e) ||

            LayoutRegistry.INSTANCE.getElementComponents(e)
            .map(c => this.styles.get(c))
            .every(s => s !== undefined && s.length > 1)
        ));
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
