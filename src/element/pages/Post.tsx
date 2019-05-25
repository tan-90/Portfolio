import { ElementProvider } from '../../layout/ElementProvider';
import { LayoutElement } from '../../layout/LayoutElement';
import { IBlogPost } from '../../blog/IBlogPost';
import { IPropsLayoutElement } from '../../layout/LayoutElement';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';

interface IPropsPostElement extends IPropsLayoutElement
{
    post: IBlogPost;
}

export interface IPropsPostComponent extends IPropsLayoutComponent
{
    post: IBlogPost;
}

@ElementProvider()
export class Post extends LayoutElement<IPropsPostElement>
{
    public constructor(props: IPropsPostElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Post.name)
        };
    }

    public getComponentProps(): IPropsPostComponent
    {
        return {
            manager: this.props.manager,

            post: this.props.post
        };
    }
}
