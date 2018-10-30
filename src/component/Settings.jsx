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

        /**
         * Holds all the currently defined settings.
         */
        this.currentSettings = {
            forcingView: false
        };

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick()
    {
        /*
         * This is placeholder code.
         * I wanted this system in place to see how it would look.
         * It's gonna be done properly once the actual website content is in place.
         */
        // if (!this.state.open)
        // {
        //     this.setState(state => ({
        //         open: !state.open
        //     }));
        //     this.currentSettings.forcingView = true;
        // }
        // else
        // {
        //     this.setState(state => ({
        //         open: !state.open
        //     }));
        //     this.currentSettings.forcingView = false;
        // }

        // this.props.changeCallback(this.currentSettings);
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