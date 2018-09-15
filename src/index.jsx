import React from 'react';
import ReactDOM from 'react-dom';

import style from './index.scss'

import Nav from './component/Nav';

class App extends React.Component
{
render()
    {
        return (
            <div id="appContainer" className={style.appContainer}>
                <Nav/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);