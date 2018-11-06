import React from 'react';

import Style from './Projects.scss';

import Project from '../component/Project';

/**
 * The projects content page.
 * Fetches all the projects from my git repositories and displays them.
 * 
 * Extra projects can be added by providing the required data and a markdown file for the information.
 */
export default class Projects extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            projects: {
                error: null,
                data: null
            },
            current: 0,
            projectCount: 0
        }

        this.processProjectData = this.processProjectData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        /*
         * URL for fetching data from the GitLab API.
         * It only fetches public information, but that's all I want to display, so no authentication is needed.
         */
        const url = 'https://gitlab.com/api/v4/users/tan90/projects';

        fetch(url)
            .then(response => response.json())
            .then(data => this.processProjectData(data));
    }

    processProjectData(data)
    {
        /*
         * For GitLab projects, we use the readme as the project page body.
         * Adding the URL as a property allows for the addition of custom projects that are not on GitLab.
         * All you need to do is provide the necessary information and a url to a markdown file to be rendered.
         */
        data.map((value, index) => {
            data[index].bodyUrl = `https://gitlab.com/api/v4/projects/${value.id}/repository/files/${'README.md'}/raw?ref=master`;
            data[index].labUrl = `https://gitlab.com/tan90/${value.name.toLowerCase()}`;
            data[index].hubUrl = `https://github.com/tan-90/${value.name.toLowerCase()}`;
        });

        /*
         * Add custom projects that are not from GitLab.
         * They require the following:
         * 
         * name: The name of the project.
         * description: A short project description.
         * bodyUrl: URL to a raw markdown file.
         * labUrl: The URL to a GitLab repository. Used for rendering the linked icon. Can be null so no icon is rendered.
         * hubUrl: The URL to a GitLab repository. Used for rendering the linked icon. Can be null so no icon is rendered.
         * 
         * At some point I'll make this fetch it all from a JSON GIST so I don't have to change the website source when adding projects.
         */
        data.push({
            name: 'Some text project',
            description: 'I want to test the custom projects. This shold get the raw data from a GIST and render it.',
            bodyUrl: 'https://gist.githubusercontent.com/tan-90/67e7beb588791b072b99c446e30baf35/raw/efab8bc7738d3ca4893b140bbbf752af8b308f31/NeuralNetworks.md'
        });

        this.setState({
            projects: {
                error: false,
                data: data
            },
            /* Save the number of projects for pagination reasons. */
            projectCount: data.length
        });
    }

    handleChange(offset)
    {
        /*
         * The arrows dissapear when on either edge of the list.
         * That ensures we can just add the offset without any sanity checks.
         */
        this.setState(state => ({current: (state.current + offset)}));
    }

    render()
    {        
        let projects = this.state.projects;

        /*
         * Project starts as null while data is fetched.
         * This should be replaced with a preloader that eventually reports an error if no data could be fetched.
         */
        let components = null;
        if (!projects.error && projects.data)
        {
            /*
             * Render the components if there was no error.
             * All components should be put in a list so all the data is fetched and ready to use.
             * This ensures data is only fetched once at the expense of keeping multiple components alive.
             */
            components = projects.data.map((value, index) => 
                <Project
                    key={index}
                    active={this.state.current == index}
                    name={value.name}
                    description={value.description}
                    bodyUrl={value.bodyUrl}
                    labUrl={value.labUrl}
                    hubUrl={value.hubUrl}
                />
            );
        }

        return (
            <div className={Style.Projects}>
                {
                    /*
                     * Only render the arrow when not on the edge of the project list.
                     * This ensures it doesn't go out of bounds.
                     */
                    this.state.current > 0 ? 
                    <i
                        className={[Style.ArrowLeft, 'fas fa-angle-left'].join(' ')}
                        onClick={() => this.handleChange(-1)}
                    /> :
                    null
                }
                
                {components || <p>Loading...</p>}
                
                {
                    /*
                     * Only render the arrow when not on the edge of the project list.
                     * This ensures it doesn't go out of bounds.
                     */
                    this.state.current < this.state.projectCount - 1 ? 
                    <i
                        className={[Style.ArrowRight, 'fas fa-angle-right'].join(' ')}
                        onClick={() => this.handleChange(1)}
                    /> :
                    null
                }
                
            </div>
        );
    }
}