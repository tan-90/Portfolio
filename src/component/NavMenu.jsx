import React from 'react';

import Style from './NavMenu.scss';

import NavLink from './NavLink'

export default class NavMenu extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.refCallback = this.refCallback.bind(this);
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.handleResize);
    }

    handleLinkClick(event, name)
    {
        this.props.handleLinkClick(event, name);
    }
    
    handleResize()
    {
        this.sizeCallback();
    }
    
    sizeCallback()
    {
        if (this.container)
        {
            this.props.sizeCallback(this.container.getBoundingClientRect());
        }
    }

    refCallback(container)
    {
        this.container = container;

        this.sizeCallback();
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