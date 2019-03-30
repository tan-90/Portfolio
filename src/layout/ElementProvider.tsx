import { ComponentClass } from 'react';

import { LayoutRegistry } from './LayoutRegistry';

export function ElementProvider(): Function
{
    return function provider(target: ComponentClass)
    {
        LayoutRegistry.INSTANCE.registerElement(target);
    };
}
