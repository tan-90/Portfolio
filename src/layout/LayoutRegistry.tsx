import { Class } from './Types';
import { LayoutElement } from './LayoutElement';
import { LayoutComponent } from './LayoutComponent';
import { LayoutStyle } from './LayoutStyle';

export class LayoutRegistry
{
    private static M_INSTANCE: LayoutRegistry;

    private elementRegistry: Map<string, Class<LayoutElement>>;
    private componentRegistry: Map<string, Map<string, Class<LayoutComponent>>>;
    private styleRegistry: Map<string, Map<string, LayoutStyle>>;

    private defaultComponentRegistry: Map<string, string>;
    private defaultStyleRegistry: Map<string, string>;

    constructor()
    {
        this.elementRegistry = new Map<string, Class<LayoutElement>>();
        this.componentRegistry = new Map<string, Map<string, Class<LayoutComponent>>>();
        this.styleRegistry = new Map<string, Map<string, LayoutStyle>>();

        this.defaultComponentRegistry = new Map<string, string>();
        this.defaultStyleRegistry = new Map<string, string>();
    }

    public static get INSTANCE(): LayoutRegistry
    {
        if (!LayoutRegistry.M_INSTANCE)
        {
            LayoutRegistry.M_INSTANCE = new LayoutRegistry();
        }
        return LayoutRegistry.M_INSTANCE;
    }

    public getElements(): string[]
    {
        return [...this.elementRegistry.keys()];
    }

    public getComponents(): string[]
    {
        const elements: string[] = this.getElements();
        const components: string[] = [];

        elements.forEach(element => {
            const elementComponents: Map<string, Class<LayoutComponent>> | undefined = this.componentRegistry.get(element);

            if (!elementComponents)
            {
                throw new Error('elementComponents should never be undefined, but was.');
            }

            components.push(...elementComponents.keys());
        });

        return components;
    }

    public getElementComponents(element: Class<LayoutElement>): string[]
    {
        const elementComponents: Map<string, Class<LayoutComponent>> | undefined = this.componentRegistry.get(element.constructor.name);

        if (!elementComponents)
        {
            throw new Error(`Attempted to get components for unregistered element ${element.constructor.name}`);
        }

        return [...elementComponents.keys()];
    }

    public getStyles(): string[]
    {
        const components: string[] = this.getComponents();
        const styles: string[] = [];

        components.forEach(component => {
            const componentStyles: Map<string, LayoutStyle> | undefined = this.styleRegistry.get(component);

            if (!componentStyles)
            {
                throw new Error('componentStyles should never be undefined, but was.');
            }

            styles.push(...componentStyles.keys());
        });

        return styles;
    }

    public getComponentStyles(component: Class<LayoutComponent>): string[]
    {
        const componentStyles: Map<string, LayoutStyle> | undefined = this.styleRegistry.get(component.constructor.name);

        if (!componentStyles)
        {
            throw new Error(`Attempted to get styles for unregistered component ${component.constructor.name}`);
        }

        return [...componentStyles.keys()];
    }

    public registerElement(element: Class<LayoutElement>): void
    {
        this.elementRegistry.set(element.name, element);
        this.componentRegistry.set(element.name, new Map<string, Class<LayoutComponent>>());
    }

    public registerComponent(component: Class<LayoutComponent>, element: Function): void
    {
        const elementName: string = element.name;

        const elementComponents: Map<string, Class<LayoutComponent>> | undefined = this.componentRegistry.get(elementName);

        if (!elementComponents)
        {
            throw new Error('elementComponents should never be undefined, but was.');
        }

        elementComponents.set(component.name, component);
        this.styleRegistry.set(component.name, new Map<string, LayoutStyle>());
    }

    public registerStyles(component: Function, styles: LayoutStyle[])
    {
        const componentStyles: Map<string, LayoutStyle> | undefined = this.styleRegistry.get(component.name);

        if (!componentStyles)
        {
            throw new Error(`Attempted to register style for unregistered component ${component.name}`);
        }

        styles.forEach(style => {
            componentStyles.set(style.name, style);
        });
    }

    public getStyle(component: any, name: string): LayoutStyle
    {
        const componentStyles: Map<string, LayoutStyle> | undefined = this.styleRegistry.get(component.constructor.name);

        if (!componentStyles)
        {
            throw new Error(`Attempt to get style for unregistered component ${component.constructor.name}`);
        }

        const style: LayoutStyle | undefined = componentStyles.get(name);

        if (!style)
        {
            throw new Error(`Attempt to get unregiestered style ${name}`);
        }

        return style;
    }

    public getDefaultStyle(component: string): string
    {
        const componentStyle: string | undefined = this.defaultStyleRegistry.get(component);

        if (!componentStyle)
        {
            throw new Error(`Attempted to get default style for unregistered component ${component}`);
        }

        return componentStyle;
    }

    public setDefaultStyle(component: Function, style: LayoutStyle): void
    {
        this.defaultStyleRegistry.set(component.name, style.name);
    }

    public getComponent(element: any, name: string): Class<LayoutComponent>
    {
        const elementComponents: Map<string, Class<LayoutComponent>> | undefined = this.componentRegistry.get(element.constructor.name);

        if (!elementComponents)
        {
            throw new Error(`Atempt to get component for unregistered element ${element.constructor.name}`);
        }

        const component: Class<LayoutComponent> | undefined = elementComponents.get(name);

        if (!component)
        {
            throw new Error(`Attempt to get unregistered component ${name}`);
        }

        return component;
    }

    public getDefaultComponent(element: string): string
    {
        const defaultComponent: string | undefined = this.defaultComponentRegistry.get(element);

        if (!defaultComponent)
        {
            throw new Error(`Element '${element}' had no default component registered.`);
        }

        return defaultComponent;
    }

    public setDefaultComponent(component: Class<LayoutComponent>, element: Class<LayoutElement>): void
    {
        this.defaultComponentRegistry.set(element.name, component.name);
    }
}
