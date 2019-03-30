import { ComponentClass } from 'react';

import { LayoutRegistry } from './LayoutRegistry';

export function ComponentProvider(element: Function, isDefault?: boolean): Function
{
    return function provider(target: ComponentClass)
    {
        LayoutRegistry.INSTANCE.registerComponent(target, element);

        if (isDefault)
        {
            LayoutRegistry.INSTANCE.setDefaultComponent(target, element);
        }
    };
}
