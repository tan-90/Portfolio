import { IThemeListener } from './LayoutTheme';
import { LayoutTheme } from './LayoutTheme';

export class LayoutManager
{
    private currentTheme: LayoutTheme;

    public constructor(theme: LayoutTheme)
    {
        this.currentTheme = theme;
    }

    public getCurrentTheme(): LayoutTheme
    {
        return this.currentTheme;
    }

    public getActiveComponent(element: string): string
    {
        return this.currentTheme.getElementComponent(element);
    }

    public getActiveComponents(): Map<string, string>
    {
        return this.currentTheme.getActiveComponents();
    }

    public getActiveStyle(component: string): string
    {
        return this.currentTheme.getComponentStyle(component);
    }

    public getActiveStyles(): Map<string, string>
    {
        return this.currentTheme.getActiveStyles();
    }

    public registerThemeListener(listener: IThemeListener): void
    {
        this.currentTheme.registerListener(listener);
    }

    public unregisterThemeListener(listener: IThemeListener): void
    {
        this.currentTheme.unregisterListener(listener);
    }
}
