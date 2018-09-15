import React from 'react';

import Style from './NavMenu.scss';

import NavLink from './NavLink'

export default class NavMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.refCallback = this.refCallback.bind(this);
    }

    handleLinkClick(event, name)
    {
        this.props.handleLinkClick(event, name);
    }

    refCallback(element)
    {
        if(element)
        {
            this.props.sizeCallback(element.getBoundingClientRect());
        }
    }

    render()
    {
        return (
            <div 
                ref={this.refCallback}
                className={Style.container}
            >
                <NavLink 
                    handleClick={this.handleLinkClick}
                    selected={this.props.selected}
                    name='HOME'
                />
                <NavLink
                    handleClick={this.handleLinkClick}
                    selected={this.props.selected}
                    name='ABOUT'
                />
                <NavLink
                    handleClick={this.handleLinkClick}
                    selected={this.props.selected}
                    name='PROJECTS'
                />
                <NavLink 
                    handleClick={this.handleLinkClick}
                    selected={this.props.selected}
                    name='CONTACT'
                />
                <NavLink 
                    handleClick={this.handleLinkClick}
                    selected={this.props.selected}
                    name='BLOG'
                />
            </div>
        );
    }
}