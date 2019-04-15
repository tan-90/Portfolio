import React from 'react';

import { ReactNode } from 'react';

import { Configuration } from '../../element/Configuration';
import { IPropsConfigurationComponent } from '../../element/Configuration';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutRegistry  } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import Style from '../../style/configuration/PlainConfiguration.scss';
import Neon from '../../style/configuration/NeonConfiguration.scss';
import { PlainConfiguration } from './PlainConfiguration';

interface IRoundConfigurationStyle extends ILayoutStyle
{
    configuration: string;
}

@Styles<IRoundConfigurationStyle>(
    { name: 'Plain', data: Style },
    { name: 'Neon', data: Neon }
)
@ComponentProvider(Configuration)
export class RoundConfiguration extends PlainConfiguration
{
    public constructor(props: IPropsConfigurationComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(RoundConfiguration.name)
        };
    }

    public render(): ReactNode
    {
        const { manager } = this.props;

        const style: IRoundConfigurationStyle = LayoutRegistry.INSTANCE.getStyle<IRoundConfigurationStyle>(this, this.state.activeStyle);

        return (
            <div className={style.configuration}>
                <form>
                    {
                        this.props.elements.map(element => {
                            return (
                                <fieldset key={element}>
                                    <h3>
                                        {
                                            element
                                        }
                                    </h3>

                                    <select value={this.getActiveComponent(element)} onChange={event => this.props.onComponentChange(manager, element, event.target.value)}>
                                        {
                                            this.getComponentOptions(element)
                                        }
                                    </select>

                                    {/* I don't like this, but react doesn't let you set `selected` on the option ): */}
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
