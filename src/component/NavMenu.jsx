import React from 'react';
import NavLink from './NavLink';

import Style from './NavMenu.scss';

/**
 * A nav menu.
 * Creates a menu with a list of nav links.
 * Has to be size aware as the nav renders style lines that connect to the menu.
 * 
 * links: The list of links to be turned into NavLink components.
 * active: The name of the currently active link.
 * handleLinkClick: Passed down to each NavLink. Called when a NavLink is clicked receiving the name of the link as argument.
 * rectCallback: Called when the component is first rendered and then every time the window resizes.
 *               Receives the rect of the component's container as argument.
 */
export default class NavMenu extends React.Component
{
    constructor(props)
    {
        super(props);

        /**
         * A ref to the component container.
         * 
         * The nav uses lines that connect to the top and bottom of the menu. 
         * Drawing the lines requires knowing the position and size of the menu.
         * 
         * The ref is used to query the client rect.
         */
        this.container = React.createRef();
        
        /**
         * Calls the rect callback with the component rect as argument when the window resizes.
         */
        this.handleResize = () => this.props.rectCallback(this.container.current.getBoundingClientRect());
    }

    componentDidMount()
    {
        /* The size and position need to be updated if the window resizes. */
        window.addEventListener('resize', this.handleResize);

        /* Call the size callback when the component first gets rendered. */
        this.handleResize();
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.handleResize);
    }

    render()
    {
        const navLinks = this.props.links.map((name, index) =>
            <NavLink
                key={index}
                name={name}
                active={this.props.active == name}
                handleClick={this.props.handleLinkClick}
            />
        );

        return (
            <div
                className={Style.NavMenu}
                ref={this.container}
            >
                {navLinks}
            </div>
        );
    }
}