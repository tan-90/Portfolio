import { FormEvent } from 'react';
import { SyntheticEvent } from 'react';

import { ElementProvider } from '../../layout/ElementProvider';
import { IPropsLayoutElement } from '../../layout/LayoutElement';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutElement } from '../../layout/LayoutElement';
import { IStateLayoutElement } from '../../layout/LayoutElement';

export interface IPropsContactComponent extends IPropsLayoutComponent
{
    content: string;
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
    content: string;
    social: {icon: string, link: string}[];

    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        this.content = 'Here are the buttons you have to press if you want to talk to me.';
        this.social = [
            {
                icon: 'github',
                link: 'https://github.com/tan-90'
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

        console.debug(this.state);
    }

    public onFormSubmit(event: SyntheticEvent): void
    {
        /*
         * The submission handling happens withoug chaging the route.
         * So there is no need to keep processing the submit.
         */
        event.preventDefault();

        const { name, email, message } = this.state;

        if (name && email && message)
        {
            this.setState({
                sending: true
            });

            /*
             * Placeholder (obviously).
             * The idea is having a REST server controlling an email account and exposing a `/sendMessage` endpoint.
             * It's actually done, but I need to get new oauth keys.
             */
            setTimeout(() => {
                alert('Yaaay! Mail sent.');
                this.setState({
                    name: '',
                    email: '',
                    message: '',

                    sending: false
                });
            }, 5000);
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
