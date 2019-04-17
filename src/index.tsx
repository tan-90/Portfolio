import React from 'react';
import ReactDom from 'react-dom';

import { Component } from 'react';

import { Background } from './element/Background';
import { Configuration } from './element/Configuration';
import { GitViewer } from './element/GitViewer';
import { LayoutManager } from './layout/LayoutManager';
import { LayoutTheme } from './layout/LayoutTheme';

import Style from './index.scss';

// Import all the components and elements so the decorators can do their thing.
import './layout/Components';
import './layout/Elements';

interface IAppState
{
    manager: LayoutManager;
}

export class App extends Component<{}, IAppState>
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

    public render()
    {
        return (
            <div className={Style.heeyItWorks}>
                <Background manager={this.state.manager}/>
                <Configuration manager={this.state.manager}/>
                <GitViewer manager={this.state.manager} user={'tan-90'}/>
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
);
