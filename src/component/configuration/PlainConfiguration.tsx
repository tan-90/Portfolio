import React from 'react';

import { ReactNode } from 'react';

import { Configuration } from '../../element/Configuration';
import { IPropsConfigurationComponent } from '../../element/Configuration';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry  } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import Style from '../../style/configuration/PlainConfiguration.scss';
import Neon from '../../style/configuration/NeonConfiguration.scss';

interface IPlainConfigurationStyle extends ILayoutStyle
{
    configuration: string;
}

@Styles<IPlainConfigurationStyle>(
    { name: 'Plain', data: Style },
    { name: 'Neon', data: Neon }
)
@ComponentProvider(Configuration, true)
export class PlainConfiguration extends LayoutComponent<IPropsConfigurationComponent>
{
    public constructor(props: IPropsConfigurationComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(PlainConfiguration.name)
        };
    }

    protected getComponentOptions(element: string): ReactNode
    {
        const components = this.props.components.get(element);
        if (!components)
        {
            throw new Error(`Component list for element ${element} should not be undefined, but was.`);
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

    protected getStyleOptions(element: string): ReactNode
    {
        const { manager } = this.props;
        const component: string = manager.getActiveComponent(element);

        const styles: string[] | undefined = this.props.styles.get(component);
        if (!styles)
        {
            throw new Error(`Style list for component ${component} should not be undefined, but was.`);
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
            <div className={style.configuration}>
                <form>
                    {
                        this.props.elements.map(element => {
                            return (
                                <fieldset key={element}>
                                    <h1>
                                        {
                                            element
                                        }
                                    </h1>

                                    <select value={this.getActiveComponent(element)} onChange={event => this.props.onComponentChange(manager, element, event.target.value)}>
                                        {
                                            this.getComponentOptions(element)
                                        }
                                    </select>

                                    <select value={this.getActiveStyle(element)} onChange={event => this.props.onStyleChange(manager, element, event.target.value)}>
                                        {
                                            this.getStyleOptions(element)
                                        }
                                    </select>
                                </fieldset>
                            );
                        })
                    }
                </form>
            </div>
        );
    }
}
