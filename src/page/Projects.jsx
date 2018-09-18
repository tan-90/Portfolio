import React from 'react';

import Style from './Projects.scss';

export default class Projects extends React.Component
{
    render()
    {
        return(
            <div className={Style.container}>
                <h1 className={Style.header}>Projects</h1>
            </div>
        );
    }
}