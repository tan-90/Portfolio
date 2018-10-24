import React from 'react';

import Style from './Settings.scss';
import { debug } from 'util';

/**
 * A placeholder Settings button.
 * Should be responsible for controling the background animation.
 * 
 * For now it just renders a rotated div to hold the border.
 */
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

    handleClick()
    {
        this.setState(state => ({open: !state.open}));
    }

    render()
    {
        let getClassNames = () => [Style.Settings, this.state.open ? Style.Open : ''].join(' ');

        return (
            <div
                className={getClassNames()}
                onClick={this.handleClick}
            />
        )
    }
}