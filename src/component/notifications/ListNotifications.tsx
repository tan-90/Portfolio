import React from 'react';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { IPropsNotificationsComponent } from '../../element/Notifications';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Notifications } from '../../element/Notifications';
import { Styles } from '../../layout/Styles';

import DefaultListNotifications from '../../style/notifications/DefaultListNotifications.scss';

interface IListNotificationsStyle extends ILayoutStyle
{
    listNotifications: string;
    notification: string;
}

@Styles<IListNotificationsStyle>(
    { name: 'Default', data: DefaultListNotifications }
)
@ComponentProvider(Notifications, true)
export class ListNotifications extends LayoutComponent<IPropsNotificationsComponent>
{
    constructor(props: IPropsNotificationsComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(ListNotifications.name)
        };
    }

    public render(): ReactNode
    {
        const style: IListNotificationsStyle = LayoutRegistry.INSTANCE.getStyle<IListNotificationsStyle>(this, this.state.activeStyle);

        return (
            <ul className={style.listNotifications}>
                {
                    this.props.notifications.map(n =>
                        <li key={n.id}>
                            <div className={style.notification}>
                                <i className={'material-icons'}>
                                    {n.icon}
                                </i>
                                {n.body}
                            </div>
                        </li>
                    )
                }
            </ul>
        );
    }
}
