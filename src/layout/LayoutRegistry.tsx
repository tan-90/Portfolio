export class LayoutRegistry
{
    private static M_INSTANCE: LayoutRegistry;

    private elementRegistry: Map<String, Function>;
    private componentRegistry: Map<String, Map<String, any>>;

    private defaultComponentRegistry: Map<String, String>;

    constructor()
    {
        this.elementRegistry = new Map<String, Function>();
        this.componentRegistry = new Map<String, Map<String, any>>();

        this.defaultComponentRegistry = new Map<String, String>();
    }

    public static get INSTANCE(): LayoutRegistry
    {
        if (!LayoutRegistry.M_INSTANCE)
        {
            LayoutRegistry.M_INSTANCE = new LayoutRegistry();
        }
        return LayoutRegistry.M_INSTANCE;
    }

    public getElements(): String[]
    {
        return [...this.elementRegistry.keys()];
    }

    public getComponents(): String[]
    {
        const elements: String[] = this.getElements();
        const components: String[] = [];

        elements.forEach(element => {
            const elementComponents: Map<String, any> | undefined = this.componentRegistry.get(element);

            if (!elementComponents)
            {
                throw new Error('elementComponents should never be undefined, but was.');
            }

            components.push(...elementComponents.keys());
        });

        return components;
    }

    public registerElement(element: Function): void
    {
        this.elementRegistry.set(element.name, element);
        this.componentRegistry.set(element.name, new Map<String, any>());
    }

    public registerComponent(component: Function, element: Function): void
    {
        const elementName: String = element.name;

        const elementComponents: Map<String, any> | undefined = this.componentRegistry.get(elementName);

        if (!elementComponents)
        {
            throw new Error('elementComponents should never be undefined, but was.');
        }

        elementComponents.set(component.name, component);
    }

    public getComponent(element: any, name: String): Function
    {
        const elementComponents: Map<String, any> | undefined = this.componentRegistry.get(element.constructor.name);

        if (!elementComponents)
        {
            throw new Error(`Atempt to get component for unregistered element ${element.constructor.name}`);
        }

        const component: any | undefined = elementComponents.get(name);

        if (!component)
        {
            throw new Error(`Attempt to get unregistered component ${name}`);
        }

        return component;
    }

    public getDefaultComponent(element: String): String
    {
        const defaultComponent: String | undefined = this.defaultComponentRegistry.get(element);

        if (!defaultComponent)
        {
            throw new Error(`Element '${element}' had no default component registered.`);
        }

        return defaultComponent;
    }

    public setDefaultComponent(component: any, element: any)
    {
        this.defaultComponentRegistry.set(element.name, component.name);
    }
}
