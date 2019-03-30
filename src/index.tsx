import React from 'react';
import ReactDom from 'react-dom';

import { Component } from 'react';

import { Background } from './component/Background';
import { LayoutManager } from './layout/LayoutManager';
import { LayoutTheme } from './layout/LayoutTheme';

import Style from './index.scss';

// Import all the components and elements so the decorators can do their thing.
import './layout/Components';
import './layout/Elements';

const theme: LayoutTheme = LayoutTheme.default;
const manager: LayoutManager = new LayoutManager(theme);

// Simple test for changing the background component with a set timer.
let themeTracker: boolean = false;
setInterval(() => {
    theme.changeElementComponent('Background', themeTracker ? 'AnimatedBackground' : 'PlainBackground');
    themeTracker = !themeTracker;
}, 2000);

export class App extends Component
{
    public render()
    {
        return (
            <div className={Style.heeyItWorks}>
                <Background manager={manager}/>
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
);
