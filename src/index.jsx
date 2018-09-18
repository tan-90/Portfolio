import React from 'react';
import ReactDOM from 'react-dom';

import style from './index.scss'

import Nav from './component/Nav';
import Content from './component/Content';

class App extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            currentPage: 'HOME'
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(newPage)
    {
        this.setState({
            currentPage: newPage
        });
    }

    render()
        {
            return (
                <div id="appContainer" className={style.appContainer}>
                    <Content
                        currentPage={this.state.currentPage}
                    />
                    
                    <Nav
                        currentPage={this.state.currentPage}
                        handlePageChange={this.handlePageChange}
                    />
                </div>
            )
        }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);