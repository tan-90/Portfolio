import React from 'react';

import Style from './Contact.scss';
import SocialIcon from '../component/SocialIcon';

/**
 * The content of the contact page.
 */
export default class Contact extends React.Component
{
    constructor(props)
    {
        super(props);

        /*
         * The input values are saved on the state as they change.
         * It's the react docs way of doing forms.
         */
        this.state = {

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        
        /*
         * Needed for keeping track of the input values.
         */
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event)
    {

    }

    /*
     * Saves the input values as they change.
     * Ensures the parent component has access to the values of the child inputs.
     */
    handleInputChange(event)
    {

    }

    render()
    {
        return(
            <div className={Style.Contact}>
                <form>
                    {
                        /*
                         * The name and email inputs are in the same line.
                         * The container div is used to group them up and handle position and scale. 
                         */
                    }
                    <div className={Style.Row}>
                        <label className={Style.NameLabel}>
                            NAME
                            <input
                                className={Style.Input}
                                type='text'
                                name='name'
                                spellCheck={false}
                                onChange={this.handleInputChange}
                            />
                        </label>

                        <label className={Style.EmailLabel}>
                            EMAIL
                            <input
                                className={Style.Input}
                                type='text'
                                name='name'
                                spellCheck={false}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    
                    <label className={Style.MessageLabel}>
                        MESSAGE
                        <textarea
                            className={Style.MessageTextarea}
                            name='message'
                            onChange={this.handleInputChange}
                        />
                    </label>

                    <input
                        className={Style.SubmitButton}
                        type='submit'
                        value='SEND MESSAGE'
                    />

                    {
                        /*
                         * The social bar container.
                         * Used to position and space the social icons.
                         */
                    }
                    <div className={Style.Social}>
                        <SocialIcon
                            icon='fab fa-gitlab'
                            link='#'
                        />
                        <SocialIcon
                            icon='fab fa-github'
                            link='#'
                        />
                        <SocialIcon
                            icon='fab fa-facebook-f'
                            link='#'
                        />
                        <SocialIcon
                            icon='fab fa-twitter'
                            link='#'
                        />
                        <SocialIcon
                            icon='fab fa-instagram'
                            link='#'
                        />
                        <SocialIcon
                            icon='fab fa-youtube'
                            link='#'
                        />
                        <SocialIcon
                            icon='fab fa-twitch'
                            link='#'
                        />
                    </div>
                </form>
            </div>
        );
    }
}