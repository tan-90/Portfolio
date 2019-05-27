import React from 'react';
import classNames from 'classnames';

import { ReactNode } from 'react';

import { ComponentProvider } from '../../layout/ComponentProvider';
import { Configuration } from '../../element/Configuration';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { IPropsConfigurationComponent } from '../../element/Configuration';
import { IStateLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry  } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import Style from '../../style/configuration/SidePanelPlainConfiguration.scss';

interface IPlainConfigurationStyle extends ILayoutStyle
{
    configurationPanel: string;
    button: string;

    configuration: string;

    closed: string;
}

interface IStatePlainConfiguration extends IStateLayoutComponent
{
    isOpen: boolean;
}

@Styles<IPlainConfigurationStyle>(
    { name: 'SidePanel', data: Style }
)
@ComponentProvider(Configuration, true)
export class PlainConfiguration extends LayoutComponent<IPropsConfigurationComponent, IStatePlainConfiguration>
{
    public constructor(props: IPropsConfigurationComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(PlainConfiguration.name),

            isOpen: false
        };

        this.onOpen = this.onOpen.bind(this);
    }

    private onOpen(): void
    {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));
    }

    protected getComponentOptions(element: string): ReactNode | undefined
    {
        const components = this.props.components.get(element);
        if (!components)
        {
            return undefined;
        }

        return (
            components.map(component => {
                return (
                    <option key={component} value={component}>
                        {
                            component
                        }
                    </option>
                );
            })
        );
    }

    protected getStyleOptions(element: string): ReactNode | undefined
    {
        const { manager } = this.props;
        const component: string = manager.getActiveComponent(element);

        const styles: string[] | undefined = this.props.styles.get(component);
        if (!styles)
        {
            return undefined;
        }

        return (
            styles.map(style => {
                return (
                    <option key={style} value={style}>
                        {
                            style
                        }
                    </option>
                );
            })
        );
    }

    protected getActiveComponent(element: string): string
    {
        const activeComponent: string | undefined = this.props.activeComponents.get(element);

        if (!activeComponent)
        {
            throw new Error(`Active component for element ${element} should never be undefined, but was.`);
        }

        return activeComponent;
    }

    protected getActiveStyle(element: string): string
    {
        const activeStyle: string | undefined = this.props.activeStyles.get(this.getActiveComponent(element));

        if (!activeStyle)
        {
            throw new Error(`Active component for element ${element} should never be undefined, but was.`);
        }

        return activeStyle;
    }

    public render(): ReactNode
    {
        const { manager } = this.props;

        const style: IPlainConfigurationStyle = LayoutRegistry.INSTANCE.getStyle<IPlainConfigurationStyle>(this, this.state.activeStyle);

        return (
            <div
                className={classNames({
                    [style.configurationPanel]: true,
                    [style.closed]: !this.state.isOpen
                })}
            >
                {/* The icon used on the button that shows the configuration. */}
                <span
                    onClick={() => this.onOpen()}

                    className={style.button}
                >
                    <i className={'material-icons'}>settings</i>
                </span>
                <div className={style.configuration}>

                    <form>
                        <h1>Themes!</h1>
                        <p>
                            Actually, it's much more than that, but I still need to come up with a better name.
                            Now go wild! there's a lot of dropdowns.
                        </p>
                        {
                            this.props.elements.map(element => {
                                return (
                                    <fieldset key={element}>
                                        <h1>
                                            {
                                                element
                                            }
                                        </h1>

                                        {
                                            this.getComponentOptions(element) &&
                                            <label>
                                                Component
                                                <select value={this.getActiveComponent(element)} onChange={event => this.props.onComponentChange(manager, element, event.target.value)}>
                                                    {
                                                        this.getComponentOptions(element)
                                                    }
                                                </select>
                                            </label>
                                        }
                                        {
                                            this.getStyleOptions(element) &&
                                            <label>
                                                Style
                                                <select value={this.getActiveStyle(element)} onChange={event => this.props.onStyleChange(manager, element, event.target.value)}>
                                                    {
                                                        this.getStyleOptions(element)
                                                    }
                                                </select>
                                            </label>
                                        }
                                    </fieldset>
                                );
                            })
                        }
                    </form>
                </div>
            </div>
        );
    }
}
