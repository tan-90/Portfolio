import React from 'react';

import Style from './Home.scss';

export default class Home extends React.Component
{
    render()
    {
        return(
            <div className={Style.container}>
                <h1 className={Style.header}>tan(90</h1>
                <div className={Style.headerUnderline}></div>
            </div>
        );
    }
}