import React from 'react';

import Style from './Settings.scss';

export default class Settings extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        this.setState(
            (state, props) => ({
                open: !state.open
            })
        );
    }

    getButtonClasses()
    {
        return [
            this.state.open ? Style.closeButton : Style.openButton
        ].join(' ');
    }

    render()
    {
        return (
            <div className={Style.container}>
                <div
                    className={this.getButtonClasses()}
                    onClick={this.handleClick}
                ></div>
                {this.state.open ? (
                    <div></div>
                ) : (null)}
            </div>
        )
    }
}