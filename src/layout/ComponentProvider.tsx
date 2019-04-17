import { Class } from '../Types';
import { LayoutComponent } from './LayoutComponent';
import { LayoutElement } from './LayoutElement';
import { LayoutRegistry } from './LayoutRegistry';

export function ComponentProvider(element: Class<LayoutElement>, isDefault?: boolean): Function
{
    return function provider(target: Class<LayoutComponent>)
    {
        LayoutRegistry.INSTANCE.registerComponent(target, element);

        if (isDefault)
        {
            LayoutRegistry.INSTANCE.setDefaultComponent(target, element);
        }
    };
}
