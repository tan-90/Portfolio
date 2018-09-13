import React from 'react';
import ReactDOM from 'react-dom';

import style from './index.scss'

import NavMenu from './component/NavMenu';

class App extends React.Component
{
render()
    {
        return (
            <div id="appContainer" className={style.appContainer}>
                <NavMenu/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);