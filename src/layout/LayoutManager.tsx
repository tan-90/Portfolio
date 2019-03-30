import { IThemeListener } from './LayoutTheme';
import { LayoutTheme } from './LayoutTheme';

export class LayoutManager
{
    private currentTheme: LayoutTheme;

    public constructor(theme: LayoutTheme)
    {
        this.currentTheme = theme;
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
