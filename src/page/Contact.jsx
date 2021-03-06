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
            name: '',
            email: '',
            message: '',
            /*
             * Whether or not we're trying to send a message.
             */
            sending: false 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        
        /*
         * Needed for keeping track of the input values.
         */
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event)
    {
        /*
         * Prevent the page from reloading.
         */
        event.preventDefault();

        this.setState({
            sending: true
        });

        fetch('http://localhost:3000/mail', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    message: this.state.message
                })
            })
            .then(response => {

                if (response.ok)
                {
                    alert('Message sent. Thank you!');

                    /*
                     * We only clear the form if the message was successfully sent.
                     */
                    this.setState({
                        name: '',
                        email: '',
                        message: '',
                        sending: false
                    });
                }
            })
            .catch(() => {
                alert('Sorry, there was a problem. Try again later.');
                this.setState({
                    sending: false
                });
            });
    }

    /*
     * Saves the input values as they change.
     * Ensures the parent component has access to the values of the child inputs.
     * It's the react way of doing forms.
     */
    handleInputChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render()
    {
        return (
            <div className={Style.Contact}>
                <form onSubmit={this.handleSubmit}>
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
                                value={this.state.name}
                                spellCheck={false}
                                onChange={this.handleInputChange}
                                required={true}
                                disabled={this.state.sending}
                            />
                        </label>

                        <label className={Style.EmailLabel}>
                            EMAIL
                            <input
                                className={Style.Input}
                                type='email'
                                name='email'
                                value={this.state.email}
                                spellCheck={false}
                                onChange={this.handleInputChange}
                                required={true}
                                disabled={this.state.sending}
                            />
                        </label>
                    </div>

                    <label className={Style.MessageLabel}>
                        MESSAGE
                        <textarea
                            className={Style.MessageTextarea}
                            name='message'
                            value={this.state.message}
                            onChange={this.handleInputChange}
                            required={true}
                            disabled={this.state.sending}
                        />
                    </label>

                    <input
                        className={Style.SubmitButton}
                        type='submit'
                        value='SEND MESSAGE'
                        disabled={this.state.sending}
                    />
                </form>

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
                    <SocialIcon
                        icon='fab fa-linkedin'
                        link='#'
                    />
                </div>
            </div>
        );
    }
}