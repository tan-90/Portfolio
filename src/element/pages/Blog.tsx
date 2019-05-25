import { BlogRegistry } from '../../blog/BlogRegistry';
import { ElementProvider } from '../../layout/ElementProvider';
import { LayoutElement } from '../../layout/LayoutElement';
import { IBlogPost } from '../../blog/IBlogPost';
import { IPropsLayoutElement } from '../../layout/LayoutElement';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';

export interface IPropsBlogComponent extends IPropsLayoutComponent
{
    posts: IBlogPost[];
}

@ElementProvider()
export class Blog extends LayoutElement
{
    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Blog.name)
        };
    }

    public getComponentProps(): IPropsBlogComponent
    {
        return {
            manager: this.props.manager,

            posts: BlogRegistry.INSTANCE.posts
        };
    }
}
