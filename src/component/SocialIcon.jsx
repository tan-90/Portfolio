import React from 'react';

import Style from './SocialIcon.scss';

export default class SocialIcon extends React.Component
{
    render()
    {
        return(
            <div className={Style.container}>
                <a
                    className={Style.socialIcon}
                    href={this.props.link}
                    target='_blank'
                >
                    <i className={this.props.icon}/>
                </a>
            </div>
        );
    }
}
