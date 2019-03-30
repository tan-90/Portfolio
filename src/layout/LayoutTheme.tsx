import { LayoutRegistry } from './LayoutRegistry';

export interface IThemeListener
{
    onThemeChange(theme: LayoutTheme): void;
}

export class LayoutTheme
{
    private listeners: IThemeListener[];

    private elementComponents: Map<String, String>;

    public constructor()
    {
        this.listeners = [];

        this.elementComponents = new Map<String, String>();
    }

    public static get default(): LayoutTheme
    {
        const defaultTheme: LayoutTheme = new LayoutTheme();

        const elements: String[] = LayoutRegistry.INSTANCE.getElements();

        elements.forEach(element => {
            const currentDefaultComponent: String = LayoutRegistry.INSTANCE.getDefaultComponent(element);
            defaultTheme.elementComponents.set(element, currentDefaultComponent);
        });

        return defaultTheme;
    }

    public getElementComponent(element: String): String
    {
        const elementComponent: String | undefined = this.elementComponents.get(element);

        if (!elementComponent)
        {
            throw new Error(`Attempt to get component for unregistered element ${element}.`);
        }

        return elementComponent;
    }

    public changeElementComponent(element: String, component: String)
    {
        this.elementComponents.set(element, component);

        this.notifyListeners();
    }

    public registerListener(listener: IThemeListener): void
    {
        this.listeners.push(listener);
    }

    public unregisterListener(listener: IThemeListener): void
    {
        const unregisterIndex: number = this.listeners.indexOf(listener);

        if (!unregisterIndex)
        {
            throw new Error(`Attempt to unregister non-registered theme listener ${listener}`);
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
