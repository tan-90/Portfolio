import React from 'react';
import ReactMarkdown from 'react-markdown';

import Style from './Project.scss';

/**
 * Renders a project as a content page.
 * 
 * name: The project name.
 * description: A short description.
 * body: The actual content to be rendered. Given in markdown format.
 */
export default class Project extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            body: {
                error: null,
                data: null
            }
        }
    }

    componentDidMount()
    {
        const url = this.props.bodyUrl;

        fetch(url)
            .then(response => response.text())
            .then(data => this.setState({
                
                body: {
                    error: false,
                    data: data
                }
            }));
    }

    /**
     * Custom renderer to fix images being rendered inside a p tag by react-markdown.
     * Shamelessly stolen from https://github.com/rexxars/react-markdown/issues/93#issuecomment-399497496.
     */
    renderParagraph(props) {
        const { children } = props;

        if (children && children[0]
            && children.length === 1
            && children[0].props
            && children[0].props.src) { // rendering media without p wrapper

            return children;
        }

        return <p>{children}</p>;
    }

    render()
    {
        let body = this.state.body;
        return (
            <div className={Style.Project}>
                <div className={Style.Header}>
                    <h1>
                        <span className={Style.Name}>
                            {this.props.name}
                        </span>

                        {
                            this.props.labUrl ?
                            <a
                                className={Style.Icon}
                                href={this.props.labUrl}
                                target='_blank'
                            >
                                <i className={'fab fa-gitlab'}/>
                            </a> :
                            null
                        }

                        {
                            this.props.hubUrl ?
                            <a
                                className={Style.Icon}
                                href={this.props.hubUrl}
                                target='_blank'
                            >
                                <i className={'fab fa-github'}/>
                            </a> :
                            null
                        }
                    </h1>
                    
                    <p className={Style.Description}>
                        {this.props.description}
                    </p>
                </div>

                <ReactMarkdown
                    className={Style.Body}
                    source={
                        !body.error && body.data ?
                            body.data == '{"message":"404 File Not Found"}' ?
                            'No information about this yet.' :
                            body.data :
                        'Loading...'
                    }
                    renderers={{
                        paragraph: this.renderParagraph,
                        /* Change target to _blank for all rendered links. */
                        link: props => <a href={props.href} target='_blank'>{props.children}</a>
                    }}
                />
            </div>
        )
    }
}