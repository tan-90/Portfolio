import { ReactNode } from 'react';

import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutElement, IStateLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';
import { IPropsLayoutComponent } from '../layout/LayoutComponent';

export interface INotification
{
    id: string;

    time: number;

    icon?: string;
    body: ReactNode;
}

export interface IPropsNotificationsComponent extends IPropsLayoutComponent
{
    notifications: INotification[];
}

interface IStateNotificationsElement extends IStateLayoutElement
{
    notifications: INotification[];
}

@ElementProvider()
export class Notifications extends LayoutElement<IPropsLayoutElement, IStateNotificationsElement>
{
    constructor(props: IPropsLayoutElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Notifications.name),

            notifications: []
        };

        this.sendNotification = this.sendNotification.bind(this);
    }

    public componentDidMount()
    {
        super.componentDidMount();

        const { manager } = this.props;
        manager.registerNotifier(this.sendNotification);
    }

    public sendNotification(notification: INotification)
    {
        this.setState(state => ({
            notifications: [...state.notifications, notification]
        }));

        setTimeout(
            _ => {
                this.setState(state => ({
                    notifications: state.notifications.filter(n => n.id !== notification.id)
                }));
            },
            notification.time * 1000
        );
    }

    public getComponentProps(): IPropsNotificationsComponent
    {
        return {
            manager: this.props.manager,

            notifications: this.state.notifications
        };
    }
}
