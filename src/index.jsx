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
 * 
 * This had no need to be exported, but I need access to it's static getters.
 * There's probably a better way to do this, but I couldn't find it.
 */
export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        
        /*
         * currentPage: It's self explanatory. The website starts at the home page.
         * currentMode: The current display mode. The modes are explained at this.modes.
         */
       this.state = {
            currentPage: App.pages.home,
            currentMode: App.modes.website
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
    }
    
    /**
     * Holds the name of the website pages.
     * Used in the nav menu and content display.
     * Avoids having to type the same strings everytime.
     */
    static get pages()
    {
        return {
            home: 'HOME',
            about: 'ABOUT',
            projects: 'PROJECTS',
            contact: 'CONTACT',
            // blog: 'BLOG'
        }
    }

    /**
     * Holds the name of the modes.
     * A mode affects how the site looks and what is displayed.
     * website: the standart mode, it's just the portfolio.
     * blog: gives more space for content and changes the menu to a smaller icon based thingy.
     * view: hides everything so you can see the background. It will make sense once I have the threejs thing happening.
     */
    static get modes() {
        return {
            website: 'website',
            blog: 'blog',
            view: 'view'
        };
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

    /**
     * Takes care of updating the website state when the settings change.
     * I don't feel like creating an event system, so I just receive an object with all the settings.
     * This involves reading all the settings everytime, but it's not that bad since I plan to have only simple things here.
     */
    handleSettingsChange(settings)
    {
        /*
         * This is placeholder code.
         * I wanted this system in place to see how it would look.
         * It's gonna be done properly once the actual website content is in place.
         */
        if (this.state.currentMode != App.modes.view && settings.forcingView)
        {
            this.setState({currentMode: App.modes.view});
        }
        else if (this.state.currentMode == App.modes.view && !settings.forcingView)
        {
            this.setState({currentMode: App.modes.website});
        }
    }

    render()
        {
            /*
             * Select the content to display based on the currently selected page.
             *
             * Is null if home page is selected as the logo is displayed without a container.
             */
            let content = null;
            if (this.state.currentMode == App.modes.view)
            {
                /*
                 * This is a placeholder.
                 * I want to animate the dissapearing of the content.
                 * I can't just stop rendering it, so it's probably just gonna be hidden by css.
                 */
                content = null;
            }
            else if (this.state.currentPage == App.pages.home)
            {
                content = <h1 className={Style.Logo}>tan(90</h1>;
            }
            else if (this.state.currentPage == App.pages.about)
            {
                content = <Content header={App.pages.about} page={<About/>} />
            }
            else if (this.state.currentPage == App.pages.projects)
            {
                content = <Content header={App.pages.projects} page={<Projects/>} />
            }
            else if (this.state.currentPage == App.pages.contact)
            {
                content = <Content header={App.pages.contact} page={<Contact/>} />
            }
            else if (this.state.currentPage == App.pages.blog)
            {
                content = <Content header={App.pages.blog} page={<Blog/>} />
            }
            
            return (
                <div className={Style.App}>
                    <Background/>

                    <Nav
                        handleLinkClick={name => this.handlePageChange(name)}
                        handleSettingsChange={this.handleSettingsChange}
                        active={this.state.currentPage}
                        mode={this.state.currentMode}
                        links={Object.values(App.pages)}
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