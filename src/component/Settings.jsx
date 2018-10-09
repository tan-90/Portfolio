import React from 'react';

import Style from './Settings.scss';

/**
 * A placeholder Settings button.
 * Should be responsible for controling the background animation.
 * 
 * For now it just renders a rotated div to hold the border.
 */
export default class Settings extends React.Component
{
    render()
    {
        return (
            <div className={Style.Settings}/>
        )
    }
}