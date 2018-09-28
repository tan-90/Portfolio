import React from 'react';

import Style from './Background.scss';

/**
 * The container for the website background.
 * Uses a placeholder image for now.
 * 
 * Should hold a three.js scene on the future and accept settings as props.
 */
export default class Background extends React.Component
{
    render()
    {
        return (
            <div className={Style.Background}></div>
        );
    }
}
