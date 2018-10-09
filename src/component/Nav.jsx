import React from 'react';

import Style from './Nav.scss';

import NavMenu from './NavMenu';
import Settings from './Settings'

/**
 * The nav component.
 * Draws the nav pannel along with style lines and the settings component.
 * Creates the nav menu with the given links, handles link clicks and keeps track of the size of the menu.
 * 
 * links: The list of links to be turned into NavLink components.
 * handleLinkClick: Passed down to each NavLink. Called when a NavLink is clicked receiving the name of the link as argument.
 * active: The name of the currently active link.
 */

export default class Nav extends React.Component
{
    constructor(props)
    {
        super(props);
        
        /**
         * As some size calculations can only be done in javascript using the component's rect, the line spacing has to be specified here.
         * Used to set the spacing between the menu and the style lines.
         */
        this.lineSpacing = 4;

        this.state = {
            /**
             * Holds the size of the menu component.
             * Used to set the sizes of the style lines as they should connect to the menu.
             * Starts as null as it can only be queried after the menu is rendered.
             * When it's null, the positioning will be incorrect, but that doesn't matter since it gets a value as soon as the menu appears.
             */
            menuRect: null
        };
    }
    
    render()
    {
        let menuSize = this.state.menuRect;

        return (
            <div className={Style.Nav}>
                {
                    /* Since I have to position components and each one has their own stylesheet,
                     * they need to be inside selectable containers.
                     */
                }

                <div className={Style.Settings}>
                    <Settings/>
                </div>
                
                {
                    /* 
                     * Used for drawing the line connecting the settings button to the menu. 
                     * The heigh of the line depends on the size position of the menu component.
                     * As the CSS is not aware of this values, there's no other way of doing it besides setting some inline styles.
                     */
                }
                <div
                    className={Style.TopLine}
                    style={{
                        bottom: `calc(100vh - ${menuSize ? (menuSize.top - this.lineSpacing).toString() : 0}px)`
                    }}
                />

                {
                    /*
                     * The actual nav menu.
                     * The menu rect callback saves the new rect to this component's state for drawing the style lines. 
                     * 
                     * The click handler, active page and page list will probably be moved updwards once the component is properly used.
                     */
                }
                <div className={Style.NavMenu}>
                    <NavMenu
                        rectCallback={rect => this.setState({menuRect: rect})}
                        links={this.props.links}
                        handleLinkClick={this.props.handleLinkClick}
                        active={this.props.active}
                    />
                </div>

                {
                    /* 
                     * Used for drawing the line connecting the menu to the bottom of the page.
                     * The heigh of the line depends on the size position of the menu component.
                     * As the CSS is not aware of this values, there's no other way of doing it besides setting some inline styles.
                     */
                }
                <div
                    className={Style.BottomLine}
                    style={{
                        top: `${menuSize ? (menuSize.bottom + this.lineSpacing).toString() : 0}px`
                    }}
                />
            </div>
        );
    }
}