import React from 'react';
import ReactDom from 'react-dom';

import { Component } from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { Fragment } from 'react';

import { App } from './element/App';
import { LayoutManager } from './layout/LayoutManager';
import { LayoutTheme } from './layout/LayoutTheme';

// Import all the components and elements so the decorators can do their thing.
import './layout/Components';
import './layout/Elements';

// Import all the posts so the "decorators" can do their thing.
import './blog/Posts';
import { CommonUtils } from './util/CommonUtils';

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
        const { manager } = this.state;

        manager.onRootDidMount();

        if (!CommonUtils.firstVisitFinished)
        {
            manager.notify({
                id: `wip_${Date.now()}`,

                time: 15,

                icon: 'warning',
                body: <Fragment>
                    <p>
                        Please keep in mind that this website is a work in progress.
                        While I did try to make sure the basics were in place, you might find some errors or feel like something is missing.
                        <br/>
                        <br/>
                        Feel free to talk to me about those and maybe take some time to read about the website on the About page.
                    </p>
                </Fragment>
            });

            CommonUtils.finishFirstVisit();
        }
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
