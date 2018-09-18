import React from 'react';

import Style from './Blog.scss';

export default class Blog extends React.Component
{
    render()
    {
        return(
            <div className={Style.container}>
                <h1 className={Style.header}>Blog</h1>
            </div>
        );
    }
}