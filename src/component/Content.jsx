import React from 'react';

import Style from './Content.scss';

import Home from '../page/Home';
import About from '../page/About';
import Projects from '../page/Projects';
import Contact from '../page/Contact';
import Blog from '../page/Blog';


export default class Content extends React.Component
{
    render()
    {
        let page = null;
        if(this.props.currentPage == 'HOME')
        {
            page = <Home/>
        }
        else if(this.props.currentPage == 'ABOUT')
        {
            page = <About/>
        }
        else if (this.props.currentPage == 'PROJECTS')
        {
            page = <Projects/>
        }
        else if (this.props.currentPage == 'CONTACT')
        {
            page = <Contact/>
        }
        else if (this.props.currentPage == 'BLOG')
        {
            page = <Blog/>
        }

        return(
            <div className={Style.container}>
                {page}
            </div>
        );
    }
}