import React from 'react';

import Style from './Content.scss';

/**
 * The content container.
 * Utility component to add content to the website.
 * 
 * The container is properly positioned and scaled with margins and padding set.
 * Anything passed to this component is rendered inside of it, avoiding having to style each page.
 * 
 * header: Optional prop to render a page header. If this is left unset, it simply displays the page.
 * page: The content to be rendered inside of the container.
 */
export default class Content extends React.Component
{
    render()
    {
        return (
            <div className={Style.Content}>
                {
                    /*
                     * If the header prop exists, render a header text.
                     *
                     * As some pages will have static headers, it's cleaner to keep it here.
                     * This avoids having to write and style a header on every single page.
                     * 
                     * If a page has it's own header, it simply has to skip defining the header prop.
                     */

                    this.props.header ?
                        <span className={Style.PageHeader}>{this.props.header}</span> :
                        null
                }
                   
                {this.props.page}
            </div>
        );
    }
}