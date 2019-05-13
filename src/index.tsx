import React from 'react';
import ReactDom from 'react-dom';

import { Component } from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { App } from './element/App';
import { LayoutManager } from './layout/LayoutManager';
import { LayoutTheme } from './layout/LayoutTheme';

// Import all the components and elements so the decorators can do their thing.
import './layout/Components';
import './layout/Elements';
import { StaticContext } from 'react-router';

interface IAppState
{
    manager: LayoutManager;
}

export class Root extends Component<{}, IAppState>
{
    constructor(props: {})
    {
        super(props);

        const theme: LayoutTheme = LayoutTheme.default;
        const manager: LayoutManager = new LayoutManager(theme);

        this.state = {
            manager
        };
    }

    public componentDidMount()
    {
        this.state.manager.onRootDidMount();
    }

    public render()
    {
        return (
            <Router>
                <Route
                    path={'/'}
                    render={
                        (routerProps: RouteComponentProps<any, StaticContext, any>) => (
                            <App manager={this.state.manager} routerProps={routerProps}/>
                        )
                    }
                />
            </Router>
        );
    }
}

ReactDom.render(
    <Root/>,
    document.getElementById('root')
);
