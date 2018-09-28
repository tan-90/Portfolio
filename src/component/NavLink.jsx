import React from 'react';

import Style from './NavLink.scss';

/**
 * A link for the nav menu.
 * Reacts to hover with a custom "list bullet".
 * Can react to clicks.
 * 
 * name: The name of the link. Is also what's displayed.
 * active: If set the link gets the "active" style. Which item is active should be controlled by the parent.
 */
export default class NavLink extends React.Component
{
    render()
    {
        let getClassNames = () => [Style.NavLink, this.props.active ? Style.Active : ''].join(' ');

        return (
            <div className={getClassNames()}>
                {
                    /*
                     * The display name of the link.
                     *
                     * Needs it's own span as the style for removing white spaces above and below text uses the ::before and ::after pseudo elements.
                     */
                }
                <span className={Style.Name}>{this.props.name}</span>

                {
                    /*
                     * The list bullet displayed to the right of the link.
                     * 
                     * Can't be an ::after of the text as that's already used.
                     */
                }
                <div className={Style.Bullet}></div>
            </div>
        );
    }
}