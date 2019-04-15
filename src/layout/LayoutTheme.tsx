import { LayoutRegistry } from './LayoutRegistry';

export interface IThemeListener
{
    onThemeChange(theme: LayoutTheme): boolean;
}

export class LayoutTheme
{
    private listeners: IThemeListener[];

    private elementComponents: Map<string, string>;
    private componentStyles: Map<string, string>;

    public constructor()
    {
        this.listeners = [];

        this.elementComponents = new Map<string, string>();
        this.componentStyles = new Map<string, string>();
    }

    public static get default(): LayoutTheme
    {
        const defaultTheme: LayoutTheme = new LayoutTheme();

        const elements: string[] = LayoutRegistry.INSTANCE.getElements();
        const components: string[] = LayoutRegistry.INSTANCE.getComponents();

        elements.forEach(element => {
            const currentDefaultComponent: string = LayoutRegistry.INSTANCE.getDefaultComponent(element);
            defaultTheme.elementComponents.set(element, currentDefaultComponent);
        });

        components.forEach(component => {
            const currentDefaultStyle: string = LayoutRegistry.INSTANCE.getDefaultStyle(component);
            defaultTheme.componentStyles.set(component, currentDefaultStyle);
        });

        return defaultTheme;
    }

    public getActiveComponents(): Map<string, string>
    {
        return this.elementComponents;
    }

    public getActiveStyles(): Map<string, string>
    {
        return this.componentStyles;
    }

    public getElementComponent(element: string): string
    {
        const elementComponent: string | undefined = this.elementComponents.get(element);

        if (!elementComponent)
        {
            throw new Error(`Attempt to get component for unregistered element ${element}.`);
        }

        return elementComponent;
    }

    public changeElementComponent(element: string, component: string): void
    {
        this.elementComponents.set(element, component);

        this.notifyListeners();
    }

    public getComponentStyle(component: string): string
    {
        const componentStyle: string | undefined = this.componentStyles.get(component);
        if (!componentStyle)
        {
            throw new Error(`Attempt to get style for unregistered component ${component}.`);
        }
        return componentStyle;
    }

    public changeComponentStyle(component: string, style: string): void
    {
        this.componentStyles.set(component, style);

        this.notifyListeners();
    }

    public registerListener(listener: IThemeListener): void
    {
        this.listeners.push(listener);
    }

    public unregisterListener(listener: IThemeListener): void
    {
        const unregisterIndex: number = this.listeners.indexOf(listener);

        if (unregisterIndex < 0)
        {
            throw new Error(`Attempt to unregister non-registered theme listener ${listener.constructor.name}`);
        }

        this.listeners.splice(unregisterIndex, 1);
    }

    private notifyListeners(): void
    {
        this.listeners.forEach(listener => {
            listener.onThemeChange(this);
        });
    }
}
