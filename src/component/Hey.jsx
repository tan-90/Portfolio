import React from 'react';
import style from './Hey.scss';

export default class Hey extends React.Component
{
    render()
    {
        return(
            <div id="Hey">
                <h1 className={style.header}>Hey {this.props.name}</h1>
            </div>
        );
    }
}