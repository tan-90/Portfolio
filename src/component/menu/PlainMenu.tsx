import React from 'react';
import classNames from 'classnames';

import { ReactNode } from 'react';

import { Menu } from '../../element/Menu';
import { IPropsMenuComponent } from '../../element/Menu';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { LayoutComponent } from '../../layout/LayoutComponent';
import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import Bold from '../../style/menu/Bold.scss';

interface IPlainMenuStyle extends ILayoutStyle
{
    menu: string;
    link: string;
    active: string;
}

@Styles<IPlainMenuStyle>(
    { name: 'Bold', data: Bold }
)
@ComponentProvider(Menu, true)
export class PlainMenu extends LayoutComponent<IPropsMenuComponent>
{
    public constructor(props: IPropsMenuComponent)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeStyle: manager.getActiveStyle(PlainMenu.name)
        };
    }

    public render(): ReactNode
    {
        const style: IPlainMenuStyle = LayoutRegistry.INSTANCE.getStyle<IPlainMenuStyle>(this, this.state.activeStyle);

        return (
            <div className={style.menu}>
                <ul>
                    {
                        this.props.links.map(link => {
                            return (
                                <li
                                    key={link}

                                    onClick={() => this.props.onLinkClick(link)}
                                    className={classNames({
                                        [style.link]: true,
                                        [style.active]: this.props.selectedLink === link
                                    })}
                                >
                                    {
                                        link
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
