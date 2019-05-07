import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutElement, IStateLayoutElement } from '../layout/LayoutElement';
import { IPropsLayoutComponent } from '../layout/LayoutComponent';
import { LayoutElement } from '../layout/LayoutElement';
import { RouteComponentProps } from 'react-router';
import { StaticContext } from 'react-router';
import { Class } from '../Types';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';

export interface IPageData
{
    name: string;
    route: string;

    element: Class<LayoutElement>;
}

export interface IPropsAppComponent extends IPropsLayoutComponent
{
    routerProps: RouteComponentProps<any, StaticContext, any>;
    pages: IPageData[];
}

interface IPropsApp extends IPropsLayoutElement
{
    routerProps: RouteComponentProps<any, StaticContext, any>;
}

interface IStateApp extends IStateLayoutElement
{
    pages: IPageData[];
}

@ElementProvider()
export class App extends LayoutElement<IPropsApp, IStateApp>
{
    constructor(props: IPropsApp)
    {
        super(props);

        const allPages: IPageData[] = [
            {
                name: 'Home',
                route: '/',

                element: Home
            },
            {
                name: 'About',
                route: '/about',

                element: About
            },
            {
                name: 'Projects',
                route: '/projects',

                element: Projects
            },
            {
                name: 'Contact',
                route: '/contact',

                element: Contact
            },
        ];

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(App.name),

            pages: allPages
        };
    }

    public componentDidMount()
    {
        super.componentDidMount();
    }

    public getComponentProps(): IPropsAppComponent
    {
        return {
            manager: this.props.manager,

            routerProps: this.props.routerProps,
            pages: this.state.pages
        };
    }
}
