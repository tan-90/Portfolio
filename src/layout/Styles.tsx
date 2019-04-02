import { ComponentClass } from 'react';

import { LayoutRegistry } from './LayoutRegistry';
import { LayoutStyle } from './LayoutStyle';

export function Styles(...styles: LayoutStyle[]): Function
{
    return function provider(target: ComponentClass)
    {
        LayoutRegistry.INSTANCE.registerStyles(target, styles);
        LayoutRegistry.INSTANCE.setDefaultStyle(target, styles[0]);
    };
}
