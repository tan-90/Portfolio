import React from 'react';

import { FormEvent } from 'react';
import { Fragment } from 'react';
import { ReactNode } from 'react';
import { SyntheticEvent } from 'react';

import { ElementProvider } from '../../layout/ElementProvider';
import { IPropsLayoutElement } from '../../layout/LayoutElement';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutElement } from '../../layout/LayoutElement';
import { IStateLayoutElement } from '../../layout/LayoutElement';

export interface IPropsContactComponent extends IPropsLayoutComponent
{
    content: ReactNode;
    social: {icon: string, link: string}[];

    name?: string;
    email?: string;
    message?: string;
    sending: boolean;

    onFormChange(event: any): void;
    onFormSubmit(event: any): void;
}

interface IStateContact extends IStateLayoutElement
{
    name?: string;
    email?: string;
    message?: string;

    sending: boolean;
}

@ElementProvider()
export class Contact extends LayoutElement<IPropsLayoutElement, IStateContact>
{
    content: ReactNode;
    social: {icon: string, link: string}[];

    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        this.content =
            <Fragment>
                <p>
                    Messages and clicky stuffs.
                </p>
            </Fragment>;
        this.social = [
            {
                icon: 'gitlab',
                link: 'https://gitlab.com/tan90'
            },
            {
                icon: 'github',
                link: 'https://github.com/tan-90'
            },
            {
                icon: 'facebook',
                link: '/#'
            },
            {
                icon: 'twitter',
                link: '/#'
            },
            {
                icon: 'instagram',
                link: '/#'
            },
            {
                icon: 'youtube',
                link: '/#'
            },
            {
                icon: 'twitch',
                link: '/#'
            },
        ];

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Contact.name),

            sending: false
        };

        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    public onFormChange(event: FormEvent<HTMLInputElement>): void
    {
        const field: string = event.currentTarget.name;
        const newValue: string = event.currentTarget.value;

        /*
         * This looks terrible.
         * If the type of field was 'name' it works, so maybe this is a bug with TypeScript.
         * Since it detects 'name' is a valid property and doesn't show an error, it should work with the componsite "or type" 'name' | 'email' | 'message', but doesn't.
         * Writing a switch for this would look even worse and I don't see why I should write a custom event for somethig this simple.
         * So the forced cast is my choice.
         */
        this.setState({
            [field]: newValue
        } as unknown as IStateContact);
    }

    public async onFormSubmit(event: SyntheticEvent)
    {
        /*
         * The submission handling happens withoug chaging the route.
         * So there is no need to keep processing the submit.
         */
        event.preventDefault();

        const { manager } = this.props;
        const { name, message, email } = this.state;

        if (name && message && email)
        {
            this.setState({
                sending: true
            });

            try
            {
                const response: Response = await fetch('http://localhost:3000/mail', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        message,
                        email
                    })
                });

                if (response.status === 200)
                {
                    manager.notify({
                        id: `messageSent_${Date.now()}`,

                        time: 5,

                        icon: 'done',
                        body: <p>Your message was sent! I will get back to you soon.</p>
                    });
                    this.setState({
                        name: '',
                        email: '',
                        message: '',

                        sending: false
                    });
                }
                else
                {
                    throw new Error(`POST failed with response: ${response.status}`);
                }
            }
            catch (error)
            {
                console.error(error.message);

                manager.notify({
                    id: `messageFailed_${Date.now()}`,

                    time: 5,

                    icon: 'error',
                    body: <p>Oh no! There was an error sending your message. You can try again later, or use the social media icons.</p>
                });

                this.setState({
                    sending: false
                });
            }
        }
    }

    public getComponentProps(): IPropsContactComponent
    {
        return {
            manager: this.props.manager,

            content: this.content,
            social: this.social,

            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
            sending: this.state.sending,

            onFormChange: this.onFormChange,
            onFormSubmit: this.onFormSubmit
        };
    }
}
