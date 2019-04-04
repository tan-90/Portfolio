import { Class } from './Types';
import { LayoutElement } from './LayoutElement';
import { LayoutRegistry } from './LayoutRegistry';

export function ElementProvider<T extends LayoutElement>(): Function
{
    return function provider(target: Class<T>)
    {
        LayoutRegistry.INSTANCE.registerElement(target);
    };
}
