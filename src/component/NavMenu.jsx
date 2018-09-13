import React from 'react';

import Style from './NavMenu.scss';

import NavLink from './NavLink'

export default class NavMenu extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            selected: 'HOME'
        }
        
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick(event, name)
    {
        this.setState({
            selected: name
        });
    }

    render()
    {
        return (
            <div className={Style.container}>
                <NavLink 
                    handleClick={this.handleLinkClick}
                    selected={this.state.selected}
                    name='HOME'
                />
                <NavLink
                    handleClick={this.handleLinkClick}
                    selected={this.state.selected}
                    name='ABOUT'
                />
                <NavLink
                    handleClick={this.handleLinkClick}
                    selected={this.state.selected}
                    name='PROJECTS'
                />
                <NavLink 
                    handleClick={this.handleLinkClick}
                    selected={this.state.selected}
                    name='CONTACT'
                />
                <NavLink 
                    handleClick={this.handleLinkClick}
                    selected={this.state.selected}
                    name='BLOG'
                />
            </div>
        );
    }
}