import { IThemeListener } from './LayoutTheme';
import { LayoutTheme } from './LayoutTheme';
import { Coord } from '../Types';

export class LayoutManager
{
    private currentTheme: LayoutTheme;

    private mousePosition: Coord;
    private windowDimensions: Coord;

    public constructor(theme: LayoutTheme)
    {
        this.currentTheme = theme;

        this.mousePosition = {
            x: 0,
            y: 0
        };

        this.windowDimensions = {
            x: 0,
            y: 0
        };
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

    public onRootDidMount()
    {
        window.addEventListener('mousemove', event => this.onWindowMouseMove(event));
        window.addEventListener('resize', event => this.onWindowResize(event));
    }

    private onWindowMouseMove(event: MouseEvent)
    {
        this.mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    private onWindowResize(event: UIEvent)
    {
        this.windowDimensions = {
            x: window.innerWidth,
            y: window.innerHeight
        };
    }

    public get mouse(): Coord
    {
        return this.mousePosition;
    }

    public get window(): Coord
    {
        return this.windowDimensions;
    }
}
