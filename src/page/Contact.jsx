import React from 'react';

import Style from './Contact.scss';
import SocialIcon from '../component/SocialIcon';

export default class Contact extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event)
    {

    }

    handleInputChange(event)
    {

    }

    render()
    {
        return(
            <div className={Style.container}>
                <h1 className={Style.header}>CONTACT</h1>
                <form
                    className={Style.form}
                    onSubmit={this.handleSubmit}
                >
                    <div className={Style.inputRow}>
                        <label className={Style.labelName}>
                            NAME
                            <input
                                className={Style.inputField}
                                name='name'
                                spellCheck={false}
                                onChange={this.handleInputChange}
                            />
                        </label>
                        <label className={Style.labelEmail}>
                            EMAIL
                            <input
                                className={Style.inputField}
                                name='email'
                                spellCheck={false}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label className={Style.labelMessage}>
                            MESSAGE
                            <textarea
                                className={Style.inputArea}
                                name='message'
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>

                    <div className={Style.submitRow}>
                        <input
                            className={Style.inputSubmit}
                            type='submit'
                            value='SEND MESSAGE'
                        />
                    </div>
                </form>
                
                <div className={Style.social}>
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
            </div>
        );
    }
}