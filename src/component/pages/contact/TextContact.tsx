import classNames from 'classnames';
import React from 'react';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../../layout/ComponentProvider';
import { Contact } from '../../../element/pages/Contact';
import { ILayoutStyle } from '../../../layout/LayoutStyle';
import { IPropsContactComponent } from '../../../element/pages/Contact';
import { LayoutComponent } from '../../../layout/LayoutComponent';
import { LayoutRegistry } from '../../../layout/LayoutRegistry';
import { Styles } from '../../../layout/Styles';

import DefaultTextContactStyle from '../../../style/pages/contact/DefaultTextContact.scss';

/*
 * This has a lot of classes that could be replaced by using CSS selectors on the form.
 * Using named classes just makes things clearer.
 */
interface ITextContactStyle extends ILayoutStyle
{
    textContact: string;

    formGroup: string;
    name: string;
    email: string;
    message: string;
    button: string;

    icons: string;
}

@Styles<ITextContactStyle>(
    { name: 'Default', data: DefaultTextContactStyle }
)
@ComponentProvider(Contact, true)
export class TextContact extends LayoutComponent<IPropsContactComponent>
{
    public constructor(props: IPropsContactComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(TextContact.name)
        };
    }

    public render(): ReactNode
    {
        const style: ITextContactStyle = LayoutRegistry.INSTANCE.getStyle<ITextContactStyle>(this, this.state.activeStyle);

        return (
            <div className={style.textContact}>
                {
                    this.props.content
                }

                <form onSubmit={this.props.onFormSubmit}>
                    <label className={classNames([style.formGroup, style.name])}>
                        NAME
                        <input
                            type={'text'}
                            name={'name'}
                            spellCheck={false}
                            required={true}
                            disabled={this.props.sending}

                            value={this.props.name}
                            onChange={this.props.onFormChange}
                        />
                    </label>

                    <label className={classNames([style.formGroup, style.email])}>
                        EMAIL
                        <input
                            type={'email'}
                            name={'email'}
                            spellCheck={false}
                            required={true}
                            disabled={this.props.sending}

                            value={this.props.email}
                            onChange={this.props.onFormChange}
                        />
                    </label>

                    <label className={classNames([style.formGroup, style.message])}>
                        MESSAGE
                        <textarea
                            name={'message'}
                            required={true}
                            disabled={this.props.sending}

                            value={this.props.message}
                            onChange={this.props.onFormChange}
                        />
                    </label>

                    <input
                        className={style.button}
                        type={'submit'}
                        value={'SEND MESSAGE'}
                        disabled={this.props.sending}
                    />
                </form>

                <div className={style.icons}>
                    {
                        this.props.social.map((s, index) =>
                            <a key={index} href={s.link} target={'_blank'}>
                                <i className={`fab fa-${s.icon}`}/>
                            </a>
                        )
                    }
                </div>
            </div>
        );
    }
}
