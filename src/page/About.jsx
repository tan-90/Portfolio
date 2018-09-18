import React from 'react';

import Style from './About.scss';

export default class About extends React.Component
{
    render()
    {
        return(
            <div className={Style.container}>
                <h1 className={Style.header}>About</h1>
            </div>
        );
    }
}