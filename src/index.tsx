import React from 'react';
import { Component } from 'react';
import ReactDom from 'react-dom';

import Style from './index.scss';

export class App extends Component
{
    public render()
    {
        return (
            <div className={Style.prettyPleaseCanYouWork}>
                <h1>There's no escape from TypeScript.</h1>
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root'),
);
