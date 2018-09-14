import React from 'react';

import Style from './NavLink.scss';

export default class NavLink extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            hover: false
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseEnter(event)
    {
        this.setState({
            hover: true
        });
    }

    handleMouseLeave(event)
    {
        this.setState({
            hover: false
        });
    }

    handleClick(event)
    {
        this.props.handleClick(event, this.props.name);
    }

    getTextClasses()
    {
        return [
            Style.text,
            this.props.selected == this.props.name ? Style.textSelected : '',
            this.state.hover && (this.props.selected != this.props.name) ? Style.textHoverUnselected : ''
        ].join(' ');
    }

    getBulletClasses()
    {
        return [
            Style.bullet,
            this.state.hover ? Style.bulletHover : '',
            this.props.selected == this.props.name ? Style.bulletSelected : ''
        ].join(' ');
    }

    render()
    {
        return (
            <div className={Style.container}>
                <div className={this.getBulletClasses()}></div>
                <div 
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleClick}
                    className={this.getTextClasses()}
                >
                    {this.props.name}
                </div>
            </div>
        );
    }
}