/*
 * This needs a lot of tweaking.
 * Current state is just a working version so I can move on.
 * Will be fixed in the future.
 */

import React from 'react';

import Style from './ActionArrow.scss'

export default class ActionArrow extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    static get directions()
    {
        return {
            up: [Style.containerUpDown, Style.arrowUp, Style.triggerUp],
            down: [Style.containerUpDown, Style.arrowDown, Style.triggerDown],
            left: [Style.containerLeftRight, Style.arrowLeft, Style.triggerLeft],
            right: [Style.containerLeftRight, Style.arrowRight, Style.triggerRight]
        }
    } 

    handleClick(event)
    {
        this.props.handleClick(event);
    }

    render()
    {
        return (
            <div className={this.props.direction[0]}>
                <div className={this.props.direction[1]}></div>
                <div className={this.props.direction[2]} onClick={this.handleClick}></div>
            </div>
        );
    }
}