import React from 'react';
import ReactDOM from 'react-dom';

import Style from './index.scss'

import About from './page/About';
import Background from './component/Background';
import Blog from './page/Blog';
import Contact from './page/Contact';
import Content from './component/Content';
import Nav from './component/Nav';
import Projects from './page/Projects';
import {smoothScroll} from './helper';


/**
 * The actual website rendered to the main container div.
 * 
 * Responsible for keeping track of the current page and what to display.
 * As the components take care of the actual functionality, this just ties everything together.
 */
class App extends React.Component
{
    constructor(props)
    {
        super(props);
    
        /**
         * Holds the name of the website pages.
         * Used in the nav menu and content display.
         * Avoids having to type the same strings everytime.
         */
        this.pages = {
            home: 'HOME',
            about: 'ABOUT',
            projects: 'PROJECTS',
            contact: 'CONTACT',
            blog: 'BLOG'
        }

        /*
         * The website starts at the home page. 
         */
        this.state = {
            currentPage: this.pages.home
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(newPage)
    {
        /*
         * Since the page overflows to the body, the scroll needs to be reset when it changes.
         */
        smoothScroll(0);

        this.setState({
            currentPage: newPage
        });
    }

    render()
        {
            /*
             * Select the content to display based on the currently selected page.
             *
             * Is null if home page is selected as the logo is displayed without a container.
             */
            let content = null;
            if (this.state.currentPage == this.pages.about)
            {
                content = <Content header={this.pages.about} page={<About/>} />
            }
            else if (this.state.currentPage == this.pages.projects)
            {
                content = <Content header={this.pages.projects} page={<Projects/>} />
            }
            else if (this.state.currentPage == this.pages.contact)
            {
                content = <Content header={this.pages.contact} page={<Contact/>} />
            }
            else if (this.state.currentPage == this.pages.blog)
            {
                content = <Content header={this.pages.blog} page={<Blog/>} />
            }
            
            return (
                <div className={Style.App}>
                    <Background/>

                    <Nav
                        handleLinkClick={name => this.handlePageChange(name)}
                        active={this.state.currentPage}
                        links={Object.values(this.pages)}
                    />

                    {content}
                </div>
            )
        }
}


/*
 * Render the App to the container div.
 */
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);