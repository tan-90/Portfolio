import React from 'react';

import Style from './Nav.scss';

import NavMenu from './NavMenu';
import ActionArrow from './ActionArrow';

export default class Nav extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            navMenuSize: null,
            selected: 'HOME'
        };

        this.navMenuSizeCallback = this.navMenuSizeCallback.bind(this);
        this.handleMenuLinkClick = this.handleMenuLinkClick.bind(this);
    }

    navMenuSizeCallback(size)
    {
        this.setState({
            navMenuSize: size
        });
    }

    handleMenuLinkClick(event, name)
    {
        this.props.handlePageChange(name);
    }
    
    render()
    {
        let menuSize = this.state.navMenuSize;
        let directions = ActionArrow.directions;

        return (
            <div className={Style.container}>
                <div className={Style.lineHeader}></div>                
                <div
                    style={{
                        bottom: `calc(100vh - ${menuSize ? menuSize.top.toString() : 0}px)`
                    }}
                    className={Style.lineTop}
                ></div>
                
                <div className={Style.menu}>
                    <NavMenu
                        sizeCallback={this.navMenuSizeCallback}
                        handleLinkClick={this.handleMenuLinkClick}
                        selected={this.props.currentPage}
                    />
                </div>
                
                <div 
                    style={{
                        top: `${menuSize ? menuSize.bottom.toString() : 0}px`
                    }}
                    className={Style.lineBottom}
                ></div>
            </div>
        );
    }
}