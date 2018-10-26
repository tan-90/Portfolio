import React from 'react';

import Style from './SocialIcon.scss';

/**
 * A bordered linked font awesome icon.
 * Renders an icon centered on a bordered square that works as a link.
 * 
 * link: The link the icon redirects to
 * icon: The font awesome icon class name.
 */
export default class SocialIcon extends React.Component
{
    render()
    {
        return (
            <div className={Style.SocialIcon}>
                <a
                    href={this.props.link}
                    target='_blank'
                >
                    <i className={this.props.icon}/>
                </a>
            </div>
        );
    }
}
