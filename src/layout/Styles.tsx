import { Class } from './Types';
import { ILayoutStyle } from './LayoutStyle';
import { LayoutComponent } from './LayoutComponent';
import { LayoutRegistry } from './LayoutRegistry';

export function Styles<T extends ILayoutStyle>(...styleList: { name: string, data: T }[]): Function
{
    return function provider(target: Class<LayoutComponent>)
    {
        styleList.forEach(style => {
            LayoutRegistry.INSTANCE.registerStyle(target, style.name, style.data);
        });

        LayoutRegistry.INSTANCE.setDefaultStyle(target, styleList[0].name);
    };
}
