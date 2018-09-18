import React from 'react';

import Style from './Contact.scss';

export default class Contact extends React.Component
{
    render()
    {
        return(
            <div className={Style.container}>
                <h1 className={Style.header}>Contact</h1>
            </div>
        );
    }
}